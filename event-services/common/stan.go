package common

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	nats "github.com/nats-io/nats.go"
	stan "github.com/nats-io/stan.go"
	"log"
	"os"
)

var SC stan.Conn

func GenRandomBytes(size int) (blk []byte, err error) {
	blk = make([]byte, size)
	_, err = rand.Read(blk)
	return
}


func InitStanClient() (stan.Conn , error){
	//nc ,err := nats.Connect(os.Getenv("NATS_URL"))
	nc ,err := nats.Connect(os.Getenv("http://localhost:4222"))
	if err != nil {
		return nil , err
	}
	blk , _ := GenRandomBytes(4)

	sc , err := stan.Connect("connex", fmt.Sprintf("%x",blk) , stan.NatsConn(nc))

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