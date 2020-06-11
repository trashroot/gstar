module.exports = {
    port: process.env.PORT || '2017',
    db: {
        development: {
            // database: process.env.DB_NAME,
            // username: process.env.DB_USER,
            // password: process.env.DB_PASS,
            // host: process.env.DB_HOST || 'localhost',
            dialect: 'sqlite',
            storage: '../db/database.sqlite',
        },
        production: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST || 'localhost',
            dialect: 'sqlite' || 'mysql' || 'postgres',
        }
    },
}