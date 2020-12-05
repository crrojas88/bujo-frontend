const userURL = 'http://localhost:3000/users'
const entriesURL = 'http://localhost:3000/entries'
const loginURL = 'http://localhost:3000/login'

const modalDiv = document.querySelector('.modal')
const loginDiv = document.querySelector('.modal-footer')
const loginBtn = document.querySelector('.btn')
loginBtn.addEventListener("click", (e) => {
    const name = e.target.parentElement.parentElement.children[1].children[0].children[2].value
    journalLogin(name)
    
})

function journalLogin(name) {
    // Jquery for the modal from bootstrap
    $(document).ready(function(){
		$("#modalLoginForm").modal('hide');
       });

       const hiddenClass = document.getElementsByClassName('hidden')
       hiddenClass[0].classList.remove('hidden')
       hiddenClass[0].classList.remove('hidden')
       
       const headerDiv = document.querySelector('.col-8')
       const userHeader = document.createElement('h1')
       userHeader.innerText = `${name}'s Bullet Journal`
       headerDiv.appendChild(userHeader)

       configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
      };

    fetch(loginURL, configObject)
    .then(response => response.json())
    .then(json => {
        listEntries(json)
    })
}

function listEntries(json) {
   
    const listDiv = document.querySelector('.col-9')
        const ul = document.createElement("ul")
        listDiv.append(ul)

        const taskForm = document.getElementById('new-task')
        taskForm.addEventListener('submit',(e) =>{
            
            createEntry(e, json)
            taskForm.reset()

        })

    json.entries.forEach((entry) => {
        // console.log(entry)
        const li = document.createElement("li")
        const div = document.createElement("div")
        li.id = `list-item-${entry.id}`
        li.innerText = entry.task
        
        const save = document.createElement('button')
        save.innerText = "Save"
        save.id = entry.id
        save.addEventListener("click", saveEntries)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = "Delete"
        deleteBtn.id = entry.id
        deleteBtn.addEventListener("click", deleteEntries)

        // div.appendChild(li)
        div.append(li, save, deleteBtn)   
        li.setAttribute('class', 'list-item')
        li.setAttribute('contentEditable', 'true')
        ul.appendChild(div)
    })
}



function createEntry(e, json) {
    e.preventDefault()
    // console.log(json)
    const newEntry = e.target[0].value

    configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            task: newEntry,
            user: json.id
        })
      };

      fetch(entriesURL, configObject)
      .then(response => response.json())
    //   created data persists to db, now change DOM
      .then(console.log)

}



function saveEntries(e) {
    // console.log(e)

    const entryId = e.target.id
    const entryLi = document.getElementById(`list-item-${entryId}`)
    const entryText = entryLi.innerText
    // console.log(entryText)
    

    configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            task: entryText
        })
      };

      fetch(`${entriesURL}/${entryId}`, configObject)
      .then(response => response.json())
    //   .then(console.log)

}

function deleteEntries(e) {
    console.log(e)
    const deleteId = e.target.id
    // const entryLi = document.getElementById(`list-item-${deleteId}`)

    configObject = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };

      fetch(`${entriesURL}/${deleteId}`, configObject)
      .then(response => response.json())
      .then(data => {
          
        e.target.parentElement.remove()
    })
}

const hamMenu = document.querySelector('.dropdown-menu')
const logoutBtn = document.querySelector('.dropdown-item')
const divCol = document.querySelector('.col-8')
const divCont = document.querySelector('.col-9')
logoutBtn.addEventListener("click", () => {
    const headerRow = document.querySelector('.row')
    headerRow.classList.add('hidden')
    const contentDiv = document.querySelector('#content')
    contentDiv.classList.add('hidden')
    divCol.innerHTML = ""
    divCont.innerHTML = ""
    journalLogout()
})

function journalLogout() {

     // Jquery for the modal from bootstrap
     $(document).ready(function(){
		$("#modalLoginForm").modal('show');
       });
       
}

