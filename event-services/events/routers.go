package events

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/event-services/common"
)

type EventBody struct {
	EventName string        `json:"event-name"`
	Bio       string        `json:"bio"`
	Location  time.Location `json:"location"`
	StartDate *Date         `json:"start-date,omitempty"`
	EndDate   *Date         `json:"end-date,omit-empty"`
}

type Date struct {
	Month time.Month `json:"month"`
	Day   int        `json:"day"`
	Year  int        `json:"year"`
	Time  *Time      `json:"time"`
}

type Time struct {
	Hour       int `json:"hour"`
	Minute     int `json:"minute"`
	Second     int `json:"second"`
	NanoSecond int `json:"nanosecond,omitempty"`
}

func EventRegister(router *gin.RouterGroup) {
	router.GET("/:event_id", GetEvent)
	router.GET("/", GetAllEvent)
	router.POST("/", CreateEvent)
}

// GetDate returns date in a yyyy-mm-dd hh:mm:ss + nsec format
func (d Date) GetDate(loc time.Location) time.Time {
	return time.Date(d.Year, d.Month, d.Day, d.Time.Hour, d.Time.Minute, d.Time.Second, d.Time.NanoSecond, &loc)
}



// GetEvent returns event(s) according to search keyword
func GetEvent(c *gin.Context) {

}

// GetAllEvent returns all events ( maximum to 10 items per request)
func GetAllEvent(c *gin.Context) {

}



// CreateEvent handles the POST
func CreateEvent(c *gin.Context) {
	DB := common.GetDB()
	postBody := EventBody{}

	// Pase body to struct
	err := c.BindJSON(&postBody)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"errors": err.Error(),
		})
		return
	}

	// Create a valid entity for event
	var event = EventModel{}
	event.EventName = postBody.EventName
	event.Bio = postBody.Bio
	// fmt.Println(postBody.StartDate.GetDate(postBody.Location))
	event.Location = postBody.Location.String()
	if postBody.StartDate != nil {
		event.StartDate = postBody.StartDate.GetDate(postBody.Location)
	}
	if postBody.EndDate != nil {
		event.EndDate = postBody.EndDate.GetDate(postBody.Location)
	}

	DB.Create(&event)
	c.Set("event_model", event)
	serializer := EventSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

}
