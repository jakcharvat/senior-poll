import { auth } from './firebase.js'


class LogoutButton extends HTMLElement {
    constructor() {
        super()

        const button = document.createElement('button')
        button.onclick = () => {
            auth.signOut()
        }
        button.innerText = 'Logout'
        this.appendChild(button)
    }
}

customElements.define('logout-button', LogoutButton)
export { LogoutButton }