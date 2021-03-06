package events

import (
	"fmt"
	"log"
	"net/http"

	"github.com/palsp/cuconnex/event-services/common"

	"github.com/gin-gonic/gin"
)

func EventRegister(router *gin.RouterGroup) {
	router.GET("/:name", GetEvent)
	router.GET("/:name/interest" , GetEventByInterest)
	router.GET("/", GetAllEvent)
	router.POST("/", CreateEvent)
	router.PUT("/:id",UpdatedEvent)


	// TODO: Must be removed in production
	//router.OPTIONS("/" , func (ctx *gin.Context){
	//	ctx.Header("Access-Control-Allow-Origin", "*")
	//	ctx.Header("Access-Control-Allow-Methods", "GET , POST , PUT , PATCH , DELETE")
	//	ctx.Header("Access-Control-Allow-Headers","Content-Type,Authorization")
	//
	//	ctx.JSON(http.StatusOK,gin.H{})
	//})

}


// GetEvent returns event(s) according to search keyword
func GetEvent(c *gin.Context) {
	eventName := c.Param("name")
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

// GetEventByInterest handle the GET event which classified with some interest
func GetEventByInterest(c *gin.Context){
	interest := c.Param("name")

	interest = common.URLDecoder(interest)

	i , err := GetInterestByName(interest)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"messages" : "interest not found",
		})
		return
	}

	es , err := i.GetEventByInterest()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"messages" : "something went wrong",
		})
		return
	}

	c.Set("my_events_model" , es)
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

	// classify event with an interest
	for _, v := range eventModelValidator.Interests {
		eventModelValidator.eventModel.AddEventToInterest(v)
	}


	c.Set("my_event_model" , eventModelValidator.eventModel)
	serializer := EventSerializer{c}
	response := serializer.Response()
	fmt.Println("here" , response.Status)
	var expiration string
	if response.Status != common.EventStatus.Closed {
		if response.Status == common.EventStatus.Upcoming{
			expiration = response.StartDate.String()
		}else{
			expiration = response.EndDate.String()
		}
		PublishEventExpiration(EventExpirationData{
			ID: response.ID,
			ExpirationDate: expiration,
		})
	}



	err := PublishEventCreated(EventCreatedData{
		ID: response.ID,
		EventName: response.EventName,
		Registration: response.Registration,
		Status : response.Status,
		ExpirationDate: expiration,
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
	err = PublishEventUpdated(EventUpdatedData{
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