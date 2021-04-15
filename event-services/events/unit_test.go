package events

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

var test_db *gorm.DB

//Reset test DB and create new one with mock data
func resetDBWithMock() {
	test_db.Where("1=1").Delete(&EventModel{})
	//db   .Delete(&EventModel{})
	_ = common.TestDBFree(test_db)
	test_db, _ = common.TestDBInit()
	AutoMigrate()
}

func TestCreateEvent(t *testing.T) {
	r := gin.New()

	r.POST("/api/events", CreateEvent)
	for _, testData := range RequestTests {
		bodyData := testData.bodyData
		body , _ := json.Marshal(bodyData)

		req, err := http.NewRequest(testData.method, testData.url, bytes.NewBufferString(string(body)))
		req.Header.Set("Content-type", "application/json")
		assert.NoError(t, err, "Should send a request successfully")

		// testData.init(req)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		resetDBWithMock()
		var resp EventResponse
		json.Unmarshal([]byte(w.Body.String()) , &resp)
		assert.Equal(t, testData.expectedCode, w.Code, "Response Status - "+testData.msg)
		assert.Equal(t, testData.expectedStatus , resp.Status)
	}
}

func TestGetAllEvent(t *testing.T) {
	r := gin.New()
	r.GET("/api/events" , GetAllEvent)
	event := EventModel{
		EventName : "Test_Event",
		Bio : "This is a test event",
		Location : "",
		StartDate : time.Now(),
		EndDate   : time.Now(),
		Status: common.EventStatus.Ongoing,
		Registration: true,
	}

	err := SaveOne(&event)

	assert.NoError(t, err , "Should successfully save to database ")
	req, err := http.NewRequest("GET", "/api/events", bytes.NewBufferString(""))
	req.Header.Set("Content-type", "application/json")
	assert.NoError(t, err, "Should send a request successfully")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)


	assert.Equal(t, 200, w.Code)
	var resp EventsResponse
	json.Unmarshal([]byte(w.Body.String()) , &resp)
	assert.Equal(t, 1 , len(resp.Events))
	assert.Equal(t, event.EventName , resp.Events[0].EventName )
	assert.Equal(t, event.Bio , resp.Events[0].Bio )
	assert.Equal(t, event.Location , resp.Events[0].Location )
	assert.Equal(t, event.Status , resp.Events[0].Status)
	assert.Equal(t, event.Registration , resp.Events[0].Registration)

	// TODO : Test Time

	resetDBWithMock()
}

//This is a hack way to add test database for each case, as whole test will just share one database.
//You can read TestWithoutAuth's comment to know how to not share database each case.
func TestMain(m *testing.M) {
	test_db, _ = common.TestDBInit()
	AutoMigrate()
	exitVal := m.Run()
	common.TestDBFree(test_db)
	os.Exit(exitVal)

}
