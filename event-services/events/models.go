package events

import (
	"time"

	"github.com/palsp/cuconnex/event-services/common"
	"gorm.io/gorm"
)

type EventModel struct {
	gorm.Model
	ID        uint      ` gorm:"primaryKey"`
	EventName string    `gorm:"column:event-name"`
	Bio       string    `gorm:"column:bio;size:1024"`
	Location  string    `gorm:"column:location"`
	StartDate time.Time `gorm:"column:start-date"`
	EndDate   time.Time `gorm:"column:end-date"`
}



func (EventModel) TableName() string{
	return "event"
}
// AutoMigrate  Migrate the schema of database if needed
func AutoMigrate() {
	db := common.GetDB()

	db.AutoMigrate(&EventModel{})
}
