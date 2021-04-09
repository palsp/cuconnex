package common

import (
	"database/sql"
	"fmt"

	"github.com/palsp/cuconnex/event-services/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// CreateDSN returns data source name
func CreateDSN(user,password,host,dbName string) string{
	return fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",user,password,host,dbName)
}



// InitDB open a database and save the connection to `database` struct
func InitDB() (*gorm.DB, error) {
	var err error
	dsn := CreateDSN(config.DB.User , config.DB.Password , config.DB.Host , config.DB.Name)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("db err:", err)
		return nil, err
	}


	DB = db
	return DB, nil
}

// TestDBInit will create a temporarily database for running testing cases
func TestDBInit() (*gorm.DB, error) {
	dsn := CreateDSN(config.TestDB.User, config.TestDB.Password,config.TestDB.Host,"")
	//test_db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	//
	//if err != nil {
	//	fmt.Println("db err:", err)
	//	return nil, err
	//}

	db , err := sql.Open("mysql" , dsn)
	if err != nil {
		fmt.Println("db err : connecting to mysql")
		panic(err)
	}

	stmt , _ := db.Prepare("CREATE DATABASE IF NOT EXISTS " + config.TestDB.Name )
	_ , err = stmt.Exec()
	if err != nil {
		fmt.Println("db err : create database failed")
		panic(err)
	}

	 dsn = CreateDSN(config.TestDB.User, config.TestDB.Password,config.TestDB.Host,config.TestDB.Name)
	test_db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("db err:", err)
		return nil, err
	}

	DB = test_db
	return DB, nil

}

// TestDBFree delete the database after running testing case
func TestDBFree(test_db *gorm.DB) error {
	db, err := test_db.DB()
	db.Exec("DROP DATABASE ?", "eventdb_test")
	db.Close()

	return err
}

// GetDB returns a connection
func GetDB() *gorm.DB {
	return DB
}
