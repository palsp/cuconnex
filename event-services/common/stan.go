package common

import (
	"crypto/rand"
	"encoding/json"
	nats "github.com/nats-io/nats.go"
	stan "github.com/nats-io/stan.go"
	"os"
)

var SC stan.Conn

func GenRandomBytes(size int) (blk []byte, err error) {
	blk = make([]byte, size)
	_, err = rand.Read(blk)
	return
}


func InitStanClient() (stan.Conn , error){
	nc ,err := nats.Connect(os.Getenv("NATS_URL"))
	if err != nil {
		return nil , err
	}
	defer nc.Close()
	blk , _ := GenRandomBytes(4)
	sc , err := stan.Connect("connex", string(blk) , stan.NatsConn(nc))

	if err != nil {
		return nil , err
	}
	defer sc.Close()

	SC = sc
	return SC , nil
}

func GetStanClient () stan.Conn {
	return SC
}

type EventCreatedData struct {
	ID string `json:"id"`
	EventName string `json:"event-name"`
}

func EventCreatedPublisher(msg EventCreatedData) error {
	b ,err := json.Marshal(msg)
	if err != nil {
		return err
	}
	SC.Publish("event:created" , b)
	return nil
}