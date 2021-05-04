package common

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"reflect"
	"strings"
)

var EventStatus = struct{
	Closed string
	Ongoing string
	Upcoming string
}{
	Closed: "Closed",
	Ongoing: "Ongoing",
	Upcoming: "Upcoming",
}






type Technology struct{
	Coding string
	WebBuilder string
	ChatBot string
	FinTech string
}

type Design struct{
	Graphic string
	UXUI string
	Ads string
	Fashion string
}

type Business struct{
	Marketing string
	BusinessCase string
	Startup string
	Ecommerce string
}

var T =  Technology{
	Coding: "Coding",
	WebBuilder: "Web Builder",
	ChatBot: "ChatBot",
	FinTech: "FinTech",
}

var B = Business{
	Marketing :"Marketing",
	BusinessCase : "Business Case",
	Startup : "Startup",
	Ecommerce :"Ecommerce",
}

var D = Design{
	Graphic : "Graphic",
	UXUI : "UXUI",
	Ads : "Ads",
	Fashion : "Fashion",
}

type Category  struct{
	Technology Technology
	Business Business
	Design Design
}


var Cat = Category{
	Technology : T,
	Business: B,
	Design: D,
}



// Bind returns somthing rather than 400 when binding failed
func Bind(c *gin.Context , obj interface{}) error {
	b := binding.Default(c.Request.Method, c.ContentType())
	return c.ShouldBindWith(obj , b)
}

type CommonError struct {
	Errors []string `json:"errors"`
}




func StructToSlice(s interface{}) []interface{}  {
	v := reflect.ValueOf(s)

	values := make([]interface{}, v.NumField())

	for i := 0; i < v.NumField(); i++ {
		values[i] = v.Field(i).Interface()
	}

	return values
}


// URLDecoder empty space is invalid in the url,client must replace " " with "-"
// and the original word will be decoded with this function
func URLDecoder(s string) string{
	return strings.ReplaceAll(s , "-"," ")
}



// NewValidatorError handle the error returned by c.Bind in gin framwork
// func NewValidatorError(err error) CommonError {
// 	res := CommonError{}
// 	errs := err.(validator.ValidationErrors)
// 	for _,v := range errs {
// 		// can translate each error one at a time
// 		if v.Param() != "" {
// 			res.Errors = append(res.Errors, fmt.Sprintf(`{"message":%v,"field":}`, v.Tag() , v.Param()))
// 		}else{

// 		}
// 	}
// }