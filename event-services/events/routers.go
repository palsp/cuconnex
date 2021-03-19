package events

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func EventRegister(router *gin.RouterGroup) {
	router.GET("/:event_id", GetEvent)
	router.GET("/", GetAllEvent)
	router.POST("/", CreateEvent)
}


// GetEvent returns event(s) according to search keyword
func GetEvent(c *gin.Context) {

}

// GetAllEvent returns all events ( maximum to 10 items per request)
func GetAllEvent(c *gin.Context) {

}

// CreateEvent handles the POST
func CreateEvent(c *gin.Context) {
	eventModelValidator := NewEventModelValidator()
	if err := eventModelValidator.Bind(c) ; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
	}

	if err := SaveOne(&eventModelValidator.EventModel) ; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
	}

	c.Set("my_event_model" , eventModelValidator.EventModel)
	serializer := EventSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

}
