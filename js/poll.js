import { LogoutButton } from './logoutButton.js'
import '../css/poll.css'
import { firestore, FieldValue } from './firebase.js'
import { CreatePollOption } from './createPollOption.js'
import { Option } from './option.js'

class Poll extends HTMLElement {
    constructor(pollDoc, user) {
        super()
        this.appendChild(new LogoutButton())

        this.user = user
        this.pollId = pollDoc.id
        this.options = { }
        
        const poll = pollDoc.data()
        const prompt = poll.prompt
        const options = poll.options

        const promptEl = document.createElement('h4')
        promptEl.innerText = prompt
        this.appendChild(promptEl)

        const optionsContainer = document.createElement('div')
        optionsContainer.id = 'optionsContainer'
        this.appendChild(optionsContainer)

        const currentOptionsContainer = document.createElement('div')
        this.currentOptionsContainer = currentOptionsContainer
        optionsContainer.appendChild(currentOptionsContainer)

        const loader = document.createElement('div')
        loader.className = 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'
        this.loader = loader
        currentOptionsContainer.appendChild(loader)

        const hr = document.createElement('hr')
        optionsContainer.appendChild(hr)

        const newOptionEl = new CreatePollOption(poll)
        this.newOptionEl = newOptionEl
        optionsContainer.appendChild(newOptionEl)

        this.initPollChangeListener()
    }


    async selectedOption(optionId, data) {
        const collection = firestore.collection('polls').doc(this.pollId).collection('options')
        
        if ((await collection.doc(optionId).get()).data().voters?.includes(this.user.uid)) {
            collection.doc(optionId).update({
                voters: FieldValue.arrayRemove(this.user.uid)
            })

            return
        }


        collection.doc(optionId).update({
            voters: FieldValue.arrayUnion(this.user.uid)
        })


        // const querySnapshot = await collection.where('voters', 'array-contains', this.user.uid).get()
        // querySnapshot.docs.forEach(doc => {
        //     if (doc.id !== optionId) {
        //         collection.doc(doc.id).update({
        //             voters: FieldValue.arrayRemove(this.user.uid)
        //         })
        //     }
        // })
    }


    initPollChangeListener() {
        firestore.collection('polls').doc('QSWkryTrWldCJVd5iGhq').collection('options').onSnapshot(snapshot => {
            if (this.loader) {
                this.loader.remove()
                this.loader = null
            }

            snapshot.docChanges().forEach(change => {
                const doc = change.doc
                if (change.type === 'added') {
                    const data = doc.data()
                    const option = new Option(data, () => this.selectedOption(doc.id, data), this.user.uid)
                    this.options[doc.id] = option
                    this.currentOptionsContainer.appendChild(option)
                } else if (change.type === 'modified') {
                    this.options[doc.id].update(doc.data())
                } else if (change.type === 'removed') {
                    this.options[doc.id].remove()
                    delete this.options[doc.id]
                }
            })
        })
    }
}



export { Poll }

customElements.define('poll-element', Poll)