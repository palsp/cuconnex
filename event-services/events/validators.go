package events

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/event-services/common"
)

// EventModelValidator contains two part
// - Validator : write json checking rule
// - DataModel: fill with data from Validator after invoking common.Bind(c , self)
// Then, just call Save() after the data is ready in DataModel
type EventModelValidator struct {
	Event
	eventModel EventModel `json:"-"`
}

// EventBody represents expected request body
type Event struct {
	EventName string        `json:"event-name"`
	Bio       string        `json:"bio"`
	Location  time.Location `json:"location"`
	Registration bool       `json:"registration"`
	StartDate *DateForm     `json:"start-date,omitempty"`
	EndDate   *DateForm     `json:"end-date,omit-empty"`
}

// DateForm represents expected date field of the request
type DateForm struct {
	Month time.Month `json:"month"`
	Day   int        `json:"day"`
	Year  int        `json:"year"`
	Time  *TimeForm   `json:"time"`
}


// TimeForm represents expected time filed of the request
type TimeForm struct {
	Hour       int `json:"hour"`
	Minute     int `json:"minute"`
	Second     int `json:"second"`
	NanoSecond int `json:"nanosecond,omitempty"`
}

// GetDate returns date in a yyyy-mm-dd hh:mm:ss + nsec format
func (d DateForm) GetDate() time.Time {
	loc := time.FixedZone("UTC+7",7*60*60)
	//return time.Date(d.Year, d.Month, d.Day, d.Time.Hour, d.Time.Minute, d.Time.Second, d.Time.NanoSecond, t.Location())
	return time.Date(d.Year, d.Month, d.Day, d.Time.Hour, d.Time.Minute, d.Time.Second, d.Time.NanoSecond, loc)
}


// Bind stores request body into EventModelValidator 
func (self *EventModelValidator) Bind(c *gin.Context) error{
	err := common.Bind(c, self)
	if err != nil {
		return err
	}

	self.eventModel.EventName = self.Event.EventName
	self.eventModel.Registration = self.Event.Registration
	self.eventModel.Bio = self.Event.Bio
	self.eventModel.Location = self.Event.Location.String()
	if self.Event.StartDate != nil {
		self.eventModel.StartDate = self.Event.StartDate.GetDate().UTC()
	}

	if self.Event.EndDate != nil {
		self.eventModel.EndDate = self.Event.EndDate.GetDate().UTC()
	}


	if self.eventModel.StartDate.After(self.eventModel.EndDate){
		// TODO: implement custom error
		return err
	}
	start := self.eventModel.StartDate.UTC()
	end := self.eventModel.EndDate.UTC()
	t := time.Now().UTC()
	if  t.Before(start){
		self.eventModel.Status = common.EventStatus.Upcoming
	}else if t.After(start) && t.Before(end){
		self.eventModel.Status = common.EventStatus.Ongoing
	}else{
		self.eventModel.Status = common.EventStatus.Closed
	}


	return nil
}

// NewEventModelValidator returns new validator
func NewEventModelValidator() EventModelValidator {
	eventModelValidator := EventModelValidator{}
	// put the default value of a Validator here
	return eventModelValidator
}
