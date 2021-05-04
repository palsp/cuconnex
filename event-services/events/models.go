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
	Image     string     `gorm:"column:image"`
	Interest  []*InterestModel `gorm:"many2many:interest_event;association_jointable_foreignkey:eventId""`
	Version int
}


type InterestModel struct {
	gorm.Model
	ID		 uint   `gorm:"primaryKey"`
	Interest string `gorm:"unique"`
	Events   []*EventModel  `gorm:"many2many:interest_event;association_jointable_foreignkey:interestId""`
}


type InterestEventModel struct {
	 EventID 	uint   `gorm:"primaryKey"`
	 InterestID  uint  `gorm:"primaryKey"`
}


func (EventModel) TableName() string{
	return "events"
}

func (InterestModel) TableName() string {
	return "interest"
}

// AutoMigrate  Migrate the schema of database if needed
func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&EventModel{})
	db.AutoMigrate(&InterestModel{})
	err := db.SetupJoinTable(&InterestModel{}, "Events", &InterestEventModel{})
	if err != nil {
		// do something.......
		log.Println(err)
	}
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
func (e *EventModel) UpdateOne(data *EventModel) error{
	db := common.GetDB()
	e.EventName = data.EventName
	e.Bio = data.Bio
	e.Location = data.Location
	e.Registration = data.Registration
	e.StartDate = data.StartDate
	e.EndDate = data.EndDate
	err := db.Save(e).Error
	return err
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



func GetInterestByName(interest string) (InterestModel , error){
	db := common.GetDB()
	i := InterestModel{}
	err := db.Where("interest = ?" , interest).First(&i).Error

	return i , err

}

func (i *InterestModel) GetEventByInterest() ([]EventModel, error){
	db := common.GetDB()
	es := []EventModel{}
	err := db.Model(i).Association("Events").Find(&es)
	if err != nil {
		return nil , err
	}

	return es , nil

}

func (e *EventModel) AddEventToInterest(interest string) error{
	db := common.GetDB()

	//var i = InterestModel{}
	//err := db.Where("interest = ?" , interest).First(&i).Error
	i , err := GetInterestByName(interest)

	if err != nil {
		return err
	}

	err = db.Model(&i).Association("Events").Append(e)

	if err != nil {
		return err
	}

	return nil
}


// InitInterest add entry to interest table, this will be needed only once
func InitInterest(){
	values := common.StructToSlice(common.Cat)
	db := common.GetDB()

	for _ , v := range values {
		vx := common.StructToSlice(v)
		for _, vxv := range  vx {
			interest := InterestModel{
				Interest: vxv.(string),
			}

			db.Create(&interest)

		}
	}


}