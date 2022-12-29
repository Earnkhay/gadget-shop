<template>
    <!-- <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
            <span class="text-muted">Place sticky footer content here.</span>
        </div>
    </footer> -->

    <div class="container">
        <footer class="row row-cols-2 row-cols-sm-2 row-cols-md-5 py-5 mt-5 border-top">
            <div class="col-md-3 col-sm-3 mb-3">
                <router-link class="navbar-brand" to="/"><h2> Gadget Shop</h2></router-link>
                <p class="text-muted">© 2022</p>
            </div>

            <div class="col-md-3 col-sm-3 mb-3">

            </div>

            <div class="col-md-3 col-sm-3 mb-3">
            <h5>Navigation</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2"><router-link to="/" class="text-decoration-none link-dark">Home</router-link></li>
                <li class="nav-item mb-2"><router-link to="/products" class="text-decoration-none link-dark">Products</router-link></li>
                <li class="nav-item mb-2"><router-link class="dropdown-item" to="/admin/overview">Account</router-link></li>
                <li class="nav-item mb-2"><router-link to="/cart" class="link-dark text-decoration-none">Cart</router-link></li>
            </ul>
            </div>

            <div class="col-md-3 col-sm-3 mb-3">
            <h5>Socials</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Instagram</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">LinkedIn</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Twitter</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Facebook</a></li>
            </ul>
            </div>
        </footer>
    </div>
</template>