import { getUser } from '../scripts/services/user.js'
import { getRepositories } from '../scripts/services/repositories.js'

import { user } from '../scripts/objects/user.js'
import { screen } from '../scripts/objects/screen.js'
import { getEvents } from "./services/events.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return 
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
         return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){ 
       screen.renderNotFound() 
       return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
    

    // getUser(userName).then(userData => {
    //     let userInfo = `<div class="info">
    //                         <img src="${userData.avatar_url}" alt="Foto do perfil do usuário" /> 
    //                         <div class="data">
    //                         <h1>${userData.name ?? 'Não possui nome cadastrado 😭' }</h1>
    //                         <p>${userData.bio ?? 'Não possui bio cadastrada 😭'}</p>
    //                         </div>
    //                     </div>`

    //     document.querySelector('.profile-data').innerHTML = userInfo

    //     getUserRepositories(userName)
    // })
}

getEvents()

// function getUserRepositories(userName) {
//     getRepositories(userName).then(reposData => {
//         let repositoriesItens = ""
//         reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
//         })

//         document.querySelector('.profile-data').innerHTML += `<div> class="repositories section">
//                                                                 <h2>Repositórios</h2>
//                                                                 <ul>${repositoriesItens}</ul>
//                                                               </div>`                                                            
//     })

// }
