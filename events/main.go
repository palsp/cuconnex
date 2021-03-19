package main

import (
	"log"

	"github.com/gin-gonic/gin"
	handler "github.com/palsp/cuconnex/events/handler"
	models "github.com/palsp/cuconnex/events/models"
)

func main(){
	var err error
	_, err = models.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	// Create a router
	r := gin.Default()

	r.GET("/api/events/:keyword" ,  handler.GetEvent )
	r.GET("/api/events" , handler.GetAllEvent)
	r.POST("/api/events" , handler.CreateEvent)

	r.Run(":3000")
}