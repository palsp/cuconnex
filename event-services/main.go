package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/event-services/classification"
	css "github.com/palsp/cuconnex/event-services/classification"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/events"
)

func Migrate() {
	events.AutoMigrate()
	classification.AutoMigrate()
}

func main() {
	db, err := common.InitDB()
	Migrate()
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

	v1 := r.Group("/api/events")
	events.EventRegister(v1)


	for _, cat := range css.InitialData {
		db.Create(&cat.Category)

		for _,interest := range cat.Interest {
			db.Model(&cat.Category).Association("Interests").Append(&interest)
		}
	}
	

	r.Run(":3000") // listen and serve on 0.0.0.0:3000
}
