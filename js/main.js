import '../css/style.css'
import { auth, firestore } from './firebase.js'
import { Login } from './login.js'
import { Poll } from './poll.js'

import clearVotes from './scripts/clearVotes'


const app = document.getElementById('app')
const loginElement = new Login()
let pollElement = null

let loading = document.getElementById('loading')


auth.onAuthStateChanged(async user => {
  function removeLoader() {
    if (loading) {
      loading.remove()
      loading = null
    }
  }

  if (user) {
    const poll = await firestore.collection('polls').doc('QSWkryTrWldCJVd5iGhq').get()
    removeLoader()
    showPoll(poll, user)
  } else {
    removeLoader()
    showLogin()
  }
})


function showPoll(poll, user) {
  loginElement.remove()
  pollElement = new Poll(poll, user)
  app.appendChild(pollElement)
}


function showLogin() {
  if (pollElement) {
    pollElement.remove()
    pollElement = null
  }
  app.appendChild(loginElement)
  loginElement.setup()
}


if (location.hostname === 'localhost') {
  window.clearVotes = clearVotes
}
