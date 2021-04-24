package config

type DBConfig struct {
	Name string
	Host string
	User string
	Password string
}

// var DB = DBConfig{
// 	Name: os.Getenv("DB_NAME"),
// 	Host: os.Getenv("DB_HOST"),
// 	User: os.Getenv("DB_USER"),
// 	Password: os.Getenv("DB_PASSWORD"),
// }


var DB = DBConfig{
	User : "root",
	Name: "eventdb",
	Host: "localhost",
	Password: "liulaks123",
}


var TestDB = DBConfig{
	Name: "eventdb_test",
	Host: "localhost",
	User : "root",
	Password: "liulaks123",
}
