import {initializeApp} from 'firebase/app'
import {getAuth,  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDLoStI-IaectRDQMAf6D-oUzFjQAz8ykI",
    authDomain: "crown-clothing-c180b.firebaseapp.com",
    projectId: "crown-clothing-c180b",
    storageBucket: "crown-clothing-c180b.appspot.com",
    messagingSenderId: "686155011546",
    appId: "1:686155011546:web:b840c6679788d38c6e5ce3"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {  }) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch(error) {
            console.log('error creating user', error.message);
        }
    }
    
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    createUserWithEmailAndPassword(auth, email, password)
}