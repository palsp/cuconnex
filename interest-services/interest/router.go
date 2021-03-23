package interest

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/interest-services/common"
)

func InterestRegister(router *gin.RouterGroup){
	router.GET("/", GetInterests)
}

func GetInterests( c *gin.Context){
	// get db connection from common package
	db := common.GetDB() 
	
	// create response 
	var response []Category
	

	// find all categories in the database
	err := db.Find(&response).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "500 - Internal Error",
		})
	}

	// find interests in the db for each category
	for i, category := range response {
		category.GetInterest()

		// this line is required, otherwise response.Interests will not be set 
		// to query result 
		response[i].Interests = category.Interests
	}
	

	// Set key categories in the context  to the response 
	c.Set("categories",response)
	// Create serializer for response 
	serializer := CategoriesSerializer{c}
	// response with 200 status in a  specific format 
	// see  intereset/serializer.go for more detail
	c.JSON(http.StatusOK, serializer.Response())
	
}