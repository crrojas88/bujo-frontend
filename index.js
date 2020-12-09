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

// journalLogin logs user in from the modal.
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
// listEntries sets each created entry on a list item for each user.
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
        div.id = `list-div-${entry.id}`
        li.id = `list-item-${entry.id}`
        li.innerText = entry.task
        
        const save = document.createElement('button')
        save.innerHTML = "<i class='material-icons md-18'>save</i>"
        save.classList.add('btn' , 'btn-light')
        save.id = entry.id
        save.addEventListener("click", saveEntries)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "<i class='material-icons md-18'>delete</i>"
        deleteBtn.classList.add('btn' , 'btn-light')
        deleteBtn.id = entry.id
        deleteBtn.addEventListener("click", deleteEntries)

    
        div.append(li, save, deleteBtn)   
        li.setAttribute('class', 'list-item')
        li.setAttribute('contentEditable', 'true')
        ul.appendChild(div)
    })
}
// setDate prints the current day for each user's journal.
function setDate() {
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const year = currentDate.getFullYear()
    const fullDate = `${month}/${day}/${year}`

    const weekDiv = document.getElementById('bujoweek')
    const weekH2 = document.querySelector('h2')
    weekH2.innerText = `Week of ${fullDate}`
}

// createEntry creates a list item for each new task created.
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
      .then(newObj => {
    
        
        const ul = document.querySelector('ul')
        const listDiv = document.createElement("div")
        listDiv.id = `list-div-${newObj.id}`
        const li = document.createElement("li")
        li.setAttribute('class', 'list-item')
        li.setAttribute('contentEditable', 'true')
        li.id = `list-item-${newObj.id}`
        li.innerText = newObj.task
        
        const save = document.createElement('button')
        save.innerHTML = "<i class='material-icons md-18'>save</i>"
        save.classList.add('btn' , 'btn-light')
        save.id = newObj.id
        save.addEventListener("click", saveEntries)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "<i class='material-icons md-18'>delete</i>"
        deleteBtn.classList.add('btn' , 'btn-light')
        deleteBtn.id = newObj.id
        deleteBtn.addEventListener("click", deleteEntries)

    
        listDiv.append(li, save, deleteBtn)   
        ul.appendChild(listDiv)

        
      })

}

// saveEntries saves edited entries for each user.
function saveEntries(e) {
    console.log(e.target.outerHTML)
    console.dir(e.target)
    // let target = String(e.target)
    let entryId 
    if (e.target.outerHTML == '<i class="material-icons md-18">save</i>') {
      
      entryId = e.target.parentElement.id
    } else {
      entryId = e.target.id
    }
    const entryLi = document.getElementById(`list-item-${entryId}`)
    const entryText = e.target.parentNode.previousSibling.innerText

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
      .then(entryEdit => {
        const alertSuccess = document.querySelector('.alert-task')
        alertSuccess.classList.remove('alert-task')
      })

}


// deleteEntries deletes each entry from db and DOM for each user.
function deleteEntries(e) {
    // console.log(e.target.parentElement.id)
    // const deleteId = e.target.parentElement.id
    let deleteId 
    if (e.target.outerHTML == '<i class="material-icons md-18">delete</i>') {
      
      deleteId = e.target.parentElement.id
    } else {
      deleteId = e.target.id
    }
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
          // console.log(e.target.parentElement.parentElement)
          const entryUl = document.querySelector('ul')
          const div = document.getElementById(`list-div-${deleteId}`)
          entryUl.removeChild(div)
        // e.target.parentElement.parentElement.remove()
    })
}

// journalLogout logs user out of journal. 
function journalLogout() {
    
const hamMenu = document.querySelector('.dropdown-menu')
const logoutBtn = document.querySelector('.dropdown-item')

logoutBtn.addEventListener("click", () => {

    const divCol = document.querySelector('.col-8')
    const divCont = document.querySelector('.col-9')
    const headerRow = document.querySelector('.row')
    headerRow.classList.add('hidden')
    const contentDiv = document.querySelector('#content')
    contentDiv.classList.add('hidden')
    divCol.innerHTML = ""
    divCont.innerHTML = ""
    $(document).ready(function(){
		$("#modalLoginForm").modal('show');
       });

})    

}
journalLogout()
setDate()