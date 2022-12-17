<template>
<div class="d-flex" id="app">

    <!-- <div class="d-flex">
        <div class="sidebar adminbar" id="side_nav" ref="jedi">
            <div class="p-4 text-light">
               <h1> Admin</h1>
            </div>
        
            <ul class="list-unstyled px-2">
                <li class="active"><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-solid fa-clipboard-list"></i> To Do</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-regular fa-calendar-days"></i> Calender</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-solid fa-circle-exclamation"></i> Report</a></li>
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-regular fa-user"></i> User Profile</a></li>
            </ul>
            <ul class="list-unstyled px-2">
                <li class=""><a href="#" class="text-decoration-none px-3 py-2 d-block text-white"><i class="fa-solid fa-gear"></i> Settings</a></li>
            </ul>
        </div>
        <div class="content">
            <div class="fs-5 p-2 menubar">
                <i class="fa-solid fa-bars" @click="toggleSideBar"></i>  
            </div>
              <div class="dashboard-content p-2">
                
              </div>
        </div>
    </div> -->

    <aside class="text-bg-dark adminbar p-4" id="app" ref="jedi">
        <div class="d-flex justify-content-between border-bottom mb-3 py-3">
            <h5>Gadget Shop</h5>
           <i class="fa-solid fa-x" @click="toggleSideBar"></i> 
        </div>
        <div class="d-flex mb-3 text-white">
            <div class="me-3">
              <img src="https://github.com/mdo.png" alt="" width="55" height="55" class="rounded-circle">
            </div>
            <div>
                <h6>Nkechi Julia</h6>   
                <p>Admin</p>
            </div>
        </div>
        <hr>
        <h6>Menu</h6>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item mb-1">
                <a href="#" class="nav-link active" aria-current="page">
                    <i class="fa-solid fa-house p-1"></i>
                    Overview
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link text-light">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                Products
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link text-light">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
                Orders
                </a>
            </li>
            <li class="nav-item mb-1">
                <a href="#" class="nav-link text-light">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
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
    <div class="fs-5 p-2 menubar" ref="menubar">
        <button class="bg-dark border-dark">
           <i class="fa-solid fa-bars text-light" @click="toggleSideBar"></i>   
        </button>
    </div>
</div>
    
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class sideBar extends Vue {
    toggleSideBar(){
        // this.display = !this.display
        // console.log(this.display);
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

    #side_nav{
        background: #212529;
        min-width: 250px;
        max-width: 250px;
        transition: all 0.3s;
    }

    .content{
        min-height: 100vh;
        width: 100%;
    }

    .adminbar{
        min-height: 100vh;
        width: 280px;
    }

    i{
        cursor: pointer;
    }

    /* .xbar{
        visibility: hidden;
    } */
    .menubar{
        display: none;
    }

    @media screen and (max-width: 1000px){
        .adminbar{
            display: none;
        }
        /* .xbar{
            visibility: visible;
        } */
        .menubar{
            display: block;
        }
    }
</style>