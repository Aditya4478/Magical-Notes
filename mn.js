// keep calling function shownotes to always disappear notes saved in local storage
showNotes();

//adding notes
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
    //showing alert if notes is empty & updating falsy statement inside the object.
    if(addTxt.value==''){
        alert('😠😒😤Do not press ADD button without writting any note. !!')
        addTxt.value = 'Empty Note 😥';
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
});

// for showing notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    let html = "";
    if (notes == null) {
        // creating first time
        notesObj = [];
    }
    else {
        // a ranom creation of text inside object
        notesObj = JSON.parse(notes);
    }
    // updating in table
    notesObj.forEach(function (element, index) {
        html += `
            <tr>
              <td align="center" style="font-size: 120%"" scope="row"><b>${index + 1}</b></td>
              <td class="noteCard" style="font-family: Brush Script MT; font-size: 140%; letter-spacing: 1px;">
              ${element}
              </td>
              <td align="center">
                <button
                  class="btn btn-sm btn-primary"
                  style="background-color: rgb(204, 35, 35)"
                  id="${index}" onclick="deleteNote(this.id)"
                >
                  Delete
                </button>
              </td>
            </tr>`;
    });
    // if there are no notes available in object, then show message inside table
    let notesElm = document.getElementById('notes1');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<tr><td colspan="3"><h6 style="text-align: center;">You have not added a single note &#128551;&#128556;&#128577;. Add them QUICKLY !!!</h6></td></tr>`;
    }
}

//Deleting node from local storage
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // deleting a part of whole object.
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//searching function. First text input is converted to uppercase. then the content of table is converted to uppercase and compared.
function searchFun() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        // searching in 2nd column of table (total cloumn : 0,1,2 => 1st column)
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            //displaying matched values
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}

//defined a function for playing audio
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}

// exporting content of object created.
var data = [];
function save_func() {
    //activating animation to disapear the table.
    document.getElementById('myTable').style.cssText = `
          animation-name: myAnimation;
          animation-duration: 2000ms;
          animation-fill-mode: forwards;
    `
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    //creating a message to be print along with the content fetched from local storage
    notesObj.forEach(function (element, index) {
        data.push("Content of Note " + (index+1) +" is -->> "+ element);
    });
    var data_string = JSON.stringify(data);
    var file = new Blob([data_string], { type: "text" });
    var anchor = document.createElement("a");
    //file format
    anchor.href = URL.createObjectURL(file);
    // file name
    anchor.download = "Magical-Notes.txt";
    anchor.click();
    //calling sound function
    play();
    //clearing stored notes.
    localStorage.clear();

    alert("Notes Saved Successfully")
}
