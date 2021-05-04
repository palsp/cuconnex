package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gin-gonic/gin"
	"github.com/nats-io/stan.go"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/config"
	"github.com/palsp/cuconnex/event-services/events"
)

func Migrate() {
	events.AutoMigrate()
}

func main() {
	sc ,err := common.InitStanClient()

	if err != nil {
		log.Printf("error connect to nats: %v\n" , err)
	}
	_ , err = common.InitDB()
	if err != nil {
		log.Fatalf("db err: %v\n", err)
	}
		Migrate()

	events.InitInterest()

	aw , _ := time.ParseDuration("5000ms")
	_, err  = sc.QueueSubscribe("event:completed",
		"evet-service",
		events.SubscribeEventCompleted ,
		stan.DeliverAllAvailable() ,
		stan.SetManualAckMode(),
		stan.AckWait(aw),
		stan.DurableName("event-service"),
		)

	if err != nil {
		sc.Close()
		log.Fatal(err)
	}


	sess := ConnectAws()

	// Create a router
	r := gin.Default()

	r.Use(CORSMiddleware())

	r.Use(func(c *gin.Context) {
		c.Set("sess", sess)
		c.Next()
	})

	v1 := r.Group("/api/events")
	events.EventRegister(v1)

	v1.POST("/upload/:id",UploadImage)

	fmt.Println("start listening")
	r.Run(":3000") // listen and serve on 0.0.0.0:3000

}

func UploadImage(c *gin.Context) {
	db := common.GetDB()

	eventId := c.Param("id")

	var e = &events.EventModel{}

	err := db.First(e , eventId).Error
	if err != nil{
		c.JSON(http.StatusNotFound, gin.H{
			"error":    "event not found",
		})
		return
	}

	// codes that will parse file and upload to amazon s3 bucket
	sess := c.MustGet("sess").(*session.Session)
	uploader := s3manager.NewUploader(sess)

	file, header, err := c.Request.FormFile("image")
	filename := header.Filename

	//upload to the s3 bucket
	up, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(config.S3.Bucket),
		Key:    aws.String( filename ),
		ContentType: aws.String("image/png"),
		Body:   file,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":    "Failed to upload file",
			"uploader": up,
		})
		return
	}

	filepath := "http://" + config.S3.Bucket + "." + "s3-website-" + config.S3.Region + ".amazonaws.com/" + filename

	e.Image = filepath

	db.Save(e)

	err = events.PublishEventUpdated(events.EventUpdatedData{
		ID: e.ID,
		EventName: e.EventName,
		Registration: e.Registration,
		Image: e.Image,
		Status: e.Status,
		Version: e.Version,
	})

	if err != nil {
		log.Printf("error publish event:updated : %v" , err)
	}else{
		log.Printf("Event published to subject %v" , "event:updated" , "file upload")
	}


	c.JSON(http.StatusOK, gin.H{
		"filepath": filepath,
	})

}



func ConnectAws() *session.Session {
	sess , err := session.NewSession(
		&aws.Config{
			Region: aws.String(config.S3.Region),
			Credentials: credentials.NewStaticCredentials(
				config.S3.AccessKeyID,
				config.S3.SecretAccessKey,
				"", // a token will be created when the session it's used.
			),
		})
	if err != nil {
		panic(err)
	}
	return sess
}



func UploadFileToS3(uploader *s3manager.Uploader , fileDir string) error{
	file, err := os.Open(fileDir)
	if err != nil {
		return err
	}
	defer file.Close()

	//upload to the s3 bucket
	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(config.S3.Bucket),
		Key:    aws.String( file.Name()),
		ContentType: aws.String("image/png"),
		Body:   file,
	})
	return err

}



//func CustomHeaderAPI(c *gin.Context) {
//	// Add CORS headers
//	c.Header("Access-Control-Allow-Origin", "*")
//	c.Header("Access-Control-Allow-Methods", "GET , POST , PUT , PATCH , DELETE")
//	c.Header("Access-Control-Allow-Headers","Content-Type,Authorization")
//
//	c.Next()
//}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		//c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
	}
}

