import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyC9ZCm6AnhNeF2yv99bbS0Gmn55KlhUc2Q",
  authDomain: "vue3firebase-7a752.firebaseapp.com",
  projectId: "vue3firebase-7a752",
  storageBucket: "vue3firebase-7a752.appspot.com",
  messagingSenderId: "574317698465",
  appId: "1:574317698465:web:1b1b726bb768981363ffe0"
};

initializeApp(firebaseConfig);

app
  .use(router)
  .use(store)
  .mount('#app');
