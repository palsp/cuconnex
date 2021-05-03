package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nats-io/stan.go"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/events"
	"log"
	"net/http"
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
	//config := cors.DefaultConfig()
	//config.AllowAllOrigins = true
	//r.Use(cors.New(config))

	r.Use(CustomHeaderAPI)

	testEvent := r.Group("/api/ping")
	testEvent.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	v1 := r.Group("/api/events")
	events.EventRegister(v1)

	r.Run(":3000") // listen and serve on 0.0.0.0:3000
}


func CustomHeaderAPI(c *gin.Context) {
	// Add CORS headers
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers","Content-Type")

	c.Next()
}

