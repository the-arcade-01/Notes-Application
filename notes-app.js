let notes = getSavedNotes()

const filters = {
    searchText : '',
    sortBy: 'byEdited'
}

renderNotes(notes,filters)

document.querySelector('#create-note').addEventListener('click',function(event){
    const idValue = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        id: idValue,
        text: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${idValue}`)
})

document.querySelector('#search-note').addEventListener('input',function(event){
    filters.searchText = event.target.value
    renderNotes(notes,filters)
})

document.querySelector('#filter-by').addEventListener('change',function(event){
    filters.sortBy = event.target.value
    renderNotes(notes,filters)
})

window.addEventListener('storage',function(event){
    if(event.key === 'notes'){
        notes = JSON.parse(event.newValue)
        renderNotes(notes,filters)
    }
})

