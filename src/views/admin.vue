<template>
    <div class="d-flex" id="app">
            <div class="text-bg-dark adminbar p-3" id="app" ref="jedi">
                <div class="d-flex justify-content-between border-bottom mb-3 py-3">
                    <!-- <h5>Gadget shop</h5> -->
                    <router-link to="/" class="text-decoration-none link-light fs-5">Gadget Shop</router-link>
                    <i class="fa-solid fa-x menubar" @click="toggleSideBar"></i> 
                </div>
                <div class="d-flex mb-3">
                    <div class="me-3">
                        <img :src="photoURL" alt="avatar" v-if="photoURL"  width="55" height="55" class="rounded-circle bg-transparent">
                        <img src="../assets/undraw_Profile_pic_re_iwgo.png" v-else alt="avatar" width="55" height="55" class="rounded-circle bg-transparent">
                    </div>
                    <div class="text-white">
                        <h4 class="fw-bold text-wrap text-break">{{name}}</h4>   
                        <p class="text-wrap text-break" style="font-size: 12px;">{{email}}</p>
                    </div>
                </div>
                <hr>
                <h6>Menu</h6>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item mb-1">
                        <router-link to="/admin/overview" active-class="bg-primary" class="nav-link link-light" aria-current="page">
                            <i class="fa-solid fa-chart-line p-1"></i>
                            Overview
                        </router-link>
                    </li>
                    <li class="nav-item mb-1">
                        <router-link to="/admin/products" active-class="bg-primary" class="nav-link text-light">
                            <i class="fa-solid fa-shop p-1"></i> 
                                Products
                        </router-link>
                    </li>
                    <li class="nav-item mb-1">
                        <router-link to="/admin/orders" active-class="bg-primary" class="nav-link text-light">
                            <i class="fa-solid fa-cart-shopping p-1"></i>
                            Orders
                        </router-link>
                    </li>
                    <li class="nav-item mb-1">
                        <router-link to="/admin/profile" active-class="bg-primary" class="nav-link text-light">
                            <i class="fa-solid fa-user p-1"></i>
                                Profile
                        </router-link>
                    </li>
                    <li class="nav-item mb-1">
                        <a href="#" class="nav-link text-light" @click="logout">
                            <i class="fa-solid fa-power-off p-1"></i>
                            Logout
                        </a>
                    </li>
                </ul>
                <hr>
                <!-- <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                        <strong>Administrator</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> -->
            </div>
        <div class="content">
            <div class="fs-5 py-3 px-4 menubar bg-dark text-light d-flex justify-content-between align-items-center" ref="menubar">
                <div>
                    <router-link to="/" class="text-decoration-none link-light fs-5">Gadget Shop</router-link>
                    <!-- <h5>Gadget Shop</h5> -->
                </div>
                <button class="bg-secondary border-secondary shadow menubar" @click="toggleSideBar">
                    <i class="fa-solid fa-bars text-light"></i>   
                </button>
            </div>
              <div class="dashboard-content">
                <router-view/>
              </div>
        </div>
    </div>
  
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import sideBar from '@/components/UI/sideBar.vue'
import { db } from "@/firebase"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";


@Options({
  components: {
    sideBar
  },
})
export default class admin extends Vue {
    auth = getAuth();
    user = this.auth.currentUser
    id = this.user.uid
    name = ""
    email = ""
    photoURL = ""

    created(){
     onAuthStateChanged(this.auth, (user) => {
        if (user) {
            this.email = user.email || '';
            if(user.displayName != null && user.photoURL != null){
                this.name = user.displayName,
                this.photoURL = user.photoURL
            }else{
                onSnapshot(doc(db, `profiles/${user.uid}`, ), (doc) => {
                    this.name = doc.data().name
                    this.photoURL = doc.data().photoURL
                })
            }
        }
      });
      this.$router.push('/admin/overview')
    }

    // $refs!: {
    //     jedi: HTMLDivElement;
    //     menubar: HTMLDivElement;
    // };
    
    toggleSideBar(){
        if (this.$refs.jedi.style.display == "none") {
            this.$refs.jedi.style.display = "block"; 
            this.$refs.jedi.style.position = "fixed"; 
            this.$refs.menubar.style.display = "none"; 
        } else {
            this.$refs.jedi.style.display = "none";
            this.$refs.menubar.style.display = "block"; 
            this.$refs.jedi.style.position = "static";
        }
    }
    logout(){
        const auth = getAuth();
        signOut(auth).then(() => {
            this.$router.replace('/')
        }).catch(() => {
            // An error happened.
        });
    }
}
</script>

<style scoped>
    #app{
        /* min-height: 100vh; */
        overflow: hidden;
    }

    .content{
        min-height: 100vh;
        width: 100%;
        margin-left: 260px;
    }

    .adminbar{
        min-height: 100vh;
        min-width: 260px;
        max-width: 260px;
        /* transition: all 2s; */
        z-index: 1;
        position: fixed;
    }

    li:hover{
        background-color: #0275d8 !important;
        border-radius: 5px;
    }

    .menubar{
        display: none;
    }

    @media screen and (max-width: 1000px){
        .adminbar{
            display: none;
        }

        .content{
            margin-left: 0px;
        }
        .menubar{
            display: block;
        }
    }
</style>