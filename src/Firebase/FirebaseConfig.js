import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCC1M1HFlg90mDY7cCp-P4lwYy9LNAzLms",
    authDomain: "holiday-homes-ef0c8.firebaseapp.com",
    projectId: "holiday-homes-ef0c8",
    storageBucket: "holiday-homes-ef0c8.appspot.com",
    messagingSenderId: "136950087773",
    appId: "1:136950087773:web:c78d2b110a98310e8d8db4",
    measurementId: "G-HQDBWRF8LW"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore();
  export const storage = getStorage();
  
  export default app;