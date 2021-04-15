package events

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func EventRegister(router *gin.RouterGroup) {
	router.GET("/", GetAllEvent)
	//router.GET("/:event_id", GetEvent)
	router.POST("/", CreateEvent)


	// TODO: Must be removed in production
	router.OPTIONS("/" , func (ctx *gin.Context){
		ctx.JSON(http.StatusOK,gin.H{})
	})
}


// GetEvent returns event(s) according to search keyword
func GetEvent(c *gin.Context) {
}

// GetAllEvent returns all events ( maximum to 10 items per request)
func GetAllEvent(c *gin.Context) {
	events, err := GetAllEvents()
	if err != nil {
		log.Printf("Fetched events error: %v" , err)
	}

	c.Set("my_events_model" , events)
	serializer := EventsSerializer{c}
	c.JSON(http.StatusOK , serializer.Response())
}

// CreateEvent handles the POST
func CreateEvent(c *gin.Context) {
	eventModelValidator := NewEventModelValidator()
	if err := eventModelValidator.Bind(c) ; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
		return
	}

	if err := SaveOne(&eventModelValidator.eventModel) ; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
		return
	}

	c.Set("my_event_model" , eventModelValidator.eventModel)
	serializer := EventSerializer{c}
	c.JSON(http.StatusCreated, serializer.Response())

}
