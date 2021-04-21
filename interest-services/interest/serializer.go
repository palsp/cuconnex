package interest

import (
	"github.com/gin-gonic/gin"
)




type InterestSerializer struct {
	C *gin.Context
	Interest 
}

// Response response schema of interest model 
func (s *InterestSerializer) Response() string {
	return s.Interest.Description
}



type CategorySerializer struct {
	C *gin.Context
	Category
}

// CategoryResponse specify format of category model
type CategoryResponse struct {
	Name string `json:"name"`
	Interests []string `json:"interests"`
}



// Response return response of category model in a specific format
func (s *CategorySerializer) Response() CategoryResponse {
	category := s.Category
	response := CategoryResponse{
		Name: category.Name,
	}
	// a category contain interests field which is 
	// an array of interest model
	for _, interest := range category.Interests {
		serializer := InterestSerializer{s.C , interest}
		// each interest will be serialized by its own serializer
		response.Interests = append(response.Interests, serializer.Response())
	}
	
	return response
}



type CategoriesSerializer struct {
	C *gin.Context
}

// CategoriesResponse is a response schema when 
// we want to serialize array of category model
type CategoriesResponse struct {
	Categories []CategoryResponse
}


// Response return response of an array of category model in a specific format
func (s *CategoriesSerializer)  Response() CategoriesResponse{
	// get value of categories key from context
	// cast it to array of Category Model
	categories := s.C.MustGet("categories").([]Category)

	// create response schema
	response := CategoriesResponse{}
	for _, c := range categories {
		serializer := CategorySerializer{s.C , c}
		// each category will be serialized by its own serializer
		response.Categories = append(response.Categories, serializer.Response())
	}
	return response
}


