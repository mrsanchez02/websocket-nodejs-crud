import express from 'express'
import path from 'path'
import { Server as WebSocketServer } from 'socket.io'
import http from 'http'
import { v4 as uuid } from 'uuid'

let notes = []

const app = express()
const Server = http.createServer(app)
const io = new WebSocketServer(Server)

io.on('connection', (socket) => {
  console.log('New connection: ', socket.id)

  socket.emit('server:loadnotes', notes)

  socket.on('client:newnote', newNote => {
    const note = { ...newNote, id: uuid() }
    notes.push(note)
    io.emit('server:newnote', note)
  })

  socket.on('client:deletenote', id => {
    notes = notes.filter(note => note.id !== id)
    io.emit('server:loadnotes', notes)
  })

  socket.on('client:getnote', noteId => {
    const selectednote = notes.find(note => note.id === noteId)
    socket.emit('server:selectednote', selectednote)
  })

  socket.on('client:updatenote', updatedNote => {
    notes = notes.map(note => {
      if (note.id === updatedNote.id) {
        note.title = updatedNote.title
        note.description = updatedNote.description
      }
      return note
    })
    io.emit('server:loadnotes', notes)
  })
})

app.use(express.static(path.join(__dirname, '/public')))

Server.listen(3300, () => console.log('Server running on port 3300'))
