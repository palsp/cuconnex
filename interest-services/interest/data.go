package interest

import "gorm.io/gorm"


type Category_Interest struct {
	Category Category 
	Interest []Interest
}

var TECH = Category_Interest{
	Category: Category{Name: "Technology"},
	Interest: []Interest{
		{ID : 1,  Description: "Coding"},
		{ID : 2 , Description: "Web Builder"},
		{ID : 3 , Description: "ChatBot"},
		{ID : 4 , Description: "FinTech"},
	},
}

var DESIGN = Category_Interest{
	Category: Category{Name : "Design"},
	Interest: []Interest{
		{ID: 1 , Description: "Graphic"},
		{ID: 2 , Description: "UXUI" },
		{ID: 3 , Description: "Ads" },
		{ID: 4 , Description: "Fashion" },
	},
}


var BUSINESS = Category_Interest{
	Category: Category{Name: "Business"},
	Interest: []Interest{
		{ID: 1 , Description: "Marketing"},
		{ID: 2 , Description: "Business Case" },
		{ID: 3 , Description: "Startup" },
		{ID: 4 , Description: "Ecommerce" },
	},
}


var InitialData = []Category_Interest{TECH , DESIGN , BUSINESS}


func InitializeData(db *gorm.DB){
	for _, cat := range InitialData {
		db.Create(&cat.Category)

		for _,interest := range cat.Interest {
			db.Model(&cat.Category).Association("Interests").Append(&interest)
		}
	}
}