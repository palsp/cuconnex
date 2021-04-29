package common

import (
	"encoding/json"
	"log"
	"os"

	nats "github.com/nats-io/nats.go"
	stan "github.com/nats-io/stan.go"
)

var SC stan.Conn


func InitStanClient() (stan.Conn , error){
	//nc ,err := nats.Connect(os.Getenv("NATS_URL"))
	nc ,err := nats.Connect(os.Getenv("NATS_URL"))
	if err != nil {
		return nil , err
	}
	
	sc , err := stan.Connect(os.Getenv("NATS_CLUSTER_ID"), os.Getenv("NATS_CLIENT_ID") , stan.NatsConn(nc))

	if err != nil {
		return nil , err
	}

	SC = sc

	return SC , nil
}

func GetStanClient () stan.Conn {
	return SC
}

type EventCreatedData struct {
	ID uint `json:"id"`
	EventName string `json:"event-name"`
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