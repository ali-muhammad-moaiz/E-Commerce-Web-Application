const app = require('./app.js');
const dotenv = require('dotenv');
const {connectDatabase} = require('./config/database.js');

dotenv.config({path:'backend/config/.env'});
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection (for incorrect database url)
process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Unhandled Rejection");

    server.close(()=>{
        process.exit(1);
    });
});

process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Unhandled Rejection");

    server.close(()=>{
        process.exit(1);
    });
});