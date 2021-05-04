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

type S3Config struct {
	Bucket string
	Region string
	Credential string
	AccessKeyID  string
	SecretAccessKey  string
}


var S3 = S3Config{
	Bucket: os.Getenv("AWS_BUCKET"),
	Region: os.Getenv("AWS_REGION"),
	AccessKeyID : os.Getenv("AWS_ACCESS_KEY"),
	SecretAccessKey : os.Getenv("AWS_SECRET_ACCESS_KEY"),
}



var SCconfig = StanConfig{
		ClusterID: os.Getenv("NATS_CLUSTER_ID"),
		ClientID: os.Getenv("NATS_CLIENT_ID"),
		URL: os.Getenv("NATS_URL"),
}



var TestDB = DBConfig{
	Name: "eventdb_test",
	Host: "localhost",
	User : "root",
	Password: "password",
}

