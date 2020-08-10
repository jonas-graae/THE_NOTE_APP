import { initializeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';

const titleElement = document.getElementById('note-title');
const bodyElement = document.getElementById('note-body');
const dateElement = document.getElementById('last-edited');
const removeElement = document.getElementById('remove-note');
const noteId = location.hash.substring(1);

// Get data from note with below function
initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt);
});

removeElement.addEventListener('click', (e) => {
    removeNote(noteId);
    location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
   }
});