import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import {
	getFirestore,
	addDoc,
	collection,
	query,
	getDocs,
} from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
	appId: process.env.REACT_APP_APP_ID,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
}

export const app = initializeApp(firebaseConfig)
export const dbService = getFirestore(app)
export const dbAddDoc = addDoc
export const dbCollection = collection
export const dbGetDocs = getDocs
export const dbQuery = query
export const storageService = getStorage()
