const noteList = document.querySelector('#notes')

let savedId = ''

/**
 * Is a function to render the notes.
 * @param {object} note is an object with all the notes information.
 * @returns an ui element with the note information.
 */
const noteUI = note => {
  const card = document.createElement('div')
  card.className = 'card card-body rounded-0 mb-2 animate__animated animate__fadeInUp animate__fadeInOut'

  const header = document.createElement('div')
  header.className = 'd-flex justify-content-between'

  const title = document.createElement('h1')
  title.className = 'h3 card-title'
  title.textContent = note.title

  const buttons = document.createElement('div')
  buttons.className = 'd-flex gap-2'

  const deleteButton = document.createElement('button')
  deleteButton.className = 'btn btn-danger delete'
  deleteButton.textContent = 'delete'
  deleteButton.dataset.id = note.id

  const updateButton = document.createElement('button')
  updateButton.className = 'btn btn-secondary update'
  updateButton.textContent = 'update'
  updateButton.dataset.id = note.id

  buttons.appendChild(deleteButton)
  buttons.appendChild(updateButton)

  const description = document.createElement('p')
  description.textContent = note.description

  header.appendChild(title)
  header.appendChild(buttons)

  card.appendChild(header)
  card.appendChild(description)

  deleteButton.addEventListener('click', () => deleteNote(deleteButton.dataset.id))
  updateButton.addEventListener('click', () => getNote(updateButton.dataset.id))

  return card
}

const renderNotes = notes => {
  noteList.innerHTML = ''
  notes.forEach(note => {
    noteList.append(noteUI(note))
  })
}

const appendNote = note => {
  noteList.append(noteUI(note))
}
