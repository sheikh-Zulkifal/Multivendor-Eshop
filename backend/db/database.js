const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    
    }
    module.exports = connectDatabase;