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
        label.className = 'label'
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
        const voteCount = new Set(optionData.voters ?? []).size
        this.voteCount = voteCount
        const voteCountSpan = document.createElement('span')
        voteCountSpan.className = 'bold'
        voteCountSpan.innerText = `${voteCount} vote${voteCount === 1 ? '' : 's'}`
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
