<template>
    <div class="d-flex">
            <aside class="text-bg-dark adminbar p-3" id="app" ref="jedi">
                <div class="d-flex justify-content-between border-bottom mb-3 py-3">
                    <h5>Gadget Shop</h5>
                    <i class="fa-solid fa-x" @click="toggleSideBar"></i> 
                </div>
                <div class="d-flex mb-3 text-white">
                    <div class="me-3">
                        <img src="https://github.com/mdo.png" alt="" width="55" height="55" class="rounded-circle">
                    </div>
                    <div class="fw-bold">
                        <h6>Nkechi Julia</h6>   
                        <p>Admin</p>
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
                        <a href="#" class="nav-link text-light">
                            <i class="fa-solid fa-cart-shopping p-1"></i>
                            Orders
                        </a>
                    </li>
                    <li class="nav-item mb-1">
                        <a href="#" class="nav-link text-light">
                            <i class="fa-solid fa-power-off p-1"></i>
                            Logout
                        </a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
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
                </div>
            </aside>
        <div class="content">
            <div class="fs-5 p-2 menubar" ref="menubar">
                <button class="bg-dark border-dark shadow">
                    <i class="fa-solid fa-bars text-light" @click="toggleSideBar"></i>   
                </button>
            </div>
              <div class="dashboard-content p-2">
                <router-view/>
              </div>
        </div>
    </div>
  
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import sideBar from '@/components/UI/sideBar.vue'

@Options({
  components: {
    sideBar
  },
})
export default class admin extends Vue {
    toggleSideBar(){
        if (this.$refs.jedi.style.display == "none") {
           this.$refs.jedi.style.display = "block"; 
           this.$refs.menubar.style.display = "none"; 
        } else {
            this.$refs.jedi.style.display = "none";
            this.$refs.menubar.style.display = "block"; 
        }
    }
}
</script>

<style scoped>
    #app{
        min-height: 100vh;
    }

    /* .content{
        min-height: 100vh;
        width: 100%;
    } */

    .adminbar{
        min-height: 100vh;
        min-width: 250px;
        max-width: 250px;
        transition: all 0.3s;
    }

    li:hover{
        background-color: #0275d8 !important;
        border-radius: 5px;
    }

    i{
        cursor: pointer;
    }

    .menubar{
        display: none;
    }

    @media screen and (max-width: 1000px){
        .adminbar{
            display: none;
        }
        .menubar{
            display: block;
        }
    }
</style>