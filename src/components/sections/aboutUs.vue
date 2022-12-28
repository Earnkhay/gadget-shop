<template>
  <div class="container p-4 mt-5">
    <div class="row align-items-center">
      <div class="col-md-6 mb-3">
        <img src="@/assets/7010823_3255317.jpg" alt="" class="img-fluid">
      </div>
      <div class="col-md-6 about-text">
        <h1>Learn more About us</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          Nesciunt, nobis tempore odio nemo debitis fugiat laborum a culpa voluptatibus deleniti enim hic sunt accusantium consectetur, 
          aut ut vitae repellat eos.</p>
          <router-link to="/products" class="btn btn-lg btn-outline-primary">Browse products</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media screen and (max-width: 350px) {
    .about-text{
      font-size: 14px;
    }
  }
</style>