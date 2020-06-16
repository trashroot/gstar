/* eslint-disable no-unused-vars */
const express = require('express')
const expressApiRoutes = require('express-api-routes')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const ejs = require('ejs')
const defUser = require('./services/default.users') // Insert default records

const config = require('./config/config')
const routes = require('./config/routes')
const { dbConnection } = require('./config/database')
dbConnection();
const environment = process.env.NODE_ENV;

const app = express()

app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
}))

app.get('/', function (req, res) {
    res.render('index.html', {title: 'Working'})    
})

const api = new expressApiRoutes({
    routes: routes,
    baseRoute: '/api',
    app: app
})

app.listen(config.port, ()=>{
    if (environment !== 'production' &&
        environment !== 'development'
    ) {
        console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
    }
    setTimeout(function(){
        defUser() // Insert default records
    }, 3000)
    
    console.log(`Server is running at ${config.port}`);   
    return true; 
})