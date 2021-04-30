package events

import (
	"fmt"
	"log"
	"time"

	"github.com/palsp/cuconnex/event-services/common"
	"gorm.io/gorm"
)

type EventModel struct {
	gorm.Model
	ID        uint      `gorm:"primaryKey"`
	EventName string    `gorm:"column:event-name"`
	Bio       string    `gorm:"column:bio;size:1024"`
	Location  string    `gorm:"column:location"`
	StartDate time.Time `gorm:"column:start-date"`
	EndDate   time.Time `gorm:"column:end-date"`
	Status 	  string    `gorm:"column:status"`
	Registration bool   `gorm:"column:registration"`
	Version int
}




func (EventModel) TableName() string{
	return "events"
}
// AutoMigrate  Migrate the schema of database if needed
func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&EventModel{})
}

func (e *EventModel) BeforeUpdate(tx *gorm.DB) (err error) {
	e.Version = e.Version + 1
	return
}


// SearchByID find events detail of a given id
func SearchByID(id string) (*EventModel , error) {
	db := common.GetDB()
	var event EventModel
	err := db.First(&event,id).Error
	if err != nil {
		log.Printf("Fetch event by id Failed: %v ", err)
		return nil , err
	}
	return &event , nil
}

// SearchByName find events detail of a given name
func SearchByName(name string) ([]EventModel , error) {
	db := common.GetDB()
	
	var events []EventModel
	// err := db.Where(EventModel{
	// 	EventName: name,
	// }).Find(&events).Error
	err := db.Find(&events , "`event-name` Like ?" , fmt.Sprintf("%%%v%%", name)).Error
	if err != nil {
		return nil , err
	}

	return events , nil
}


// SaveOne save event to db
func SaveOne(data *EventModel) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

// UpdateOne update event which required all field  and save to database
func (e *EventModel) UpdateOne(data *EventModel){
	db := common.GetDB()
	e.EventName = data.EventName
	e.Bio = data.Bio
	e.Location = data.Location
	e.Registration = data.Registration
	e.StartDate = data.StartDate
	e.EndDate = data.EndDate
	db.Save(e)
}


// GetAllEvents return all events store in database
func GetAllEvents() ([]EventModel , error) {
	db := common.GetDB()
	var models []EventModel
	err := db.Find(&models).Error
	return models , err

}



// FindEvents returns events that match a condition
func FindEvents(condition string , args ...string) ([]EventModel , error) {
	db := common.GetDB()
	var models []EventModel
	result := db.Where(condition , args ).Find(&models)
	return models , result.Error
}