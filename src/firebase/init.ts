import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseAPIKey = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY + "").trim();
const recaptchaKey = (
  process.env.NEXT_PUBLIC_RECAPTCHA_V3_APPCHECK_KEY + ""
).trim();

const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: "organize-4d02e.firebaseapp.com",
  projectId: "organize-4d02e",
  storageBucket: "organize-4d02e.appspot.com",
  messagingSenderId: "130380325498",
  appId: "1:130380325498:web:73a2bc6875c8112a97d1c3",
  measurementId: "G-348YVLQSGJ",
  databaseURL:
    "https://organize-4d02e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

//disable on production
// globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

function appCheck() {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaKey),

    isTokenAutoRefreshEnabled: true,
  });
}

export { auth, database, appCheck };
