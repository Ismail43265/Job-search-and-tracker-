const http=require('http');

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app= require("./app.js");

const PORT=process.env.PORT;

const server=http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Server is listning on ${PORT}`)
});