module.exports = {
    HOST: "localhost",
    USER: "anon",
    PASSWORD: "anon123",
    DB: "anon",
    MODELS: [],
    dialect: "postgres",
    //Sequelize Pool config
    pool: { 
        max: 5, //max no of connection
        min: 0, //min no of connection
        acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
};