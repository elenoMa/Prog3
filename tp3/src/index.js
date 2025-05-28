const Server = require('./server.js');
const {connectDB} = require('./config/database.js');


connectDB()
const server = new Server("ejs");

server.listen();