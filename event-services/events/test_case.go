package events

import (
	"net/http"
)

var RequestTests = []struct {
	// init           func(*http.Request)
	url            string
	method         string
	bodyData       string
	expectedCode   int
	responseRegexg string
	msg            string
}{
	{
		// func(req *http.Request) {
		// 	resetDBWithMock()
		// },
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
		"id": 0,
		"event-name": "Test",
		"bio": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
	}`,
		"valid data and should return StatusCreated",
	},
}
