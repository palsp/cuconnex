package events

import (
	"encoding/json"
	"fmt"
	"github.com/nats-io/stan.go"
	"github.com/palsp/cuconnex/event-services/common"
	"log"
)

type EventEndedData struct {
	ID uint 			`json:"id"`
}

func SubscribeEventCompleted(msg *stan.Msg) {
	var eventEndData = &EventEndedData{}
	json.Unmarshal(msg.Data , eventEndData)
	db := common.GetDB()

	var e = &EventModel{}
	db.First(e , eventEndData.ID)

	fmt.Println(e.ID , eventEndData.ID)

	if e.Status == common.EventStatus.Upcoming {
		e.Status = common.EventStatus.Ongoing
	}else if e.Status == common.EventStatus.Ongoing {
		e.Status = common.EventStatus.Closed
	}

	err := db.Save(e).Error

	if e.Status == common.EventStatus.Ongoing {
		PublishEventExpiration(EventExpirationData{
			ID: e.ID,
			ExpirationDate: e.EndDate.String(),
		})
	}

	if err != nil {
		log.Println("updated event failed")
		return
	}


	err = PublishEventUpdated(EventUpdatedData{
		ID: e.ID,
		EventName: e.EventName,
		Registration: e.Registration,
		Status: e.Status,
		Version: e.Version,
	})

	if err != nil {
		log.Printf("error publish event:created : %v" , err)
	}else{
		log.Printf("Event published to subject %v" , "event:updated")
	}

	msg.Ack()
}



