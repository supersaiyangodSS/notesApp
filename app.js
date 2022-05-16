var addBtn = document.querySelector('.add-note');
var container = document.querySelector('.container');

addBtn.addEventListener("click", () => {
    addNoteBtn(); //runs function on click
});

const addNoteBtn = (text = "") => {
    var note = document.createElement('div'); // creates element
    note.classList.add('note'); // adds class to the created element
    note.innerHTML = `
    <div class="tool-box">
        <button id="save" class="button">
            <span class="material-symbols-rounded">
            save
            </span></button>
        <button id="delete" class="button">
            <span class="material-symbols-rounded">
            delete
            </span>
    </div>
    <textarea name="textarea">${text}</textarea>`;
    container.appendChild(note); // sets parent container for created element
    note.querySelector('#delete').addEventListener('click', ()=> {
        note.remove(); // deletes added element
        saveNote(); // saves changes after deletion
    });
    
    note.querySelector('#save').addEventListener('click', () => {
        saveNote(); // saves note on click save button
    });

    note.querySelector('textarea').addEventListener("focusout", () => {
        saveNote();
    })
    
    saveNote(); // saves notes by default
};
const saveNote = () => {
    var notes = document.querySelectorAll('.note textarea'); // gets all the textareas inside .note class container
    var data = []; // empty array
    notes.forEach((note) => { 
        data.push(note.value); // pushes every single note to the array 
    });
    if (data.length === 0) { //checks if the default data is empty or note;
        localStorage.removeItem('notes'); // if data array is empty then it deletes the array/data from localstorage
    }
    else {
    localStorage.setItem('notes', JSON.stringify(data)); // else if saves the array/data to the localstorage
    }// converts the array to string and saves it to the localstorage
}

(
    function() {
        var savedNotes = JSON.parse(localStorage.getItem('notes')); // gets the saved notes from the localstorage
        if (savedNotes === null) { // checks if the data from localsotrage if no data available then adds new note
            addNoteBtn();
        }
        else { // else shows saved data on main page
        savedNotes.forEach((savedItem) => {
            addNoteBtn(savedItem); // calls addNote fn to create new note and adds every single array value to the created notes elements
        });
    }
    }
)(); // self calling function