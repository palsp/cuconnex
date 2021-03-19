package events

import (
	"time"

	"github.com/gin-gonic/gin"
)

type EventSerializer struct {
	C *gin.Context
}

// EventResponse declares response schema
type EventResponse struct {
	ID        uint      `json:"id"`
	EventName string    `json:"event-name"`
	Bio       string    `json:"bio"`
	Location  string    `json:"location"`
	StartDate time.Time `json:"start-date"`
	EndDate   time.Time `json:"end-date"`
}

func (self *EventSerializer) Response() EventResponse {
	EventModel := self.C.MustGet("event_model").(EventModel)
	event := EventResponse{
		ID:        EventModel.ID,
		EventName: EventModel.EventName,
		Bio:       EventModel.Bio,
		Location:  EventModel.Location,
		StartDate: EventModel.StartDate,
		EndDate:   EventModel.EndDate,
	}
	return event
}
