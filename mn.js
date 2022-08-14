//JAVASCRIPT for logics
console.log('Welcome to Ex:2 - Magic Notes')
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title ct">Note ${index + 1}</h5>
                    <p class="card-text cd">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Remove
                        &#128465;</button>
                </div>
            </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `You have not added a single note &#128551;&#128556;&#128577;. Add them QUICKLY !!!`;
    }
}

function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

var data = [];
function save_func() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function (element, index) {
        data.push("Content of Note " + index +" is -->> "+ element);
    });
    var data_string = JSON.stringify(data);
    var file = new Blob([data_string], { type: "text" });
    var anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "Magical-Notes.txt";
    anchor.click();
    alert("Notes Saved Succesfully")
}