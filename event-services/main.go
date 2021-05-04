package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nats-io/stan.go"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/events"
	"log"
	"time"
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

	
	// Create a router
	r := gin.Default()

	r.Use(CORSMiddleware())
	
	//testEvent := r.Group("/api/ping")
	//testEvent.GET("/", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{
	//		"message": "pong",
	//	})
	//})
	//
	v1 := r.Group("/api/events")
	events.EventRegister(v1)
	r.Run(":3000") // listen and serve on 0.0.0.0:3000

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

