class Option extends HTMLElement {
    constructor(optionData, onClick, userId) {
        super()

        this.onClick = onClick
        this.userId = userId
        this.update(optionData)
    }


    update(optionData) {
        const voted = optionData.voters?.includes(this.userId) ?? false

        if (voted) {
            this.className = 'voted'
        } else {
            this.className = ''
        }

        this.innerHTML = ''
        const button = document.createElement('button')
        button.onclick = this.onClick

        const flexContainer = document.createElement('div')
        flexContainer.className = 'flex'
        const label = document.createElement('p')
        flexContainer.appendChild(label)
        const trackSpan = document.createElement('span')
        trackSpan.className = 'bold'
        trackSpan.innerText = optionData.trackName
        label.appendChild(trackSpan)
        const artistSpan = document.createElement('span')
        artistSpan.className = 'regular'
        artistSpan.innerText = ` by ${optionData.artistName}`
        label.appendChild(artistSpan)
        
        const votes = document.createElement('p')
        const count = new Set(optionData.voters ?? []).size
        const voteCountSpan = document.createElement('span')
        voteCountSpan.className = 'bold'
        voteCountSpan.innerText = `${count} vote${count === 1 ? '' : 's'}`
        votes.appendChild(voteCountSpan)
        const votedSpan = document.createElement('span')
        votedSpan.className = 'regular'
        votedSpan.innerText = `${voted ? ' | Your vote ✅' : ''}`
        votes.appendChild(votedSpan)
        flexContainer.appendChild(votes)
        button.appendChild(flexContainer)

        this.appendChild(button)
    }
}


customElements.define('option-element', Option)
export { Option }