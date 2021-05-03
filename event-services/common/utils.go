package common

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
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


var Category = struct{
	Technology string
	Business string
	Ecommerce string
	Startup string
}{
	Technology: "Technology",
	Business: "Business",
	Ecommerce: "Ecommerce",
	Startup: "Startup",
}




// Bind returns somthing rather than 400 when binding failed
func Bind(c *gin.Context , obj interface{}) error {
	b := binding.Default(c.Request.Method, c.ContentType())
	return c.ShouldBindWith(obj , b)
}

type CommonError struct {
	Errors []string `json:"errors"`
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