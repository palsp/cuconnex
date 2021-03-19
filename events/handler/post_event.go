package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/events/models"
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
	NanoSecond int `json:"nanosecond,omitempty"`
}

// GetDate returns date in a yyyy-mm-dd hh:mm:ss + nsec format
func ( d Date ) GetDate(loc time.Location) time.Time{
	return time.Date(d.Year, d.Month, d.Day , d.Time.Hour ,d.Time.Minute , d.Time.Second, d.Time.NanoSecond, &loc)
}

// CreateEvent handles the POST
func CreateEvent(c *gin.Context){
	postBody := EventBody{}

	// Pase body to struct
	err := c.BindJSON(&postBody)
	if err != nil {	
		fmt.Println(err)
		c.JSON(http.StatusBadRequest,gin.H{
			"errors" : err.Error(),
		})
		return 
	}

	// Create a valid entity for event
	var event = &models.Event{}
	event.EventName = postBody.EventName
	event.Description = postBody.Description
	// fmt.Println(postBody.StartDate.GetDate(postBody.Location))
	event.Location = postBody.Location.String()
	if postBody.StartDate != nil {
		event.StartDate = postBody.StartDate.GetDate(postBody.Location)
	}
	if postBody.EndDate != nil {
		event.EndDate = postBody.EndDate.GetDate(postBody.Location)
	}



	models.DB.Create(&event)

	c.JSON(http.StatusCreated, event)

}