package handler

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/events/models"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)


var test_db *gorm.DB

var RequestTests = []struct {
	init           func(*http.Request)
	url            string
	method         string
	bodyData       string
	expectedCode   int
	responseRegexg string
	msg            string
}{
	{
	func(req *http.Request){
		resetDBWithMock()
	},
	"/api/events",
	"POST",
	` {
		"event-name" : "Test",
		"description" : "This is great",
		"start-date" : {
				 "month" : 1,
				 "day" : 18,
				 "year" : 2021,
				 "time" : {
					  "hour" : 12,
					  "minute" : 0,
					  "second" : 0
			  }
		},
		"end-date" : {
			"month" : 3,
			"day" : 18,
			"year" : 2021,
			"time" : {
				 "hour" : 12,
				 "minute" : 0,
				 "second" : 0
		 }
		}
	}`,
	http.StatusCreated,
	`{
		"ID": 0,
		"CreatedAt": "0001-01-01T00:00:00Z",
		"UpdatedAt": "0001-01-01T00:00:00Z",
		"DeletedAt": null,
		"id": 3,
		"event-name": "Test",
		"description": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
	}`,
	"valid data and should return StatusCreated",
},
}

//Reset test DB and create new one with mock data
func resetDBWithMock() {
	_ = models.TestDBFree(test_db)
	models.AutoMigrate()
}




func TestCreateEvent(t *testing.T) {
	r := gin.New()

	r.POST("/api/events",CreateEvent)
	for _ , testData := range RequestTests {
		bodyData := testData.bodyData
		req , err := http.NewRequest(testData.method, testData.url, bytes.NewBufferString(bodyData))
		req.Header.Set("Content-type", "application.json")
		assert.NoError(t, err, "Should send a request successfully")


		testData.init(req)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req )

		assert.Equal(t, testData.expectedCode, w.Code, "Response Status - " + testData.msg)
	}
}


//This is a hack way to add test database for each case, as whole test will just share one database.
//You can read TestWithoutAuth's comment to know how to not share database each case.
func TestMain(m *testing.M){
	test_db, _ = models.TestDBInit()
	models.AutoMigrate()
	exitVal := m.Run()
	models.TestDBFree(test_db)
	os.Exit(exitVal)

}