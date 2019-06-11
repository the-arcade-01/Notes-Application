//Reading existing data from local storage
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}
//Remove a note from the list
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function(notes){
        return notes.id === id
    })
    if(noteIndex > -1){
        notes.splice(noteIndex,1)
    }
}

//Store data localStorage
const saveNotes = function(note){
    localStorage.setItem('notes',JSON.stringify(note))
}

//Generate the DOM structure of note
const generateNoteDOM = function(note){

    const textEl = document.createElement('a')
    const p = document.createElement('div')
    const but = document.createElement('button')
    but.textContent = 'x'
    if(note.text.length > 0) {
        textEl.textContent = note.text
    } else {
        textEl.textContent = 'Unnamed note'
    }
    but.addEventListener('click',function(event){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })

    textEl.setAttribute('href',`/edit.html#${note.id}`)
    p.appendChild(textEl)
    p.appendChild(but)
    return p
}

//Sort notes by one of the three ways
const sortNotes = function(notes,sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if(a.updatedAt > b.updatedAt)   return -1
            else if(b.updatedAt > a.updatedAt)  return 1
            else return 0
        })
    }
    else if(sortBy === 'byCreated'){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt)   return -1
            else if(a.createdAt < b.createdAt)  return 1
            else return 0
        })        
    }
    else if(sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.text.toLowerCase() < b.text.toLowerCase())   return -1
            else if(a.text.toLowerCase() > b.text.toLowerCase()) return 1
            else return 0
        })
    }
}

//Render application notes
const renderNotes = function(notes,filters) {
    notes = sortNotes(notes,filters.sortBy)  
    const filterNotes = notes.filter(function (note){
        return note.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ' '

    filterNotes.forEach(function(note){
        const newNote = document.createElement('p')
        newNote.textContent = note.text
        document.querySelector('#notes').appendChild(newNote)
    })

    document.querySelector('#notes').innerHTML = ' '

    filterNotes.forEach(function(note){
        const p = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(p)
    })
}

//Generate the last edited message
const generateLastEdited = function(time){
    return `Last edited at ${moment(time).fromNow()}`
}
