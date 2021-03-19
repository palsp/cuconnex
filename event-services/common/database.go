package common

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB open a database and save the connection to `database` struct
func InitDB() (*gorm.DB, error) {
	var err error
	dsn := "root:liulaks123@tcp(localhost)/eventdb"
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
	dsn := "root:liulaks123@tcp(localhost)/eventdb_test"
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
