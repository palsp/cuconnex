package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/interest-services/common"
	"github.com/palsp/cuconnex/interest-services/interest"
)

func Migrate() {
	interest.AutoMigrate()
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

	// v1 := r.Group("/api/events")

	// interest.InitializeData(db)


// 	r.Run(":3000") // listen and serve on 0.0.0.0:3000
	var cats []interest.Category

	err = db.Find(&cats).Error
	if err != nil {
		log.Fatalf("fetch user failed: %v", err)
	}

	// for _, cat := range cats {
		
	// }
	cats[0].GetInterest()
	fmt.Println(cats[0].Name)
	for _,v := range cats[0].Interests {
		fmt.Println(v.Description)
	}
}
