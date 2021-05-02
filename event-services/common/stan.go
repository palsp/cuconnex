package common

import (
	"encoding/json"
	"fmt"
	nats "github.com/nats-io/nats.go"
	stan "github.com/nats-io/stan.go"
	"github.com/palsp/cuconnex/event-services/config"
	"log"
)

var SC stan.Conn


func InitStanClient() (stan.Conn , error){
	nc ,err := nats.Connect(config.SCconfig.URL)
	if err != nil {
		return nil , err
	}
	
	sc , err := stan.Connect(config.SCconfig.ClusterID, config.SCconfig.ClientID , stan.NatsConn(nc));
	if err != nil {
		return nil , err
	}

	fmt.Println("Connect to NATs")
	SC = sc

	return SC , nil
}

func GetStanClient () stan.Conn {
	return SC
}

type EventCreatedData struct {
	ID uint `json:"id"`
	EventName string `json:"event-name"`
	Registration bool `json:"registration"`
	EndDate string    `json:"endDate"`
}

func PublishEventCreated( msg EventCreatedData) error {
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
	Version int        	`json:"version"`
}

func PublishEventUpdated(msg EventUpdatedData) error {
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

func SubscribeEventEnd() error{
	if SC == nil {
		log.Printf("Cannot acces stan client")
		return nil
	}

}