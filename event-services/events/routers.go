package events

import (
	"log"
	"net/http"

	"github.com/palsp/cuconnex/event-services/common"

	"github.com/gin-gonic/gin"
)

func EventRegister(router *gin.RouterGroup) {
	router.GET("/:event_name", GetEvent)
	router.GET("/", GetAllEvent)
	router.POST("/", CreateEvent)
	router.PUT("/:id",UpdatedEvent)

	// TODO: Must be removed in production
	router.OPTIONS("/" , func (ctx *gin.Context){
		ctx.JSON(http.StatusOK,gin.H{})
	})

}


// GetEvent returns event(s) according to search keyword
func GetEvent(c *gin.Context) {
	eventName := c.Param("event_name")
	events , err := SearchByName(eventName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"messages" : "Something went wrong",
		})
		return
	}
	c.Set("my_events_model" , events)
	serializer := EventsSerializer{c}
	c.JSON(http.StatusOK , serializer.Response())			

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
	response := serializer.Response()
	err := common.PublishEventCreated(common.EventCreatedData{
		ID: response.ID,
		EventName: response.EventName,
		Registration: response.Registration,
	})
	if err != nil {
		log.Printf("error publish event:created : %v" , err)
	}else{
		log.Printf("Event published to subject %v" , "event:created")
	}
	c.JSON(http.StatusCreated, response)

}

// UpdatedEvent handle PUT
func UpdatedEvent(c *gin.Context){
	eventModelValidator := NewEventModelValidator()
	if err := eventModelValidator.Bind(c) ; err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
		return
	}
	db := common.GetDB()
	e  := &EventModel{}
	id := c.Param("id")

	err := db.Where("id = ?" , id).First(e).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"errors" : []struct{ message string}{{message: "event not found"}},
		})
		return
	}

	if err := e.UpdateOne(&eventModelValidator.eventModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"errors" : err.Error(),
		})
	}

	c.Set("my_event_model" , *e)
	serializer := EventSerializer{c}
	response := serializer.Response()
	err = common.PublishEventUpdated(common.EventUpdatedData{
		ID: e.ID,
		EventName: e.EventName,
		Registration: e.Registration,
		Version: e.Version,
	})
	if err != nil {
		log.Printf("error publish event:created : %v" , err)
	}else{
		log.Printf("Event published to subject %v" , "event:created")
	}
	c.JSON(http.StatusCreated, response)



}