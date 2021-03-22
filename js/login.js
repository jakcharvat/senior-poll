import '../css/login.css'
import { auth, setupLoginUI } from './firebase.js'


class Login extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
        <h1>Login to Vote</h1>
        <p>Don't worry, voting is anonymous, the reason for the login is so you can easily see and edit your answer if you want to :)</p>
        <div id="firebase-auth-container"></div>
        <br /><br />
        <p>If you feel like any part of this page doesn't work, please complain <a href="https://senior-poll.web.app/complain/">here</a> 🙂</p>
        `
    }


    setup() {
        setupLoginUI()
    }
}

customElements.define('login-element', Login)


export { Login }