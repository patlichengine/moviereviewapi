import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

//define the application entry
const app = express();

//define a middleware to use the cors and json
app.use(cors());
app.use(express.json()) //accept json in the body of the request

//specify some of the initial routes
app.use('/api/v1/reviews', reviews);

//create a backup route incase of wrong use of the routes
app.use('*', (req, res) => {
    res.status(400).json({error: "Document not found"});
});

export default app;