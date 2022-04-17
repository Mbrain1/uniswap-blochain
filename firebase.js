// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,
        collection,getDocs,
        getDoc,addDoc, 
        deleteDoc,updateDoc, 
        doc, onSnapshot, 
        query, where,
        orderBy,serverTimestamp} from  "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeovF57Tay4blHCWBqmxH_XIxiViU0fXg",
  authDomain: "uniswap-d3ecb.firebaseapp.com",
  projectId: "uniswap-d3ecb",
  storageBucket: "uniswap-d3ecb.appspot.com",
  messagingSenderId: "707219412112",
  appId: "1:707219412112:web:1560f9c8e26e1ab0b8b415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

const userTable = collection(db, 'users');

const listedTokensTable = collection(db, 'listed_tokens');

const transactionTable = collection(db, 'transactions');

export { userTable, transactionTable, listedTokensTable };

