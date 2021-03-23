package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/interest-services/common"
)

func Migrate() {

}

func main() {
	_, err := common.InitDB()
	// Migrate()
	if err != nil {
		log.Fatalln("db err:", err)
	}

	// Create a router
	r := gin.Default()

	testEvent := r.Group("/api/ping")
	testEvent.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// v1 := r.Group("/api/events")



	r.Run(":3000") // listen and serve on 0.0.0.0:3000
}
