package events

import (
	"encoding/json"
	"github.com/palsp/cuconnex/event-services/common"
	"log"
)

type EventCreatedData struct {
	ID uint `json:"id"`
	EventName string `json:"event-name"`
	Registration bool `json:"registration"`
	Status string `json:"status"`
	ExpirationDate string    `json:"expirationDate"`
}


func PublishEventCreated( msg EventCreatedData) error {
	SC := common.GetStanClient()
	if SC == nil {
		log.Printf("Cannot acces stan client")
		return nil
	}

	b ,err := json.Marshal(msg)
	if err != nil {
		return err
	}
	err = SC.Publish("event:created" , b)
	if err != nil {
		return err
	}
	log.Println("event publish")
	return nil
}

type EventUpdatedData struct {
	ID uint 			`json:"id"`
	EventName string 	`json:"event-name"`
	Registration bool 	`json:"registration"`
	Status string 		`json:"status"`
	Image  string        `json:"image"`
	Version int        	`json:"version"`
}

func PublishEventUpdated(msg EventUpdatedData) error {
	SC := common.GetStanClient()
	if SC == nil {
		log.Printf("Cannot acces stan client")
		return nil
	}
	b , err := json.Marshal(msg)
	if err != nil {
		return err
	}
	err = SC.Publish("event:updated" , b)
	if err != nil {
		return err
	}
	log.Println("event publish")
	return nil
}

type EventExpirationData struct {
	ID uint 			`json:"id"`
	ExpirationDate string    `json:"expirationDate"`
}

func PublishEventExpiration(msg EventExpirationData) error{
	SC := common.GetStanClient()
	if SC == nil {
		log.Printf("Cannot acces stan client")
		return nil
	}

	b ,err := json.Marshal(msg)
	if err != nil {
		return err
	}
	err = SC.Publish("event:expiration:started" , b)
	if err != nil {
		return err
	}
	log.Println("event publish on subject" , "event:expiration:started")
	return nil
}
