package events

import (
	"net/http"
	"time"

	"github.com/palsp/cuconnex/event-services/common"
)

var t = time.Now().UTC()


// ongoing test case

var startOngoing = t.AddDate(0,-1,2)
var endOngoing = t.AddDate(0 , 1 , 2)


var OngoingEventBody = Event{
	EventName: "test_ongoing",
	Bio: "this is a test_ongoing event",
	StartDate: &DateForm{
		Month: startOngoing.Month(),
		Year: startOngoing.Year(),
		Day: startOngoing.Day(),
		Time: &TimeForm{
			Hour: startOngoing.Hour(),
			Minute: startOngoing.Minute(),
			Second: startOngoing.Second(),
		},
	},
	EndDate: &DateForm{
		Month: endOngoing.Month(),
		Year: endOngoing.Year(),
		Day: endOngoing.Day(),
		Time: &TimeForm{
			Hour: endOngoing.Hour(),
			Minute: endOngoing.Minute(),
			Second: endOngoing.Second(),
		},
	},
}



// Upcoming Test case
var startUpcoming = t.AddDate(0,1,2)
var endUpcoming = t.AddDate(0,3,2)

var UpcomingEventBody = Event{
	EventName: "test_ongoing",
	Bio: "this is a test_ongoing event",
	StartDate: &DateForm{
		Month: startUpcoming.Month(),
		Year: startUpcoming.Year(),
		Day: startUpcoming.Day(),
		Time: &TimeForm{
			Hour: startUpcoming.Hour(),
			Minute: startUpcoming.Minute(),
			Second: startUpcoming.Second(),
		},
	},
	EndDate: &DateForm{
		Month: endUpcoming.Month(),
		Year: endUpcoming.Year(),
		Day: endUpcoming.Day(),
		Time: &TimeForm{
			Hour: endUpcoming.Hour(),
			Minute: endUpcoming.Minute(),
			Second: endUpcoming.Second(),
		},
	},
}

// Closed Test case
var startClosed = t.AddDate(0,-3,2)
var endClosed = t.AddDate(0,-1,2)

var ClosedEventBody = Event{
	EventName: "test_ongoing",
	Bio: "this is a test_ongoing event",
	StartDate: &DateForm{
		Month: startClosed.Month(),
		Year: startClosed.Year(),
		Day: startClosed.Day(),
		Time: &TimeForm{
			Hour: startClosed.Hour(),
			Minute: startClosed.Minute(),
			Second: startClosed.Second(),
		},
	},
	EndDate: &DateForm{
		Month: endClosed.Month(),
		Year: endClosed.Year(),
		Day: endClosed.Day(),
		Time: &TimeForm{
			Hour: endClosed.Hour(),
			Minute: endClosed.Minute(),
			Second: endClosed.Second(),
		},
	},
}

var RequestTests = []struct {
	// init           func(*http.Request)
	url            string
	method         string
	bodyData       Event
	expectedCode   int
	expectedStatus string
	responseRegexg string
	msg            string
}{
	{
		// func(req *http.Request) {
		// 	resetDBWithMock()
		// },
		"/api/events",
		"POST",
		OngoingEventBody,
		http.StatusCreated,
		common.EventStatus.Ongoing,
		`{
		"id": 0,
		"event-name": "Test",
		"bio": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
		
	}`,
		"valid data and should return Ongoing status",
	},
	{
		// func(req *http.Request) {
		// 	resetDBWithMock()
		// },
		"/api/events",
		"POST",
		UpcomingEventBody,
		http.StatusCreated,
		common.EventStatus.Upcoming,
		`{
		"id": 0,
		"event-name": "Test",
		"bio": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
		
	}`,
		"valid data and should return Upcoming status",
	},
	{
		// func(req *http.Request) {
		// 	resetDBWithMock()
		// },
		"/api/events",
		"POST",
		ClosedEventBody,
		http.StatusCreated,
		common.EventStatus.Closed,
		`{
		"id": 0,
		"event-name": "Test",
		"bio": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
		
	}`,
		"valid data and should return Closed Status",
	},
}


var GetEventRequest = []struct{
	url            string
	method         string
	bodyData 	   string
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
		``,
		http.StatusOK,
		`{
		"id": 0,
		"event-name": "Test",
		"bio": "This is great",
		"location": "",
		"start-date": "2021-01-18T12:00:00Z",
		"end-date": "2021-03-18T12:00:00Z"
		
	}`,
		"valid data and should return Upcoming status",
	},
		
}