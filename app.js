require ('dotenv').config();
const express = require('express');

const app = express();
const PORT = 3500
const mongoose  = require('mongoose');
mongoose.set('strictQuery', true);
const taskRouter = require('./route/taskRouter');
const notFound = require('./middleware/notFoundRoute');
const errorHandler = require('./middleware/errorHandler');


//midddlemware
app.use(express.json());

//routes
app.use('/api/v1/tasks', taskRouter);
app.use(errorHandler);

//ERROR routes
app.use(notFound);





const startServer = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,() =>{
            console.log(`server running on port ${PORT}...`);
        });
    }catch(error){
        console.log(error)
    }
};
startServer();




