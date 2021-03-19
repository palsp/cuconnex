package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type EventBody struct {
	EventName string `json:"event-name"`
	Description string `json:"description"`
	Location time.Location`json:"location"`
	StartDate *Date `json:"start-date,omitempty"`
	EndDate *Date `json:"end-date,omit-empty"`
}

type Date struct {
	Month time.Month `json:"month"`
	Day int `json:"day"`
	Year int `json:"year"`
	Time *Time `json:"time"`
}

type Time struct {
	Hour int  `json:"hour"`
	Minute int `json:"minute"`
	Second int `json:"second"`
}


// CreateEvent handles the POST
func CreateEvent(c *gin.Context){
	postBody := EventBody{}
	err := c.BindJSON(&postBody)
	if err != nil {	
		fmt.Println(err)
		c.JSON(http.StatusBadRequest,gin.H{
			"errors" : err.Error(),
		})
	}else{
		fmt.Println(postBody.StartDate)
		c.JSON(http.StatusOK, gin.H{})
	}
	
}