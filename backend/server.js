
const app = require('./app');
const connectDatabase = require('./db/database');


// handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`ERROR ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
});
// config
if(process.env.NODE_ENV !=='PRODUCTION'){
   require('dotenv').config({ path: '../backend/config/.env' });

}

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})

// connect to database
connectDatabase();


// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`ERROR ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});