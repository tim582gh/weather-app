const fs = require('fs')
// const chalk = require('chalk')

const getNotes = function (myNotes) {
    notes = myNotes 
    return notes
}

const addNote = (fileName, title, body) => {
    
    const notesObj = loadNotes(fileName)
    const chkDuplicateNotes = notesObj.filter((ObjIndex) => ObjIndex.title === title)

    // debugger

    // console.log(chkDuplicateNotes)
    if (chkDuplicateNotes.length === 0){
        notesObj.push({
            title: title, 
            body: body
        })
        saveNotes(notesObj, fileName)
        // console.log('New note added')
        console.log('New Note title: '+ title + ' and body: ' + body + ' are added to file: ' + fileName)
    } else {
        console.log('Note title taken.')
    }
    return true
}

const removeNote = (fileName, title) => {
    // console.log(fileName, title)
    const notesObj = loadNotes(fileName)
    
    
    const titleToDelete = notesObj.filter(function(ObjIndex) {
    // console.log('in addNote->chkDuplicateNotes', ObjIndex)
    return ObjIndex.title === title
    })

//    console.log('titleToDelete: ', titleToDelete)

    const logNotesObj = loadNotes('noteslog.json')
    
    if (titleToDelete.length === 0){
        // console.log(chalk.bgRed('No note found, no note is removed'))
        console.log('No note found, no note is removed')
    } else {
        
        logNotesObj.push(
            titleToDelete
        )
        saveNotes(logNotesObj, 'noteslog.json')

        // console.log(chalk.bgGreen('Title to be deleted: '), titleToDelete)
        console.log('Title is deleted: ', titleToDelete)
        const notesToKeep = notesObj.filter(function(ObjIndex) {
            return ObjIndex.title !== title
        })
        saveNotes(notesToKeep, fileName);
    }

    return true    
}

const listNote = (fileName) => {
    console.log("list notes from file:" + fileName)
    const notesObj = loadNotes(fileName)
    
    notesObj.forEach(function(note) {
        // console.log(chalk.green.inverse(note.title, note.body))
    })

    return true
}

const readNote = (fileName, title) => {
    // console.log(fileName, title)
    const notesObj = loadNotes(fileName)    
    const titleToRead = notesObj.find((ObjIndex) => ObjIndex.title === title)
    
    if (!titleToRead) {
        // console.log(chalk.red.inverse('Note not found!'))
        console.log('Note not found!')
    } else {
        // console.log(chalk.green.inverse(titleToRead.title, titleToRead.body))
        console.log(titleToRead.title, titleToRead.body)
    }

    return true    
}

const saveNotes = function (notesObj, fileName) {
    const dataString = JSON.stringify(notesObj)
    fs.writeFileSync(fileName, dataString)
    console.log('Note is saved to:' + fileName)
}

const loadNotes = function (fileName) {
    // fileName = 'notes.json'
    try {
        const dataBuffer = fs.readFileSync(fileName)
        const dataString = dataBuffer.toString()
        console.log(fileName + ' is loaded.')
        return JSON.parse(dataString)
    } catch (e) {
        console.log('New log file create for ' + fileName)
        fs.writeFileSync(fileName, "")
        return []
    }
    
    


}

module.exports = {
    getNotes: getNotes, 
    addNote: addNote, 
    removeNote: removeNote, 
    listNote: listNote, 
    readNote: readNote
}