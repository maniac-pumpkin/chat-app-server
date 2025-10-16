import express from "express"
import http from "node:http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

app.get("/", (_, res) => res.sendStatus(200))

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("message", (msg) => {
    io.emit("message", msg)
  })
})

const PORT = process.env["PORT"]
const SERVER_URL = process.env["SERVER_URL"]

server.listen(PORT, () => console.log(`Server running on http://${SERVER_URL}:${PORT}`))
