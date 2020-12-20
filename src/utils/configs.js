module.exports = {
    port: process.env.PORT,
    dbName: process.env.MONGO_NAME,
    dbPassword: process.env.MONGO_PASSWORD,
    dbUrl: process.env.MONGO_URL,
    saltRound: process.env.SALT_LEN,
    secret: process.env.SECRET

};