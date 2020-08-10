import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');
    
   
    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unamed note';
    }

    textEl.classList.add('list-item__title')
    noteEl.append(textEl);

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`);
    noteEl.classList.add('list-item');

    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    noteEl.append(statusEl);

    return noteEl;
}

// Render application notes
const renderNotes = () => {
    const notesElement = document.getElementById('notes');
    
    // Set sortNotes function equal to filters sort method
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    
    notesElement.innerHTML = '';

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note);
            notesElement.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show';
        emptyMessage.classList.add('empty-message')
        notesElement.appendChild(emptyMessage);
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.getElementById('note-title');
    const bodyElement = document.getElementById('note-body');
    const dateElement = document.getElementById('last-edited');

    const notes = getNotes();

    // find note id in getNotes
    const note = notes.find((note) => note.id === noteId);

    if(!note) {
        location.assign('/index.html');
    };

    // load edit page with data from note object
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited: ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }