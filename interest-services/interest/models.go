package interest

import (
	"github.com/palsp/cuconnex/interest-services/common"
	"gorm.io/gorm"
)

// belong to category
type Interest struct{
	gorm.Model
	ID int `gorm:"primaryKey"`
	Description string `gorm:"not null;unique"`
	CategoryID int `gorm:"not null;primaryKey;"`
	Category Category `gorm:"references:ID;"`
}


// Category  events
type Category struct {
	gorm.Model
	ID int `gorm:"primaryKey"`
	Name string `gorm:"unique;column:name"`
	Interests []Interest
}


func (Interest) TableName() string {
	return "interest"
}

func (Category) TableName() string {
	return "category"
}

func AutoMigrate(){
	db := common.GetDB()

	db.AutoMigrate(&Interest{} , &Category{})
}


// GetInterest returns all interest related with the category
func (model *Category) GetInterest() error {
	db := common.GetDB()
	// find all interesets that CategoryID matched with this category id
	err := db.Where(&Interest{
		CategoryID: model.ID,
	}).Find(&model.Interests).Error

	return err
}

