/*
리액트와 firebase 연동
로그인 / 회원가입 / Firestore(DB) 등을 사용할 수 있게 도와줌
*/

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFGWFourWgRBjVDJQgLaTqwgmBIRihU9c",
    authDomain: "teamo-3aca0.firebaseapp.com",
    projectId: "teamo-3aca0",
    storageBucket: "teamo-3aca0.firebasestorage.app",
    messagingSenderId: "752883714658",
    appId: "1:752883714658:web:124b9b0fbf304be1c59f3b",
    measurementId: "G-YCLQFBY31E",
};

// Firebase 연결
const app = initializeApp(firebaseConfig);

// Firebase 기능 사용
export const auth = getAuth(app);          // 로그인/회원가입
export const db = getFirestore(app);       // Firestore DB