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
    json.entries.forEach((entry) => {
        console.log(entry)
        console.log(entry.task)
        const listDiv = document.querySelector('.col-11')
        const ul = document.createElement("ul")
        const li = document.createElement("li")
        li.innerText = entry.task
        ul.appendChild(li)
        listDiv.append(ul)
    })
}

function fetchEntries(){

    fetch(entriesURL)
    .then(response => response.json())
    .then(entries => {
        entries.forEach(populateEntries)
    })

}


function populateEntries() {

}






fetchEntries()
// fetchUsers()