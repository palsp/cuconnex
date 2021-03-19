package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type Event struct {
	gorm.Model
	ID uint `json:"id" gorm:"primaryKey"` 
	EventName string `json:"event-name"`
	Description string `json:"description"`
	Location string`json:"location"`
	StartDate time.Time `json:"start-date,omitempty"`
	EndDate time.Time `json:"end-date,omitempty"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

func (Event) TableName() string {
	return "event"
}


func AutoMigrate() {
	db := GetDB()

	db.AutoMigrate(&Event{})
}