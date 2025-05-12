document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note');
    const colorOptions = document.querySelectorAll('.color-option');

    let selectedColor = '#ffda79';
    let notes = JSON.parse(localStorage.getItem('premium-notes')) || [];
    let draggedNote = null;
    let dragOffsetX, dragOffsetY;
    let positions = JSON.parse(localStorage.getItem('note-positions')) || {};
    
    init();
    
    function init() {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedColor = option.dataset.color;
            });
        });
        
        colorOptions[0].classList.add('selected');
        
        addNoteBtn.addEventListener('click', createNewNote);
        
        renderNotes();
        
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', onDragEnd);
    }
    
    function createNewNote() {
        const note = {
            id: Date.now(),
            content: '',
            color: selectedColor,
            createdAt: new Date().toLocaleString()
        };
        
        notes.push(note);
        saveNotes();
        renderNote(note);
        
        setTimeout(() => {
            const newNoteElement = document.getElementById(`note-${note.id}`);
            if (newNoteElement) {
                const contentElement = newNoteElement.querySelector('.note-content');
                contentElement.focus();
            }
        }, 100);
    }
    
    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => renderNote(note));
    }
    
    function renderNote(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.id = `note-${note.id}`;
        noteElement.style.backgroundColor = note.color;
        
        if (positions[note.id]) {
            noteElement.style.position = 'absolute';
            noteElement.style.left = positions[note.id].x + 'px';
            noteElement.style.top = positions[note.id].y + 'px';
        }
        
        noteElement.innerHTML = `
            <div class="note-actions">
                <button class="note-btn delete-btn" data-id="${note.id}">×</button>
            </div>
            <textarea class="note-content" data-id="${note.id}" rows="5" placeholder="Write your note here...">${note.content}</textarea>
            <div class="timestamp">${note.createdAt}</div>
        `;
        
        notesContainer.appendChild(noteElement);
        
        const deleteBtn = noteElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteNote(note.id));
        
        const contentElement = noteElement.querySelector('.note-content');
        contentElement.addEventListener('input', (e) => {
            updateNoteContent(note.id, e.target.value);
        });
        
        noteElement.addEventListener('mousedown', (e) => onDragStart(e, note.id));
        noteElement.addEventListener('touchstart', (e) => onDragStart(e, note.id));
    }
    
    function onDragStart(e, noteId) {
        if (e.target.classList.contains('note-content') || 
            e.target.classList.contains('note-btn')) {
            return;
        }
        
        e.preventDefault();
        
        const noteElement = document.getElementById(`note-${noteId}`);
        draggedNote = noteElement;
        
        const rect = noteElement.getBoundingClientRect();
        
        if (e.type === 'mousedown') {
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
        } else {
            dragOffsetX = e.touches[0].clientX - rect.left;
            dragOffsetY = e.touches[0].clientY - rect.top;
        }
        
        if (noteElement.style.position !== 'absolute') {
            noteElement.style.position = 'absolute';
            noteElement.style.left = rect.left + 'px';
            noteElement.style.top = rect.top + 'px';
            noteElement.style.width = rect.width + 'px';
        }
        
        noteElement.classList.add('dragging');
    }
    
    function onDrag(e) {
        if (!draggedNote) return;
        
        e.preventDefault();
        
        let clientX, clientY;
        
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        const containerRect = notesContainer.getBoundingClientRect();
        const noteRect = draggedNote.getBoundingClientRect();
        
        let newLeft = clientX - dragOffsetX;
        let newTop = clientY - dragOffsetY;
        
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - noteRect.width));
        newTop = Math.max(0, newTop);
        
        draggedNote.style.left = newLeft + 'px';
        draggedNote.style.top = newTop + 'px';
    }
    
    function onDragEnd() {
        if (!draggedNote) return;
        
        const noteId = draggedNote.id.split('-')[1];
        const rect = draggedNote.getBoundingClientRect();
        const containerRect = notesContainer.getBoundingClientRect();
        
        positions[noteId] = {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top
        };
        
        localStorage.setItem('note-positions', JSON.stringify(positions));
        
        draggedNote.classList.remove('dragging');
        draggedNote = null;
    }
    
    function deleteNote(id) {
        const noteElement = document.getElementById(`note-${id}`);
        noteElement.style.animation = 'fadeOut 0.3s ease forwards';
        
        setTimeout(() => {
            notes = notes.filter(note => note.id !== id);
            delete positions[id];
            saveNotes();
            localStorage.setItem('note-positions', JSON.stringify(positions));
            renderNotes();
        }, 300);
    }
    
    function updateNoteContent(id, content) {
        const note = notes.find(note => note.id === id);
        if (note) {
            note.content = content;
            saveNotes();
        }
    }
    
    function saveNotes() {
        localStorage.setItem('premium-notes', JSON.stringify(notes));
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
});