package config

import "os"

type DBConfig struct {
	Name string
	Host string
	User string
	Password string
}

type StanConfig struct {
	ClusterID string
	ClientID string
	URL string
}

var DB = DBConfig{
	Name: os.Getenv("DB_NAME"),
	Host: os.Getenv("DB_HOST"),
	User: os.Getenv("DB_USER"),
	Password: os.Getenv("DB_PASSWORD"),
}



var SCconfig = StanConfig{
		ClusterID: os.Getenv("NATS_CLUSTER_ID"),
		ClientID: os.Getenv("NATS_CLIENT_ID"),
		URL: os.Getenv("NATS_URL"),
}


// var SCconfig = StanConfig{
// 	ClusterID: "connex",
// 	ClientID: "1234",
// 	URL: "http://localhost:4222",
// }


var TestDB = DBConfig{
	Name: "eventdb_test",
	Host: "localhost",
	User : "root",
	Password: "password",
}
