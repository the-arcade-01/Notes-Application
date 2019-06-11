const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const saveElement = document.querySelector('#save-note')
const dateElement = document.querySelector('#last-edited')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function(note){
    return note.id === noteId
})

if(note === undefined) {
    location.assign('/index.html')
}

titleElement.value = note.text
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input',function(event){
    note.text = event.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input',function(event){
    note.body = event.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click',function(event){
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

saveElement.addEventListener('click',function(event){
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(event){
    if(event.key === 'notes') {
        notes = JSON.parse(event.newValue)
        let note = notes.find(function(note){
            return note.id === noteId
        })
        
        if(note === undefined) {
            location.assign('/index.html')
        }
        
        titleElement.value = note.text
        bodyElement.value = note.body   
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})