package interest

import (
	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/interest-services/common"
)



func GetInterests( c *gin.Context){
	db := common.GetDB() 
	
	var cats []Category
	var ints []Interest


	db.Model(&cats).Association("Interests").Find(&ints)
	


	
}