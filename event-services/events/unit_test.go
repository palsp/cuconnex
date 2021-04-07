package events

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/palsp/cuconnex/event-services/common"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

var test_db *gorm.DB

//Reset test DB and create new one with mock data
func resetDBWithMock() {
	_ = common.TestDBFree(test_db)
	test_db, _ = common.TestDBInit()
	AutoMigrate()
}

func TestCreateEvent(t *testing.T) {
	r := gin.New()

	r.POST("/api/events", CreateEvent)
	for _, testData := range RequestTests {
		bodyData := testData.bodyData
		req, err := http.NewRequest(testData.method, testData.url, bytes.NewBufferString(bodyData))
		req.Header.Set("Content-type", "application/json")
		assert.NoError(t, err, "Should send a request successfully")

		// testData.init(req)
		resetDBWithMock()
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, testData.expectedCode, w.Code, "Response Status - "+testData.msg)
	}
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
