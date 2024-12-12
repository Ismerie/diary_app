import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKE8Kvv9azUKg12if78n-nhBI2-FW-kvI",
  authDomain: "diary-ff7c2.firebaseapp.com",
  projectId: "diary-ff7c2",
  storageBucket: "diary-ff7c2.firebasestorage.app",
  messagingSenderId: "185254127656",
  appId: "1:185254127656:web:9dcadfd8166fbe5fe22d1d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/*export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});*/

export const google_client = {
    web: "185254127656-bii9auuotum2oum3qcpolpeotj3i93om.apps.googleusercontent.com",
    android: "185254127656-1dnrausuv4j27gjo34hpnu65d7k0j9e4.apps.googleusercontent.com"
}
