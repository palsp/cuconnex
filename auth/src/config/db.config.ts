export const db_config = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_SCHEMA,
    MODELS: [],
    dialect: "mysql",
    //Sequelize Pool config
    pool: {
        max: 5, //max no of connection
        min: 0, //min no of connection
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
};

export const test_config = {
    host: "localhost",
    user: "root",
    password: "password",
    db: "test_db",
    MODELS: [],
    dialect: "mysql",
}