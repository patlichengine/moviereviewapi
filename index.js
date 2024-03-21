//Keep your password in the environment variables
import app from './server.js';
import mongodb from 'mongodb';

console.log(process.env)
//import Data access object to access databases that interact 
//wit the pplication
import ReviewsDAO from './dao/reviewsDAO.js';
//require('dotenv').config({path: './config/.env'});

const mongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const mongo_uri  = `mongodb+srv://${mongo_username}:
${mongo_password}@cluster0.yojtoil.mongodb.net/?retryWrites=true&w=majority`;

const port  = 8000;

//connect to the database and catch any intending error
mongoClient.connect(
    mongo_uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    //inject the database connection to the Data Access Object layer
    await ReviewsDAO.injectDB(client)

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
