package interests

import (
	"github.com/palsp/cuconnex/event-services/common"
	"gorm.io/gorm"
)


type InterestModel struct{
	gorm.Model
	Description string `gorm:"primaryKey"`
}


func (InterestModel) TableName() string {
	return "interest"
}

func AutoMigrate() {
	db := common.GetDB()

	db.AutoMigrate(&InterestModel{})
}