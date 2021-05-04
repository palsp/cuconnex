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
	Status    string `json:"status"`
	Image    string   `json:"image"`
	Registration bool `json:"registration"`
}

func (self *EventSerializer) Response() EventResponse {
	EventModel := self.C.MustGet("my_event_model").(EventModel)
	event := EventResponse{
		ID:        EventModel.ID,
		EventName: EventModel.EventName,
		Bio:       EventModel.Bio,
		Location:  EventModel.Location,
		StartDate: EventModel.StartDate,
		EndDate:   EventModel.EndDate,
		Image :    EventModel.Image,
		Status:    EventModel.Status,
		Registration: EventModel.Registration,
	}
	return event
}



type EventsSerializer struct {
	C *gin.Context
}

// EventsResponse declares response schema
type EventsResponse struct {
	Events []EventResponse `json:"events"`
}


// Response convert all events into specific format
// before sending response to the user
func (self *EventsSerializer) Response() EventsResponse {
	EventsModel := self.C.MustGet("my_events_model").([]EventModel)
	eventChan := make(chan EventResponse)
	var response []EventResponse
	for _, eventModel := range EventsModel {
		// Each serializer run in its own go routine
		go func(model EventModel) {
			eventChan <- EventResponse{
				ID:        model.ID,
				EventName: model.EventName,
				Bio:       model.Bio,
				Location:  model.Location,
				StartDate: model.StartDate,
				EndDate:   model.EndDate,
				Image :    model.Image,
				Status: model.Status,
				Registration: model.Registration,

			}
		}(eventModel)
	}

	for i := 0 ; i < len(EventsModel) ; i++ {
		response = append(response , <- eventChan)
	}

	return EventsResponse{
		Events: response,
	}
}