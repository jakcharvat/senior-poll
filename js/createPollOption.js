import { firestore } from './firebase.js'
import { v4 as uuidv4 } from 'uuid'


class CreatePollOption extends HTMLElement {
    constructor(poll) {
        super()

        this.poll = poll

        const button = document.createElement('button')
        button.onclick = () => this.startInput()
        button.innerText = 'Something different...'
        this.appendChild(button)
    }


    startInput() {
        const rowHalf = document.createElement('div')
        rowHalf.className = 'row-half'
        this.innerHTML = ''
        this.appendChild(rowHalf)


        const trackHalf = document.createElement('div')
        trackHalf.className = 'half'
        rowHalf.appendChild(trackHalf)

        const trackLabel = document.createElement('label')
        trackLabel.htmlFor = 'trackName'
        trackLabel.innerText = 'Track: '
        trackHalf.appendChild(trackLabel)

        const trackInput = document.createElement('input')
        trackInput.type = 'text'
        trackInput.name = 'trackName'
        trackInput.oninput = () => enableSubmitButton()
        trackHalf.appendChild(trackInput)


        const artistHalf = document.createElement('div')
        artistHalf.className = 'half'
        rowHalf.appendChild(artistHalf)

        const artistLabel = document.createElement('label')
        artistLabel.htmlFor = 'artistName'
        artistLabel.innerText = 'By: '
        artistHalf.appendChild(artistLabel)

        const artistInput = document.createElement('input')
        artistInput.type = 'text'
        artistInput.name = 'artistName'
        artistInput.oninput = () => enableSubmitButton()
        artistHalf.appendChild(artistInput)


        const submitButton = document.createElement('button')
        submitButton.onclick = () => this.onSubmit(trackInput.value, artistInput.value)
        submitButton.id = 'submitButton'
        submitButton.innerText = 'Submit'
        submitButton.disabled = true
        rowHalf.appendChild(submitButton)


        function enableSubmitButton() {
            submitButton.disabled = (!artistInput.value) || (!trackInput.value)
        }
    }


    onSubmit(track, artist) {
        const button = document.createElement('button')
        button.onclick = () => this.startInput()
        button.id = 'startInputButton'
        button.innerText = 'Something different...'
        this.innerHTML = ''
        this.appendChild(button)

        firestore.collection('polls').doc('QSWkryTrWldCJVd5iGhq').collection('options').add({
            trackName: track,
            artistName: artist
        })
    }


    updatePoll(poll) {
        this.poll = poll
    }
}


customElements.define('create-option', CreatePollOption)
export { CreatePollOption }