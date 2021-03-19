package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/events-services/common"
	"github.com/palsp/cuconnex/events-services/events"
)

func Migrate() {
	events.AutoMigrate()
}

func main() {
	_, err := common.InitDB()

	if err != nil {
		log.Fatalln("db err: ", err)
	}

	// Create a router
	r := gin.Default()

	v1 := r.Group("/api/events")
	events.EventRegister(v1)

	testEvent := r.Group("/api/events/ping")
	testEvent.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":3000") // listen and serve on 0.0.0.0:3000
}
