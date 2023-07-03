const socket = io()

const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

/**
 * Save a new note.
 * @param {string} title is the note title.
 * @param {string} description is the note description.
 */
const saveNote = (title, description) => {
  socket.emit('client:newnote', {
    title,
    description
  })
}

/**
 * Delete a saved note.
 * @param {string} id is the id from the note to be deleted.
 */
const deleteNote = id => {
  socket.emit('client:deletenote', id)
}

/**
 * Get one note.
 * @param {string} id is the id from the note to be selected.
 */
const getNote = id => {
  socket.emit('client:getnote', id)
}

/**
 * Is a function to update a note previously selected.
 * @param {string} id is the id from the note to be updated.
 * @param {string} title is the title of the note to be updated.
 * @param {string} description is the description of the note to be updated.
 */
const updateNote = (id, title, description) => {
  socket.emit('client:updatenote', {
    id,
    title,
    description
  })
}

socket.on('server:newnote', (data) => {
  appendNote(data)
  toastBootstrap.show()
})

socket.on('server:loadnotes', renderNotes)

socket.on('server:selectednote', note => {
  const title = document.querySelector('#title')
  const description = document.querySelector('#description')

  title.value = note.title
  description.value = note.description

  savedId = note.id
})
