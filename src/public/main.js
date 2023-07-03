const noteForm = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')

noteForm.addEventListener('submit', evt => {
  evt.preventDefault()
  if (title.value.trim() === '' || title.description === '') return

  if (savedId) {
    updateNote(savedId, title.value, description.value)
  } else {
    saveNote(title.value, description.value)
  }

  title.value = ''
  description.value = ''

  title.focus()
})
