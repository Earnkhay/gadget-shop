import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css'
import { initializeApp } from "firebase/app";
import axios from 'axios'
import VueAxios from 'vue-axios'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB9yKn-uZ_YnjswNN6uT97M7zRnKihPe8",
  authDomain: "gadget-shop-65d7a.firebaseapp.com",
  projectId: "gadget-shop-65d7a",
  storageBucket: "gadget-shop-65d7a.appspot.com",
  messagingSenderId: "632141002666",
  appId: "1:632141002666:web:92ef37c5f9f13b1a1f1dd3"
};

const app = createApp(App);

// Initialize Firebase
initializeApp(firebaseConfig);
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

createApp(App).use(store).use(router).mount('#app')
