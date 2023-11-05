/*
1. First it is simple http api call with code header-get-update to websockets.
2. http response, if server suppport websockets, its reponse will be changing protocol, 
*/


const http = require("http")
const WebSocketServer = require("websocket").server
let connection = null;
const httpServer = http.createServer((req,res)=>{
    console.log("We have received a request")
})



// create a websocket
/* For creation of websocket, for making connection open it needs http: for handshaking */
const websocket = new WebSocketServer({
    "httpServer":httpServer
})// this line doing handshaking, because we have http to websocket, so first api call will do handshake..

websocket.on("request", request=>{
    connection = request.accept(null,request.origin)// so we can accept the things that client send us, I think we can reject as well.
    console.log("-------------------------------Connection another client accepted-----------------------",connection)
    // request.accept will send connection as response, so thsi is the result of the handshaking, switching porotool, we get in connection string.
    connection.on("open", ()=> console.log("OPENED!!!!"))
    connection.on("close", ()=> console.log("CLOSED!!!!"))// do any kind of oeprations here, database query, or anything.
    connection.on("message", message=> {
        console.log(`RECEIVED MESSAGE  ${message.utf8Data}`)
    })
    sendevery5seconds();
    // do any kind of oeprations here, database query, or anything.
})

httpServer.listen(8080,()=> console.log("My sever is litening on port 8080"))



function sendevery5seconds(){
    connection.send(`Hey client ${Math.random()} `)
    setTimeout(sendevery5seconds, 3000)

}



// what if 2 clients and 1 server, what it will behave....
/* client side :

let ws = new WebSocket("ws://localhost:8080")
ws.onmessage = message=> console.log(`we received a message from server ${message.data}`)

ws.send("hey server")


1. we have one connection object, what if multiple clients tried to connect?
2. chat application using this technology.
3. multiple connections multiple servers.


*/



// ISSUES


/* In this code there is issue while connecting to multiplle clients,
the server side connection variable is overriding so, teh client which
connected last, server will only send messages to taht..


But every client is connected to server. But server has not that connection variable.

*/


// 3. server never knows client is disconneced nor not.
