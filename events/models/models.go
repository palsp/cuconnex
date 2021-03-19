package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB()  ( error){
	var err error
	dsn := "root:liulaks123@tcp(localhost)/eventdb"
	db , err := gorm.Open(mysql.Open(dsn) , &gorm.Config{})

	if err != nil {
		return  err
	}

	db.AutoMigrate(&Event{})
	DB = db
	return nil
}
