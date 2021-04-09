package classification

import (
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/palsp/cuconnex/event-services/events"
	"gorm.io/gorm"
)

// User has and belong to many interest
type User struct {
	gorm.Model
	ID string `gorm:"primaryKey"`
	Interests []*Interest `gorm:"many2many:user_interests"`
}

// Interest has and belong to many user
// belong to category
type Interest struct{
	gorm.Model
	ID int `gorm:"primaryKey"`
	Description string `gorm:"not null;unique"`
	Users []*User `gorm:"many2many:user_interests"`
	CategoryID int `gorm:"not null;primaryKey"`
	Category Category `gorm:"references:ID;"`
}


// Category  events
type Category struct {
	gorm.Model
	ID int `gorm:"primaryKey"`
	Name string `gorm:"unique;"`
	Interests []Interest
	Events []events.EventModel 
}

// Team belong to Event
type Team struct {
	gorm.Model
	ID string `gorm:"primaryKey"`
	EventID int
	Event events.EventModel 
}


// declare table name
func (User) TableName() string { 
	return "user"
}

func (Interest) TableName() string {
	return "interest"
}

func (Category) TableName() string {
	return "category"
}

func (Team) TableName() string {
	return "team"
}


func AutoMigrate(){
	db := common.GetDB()

	db.AutoMigrate(&User{} , &Interest{} , &Category{} , &Team{})
}