import { firestore } from '../firebase.js'


async function clearVotes() {
	const optionsCollection = firestore.collection('polls').doc('QSWkryTrWldCJVd5iGhq').collection('options')
	const snapshot = await optionsCollection.get()

	snapshot.docs.forEach(doc => {
		optionsCollection.doc(doc.id).update({
			voters: []
		})
	})
}


export default clearVotes
