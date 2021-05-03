package classification

import (
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/events"
	"gorm.io/gorm"
)


// Category  events
type Category struct {
	gorm.Model
	ID int `gorm:"primaryKey"`
	Name string `gorm:"unique;"`
	Events []events.EventModel
}




func (Category) TableName() string {
	return "category"
}



func AutoMigrate(){
	db := common.GetDB()
	db.AutoMigrate(&Category{})
}