<template>
  <div class="container p-4 mt-5">
    <div class="row align-items-center">
      <div class="col-md-6 mb-3">
        <img src="@/assets/7010823_3255317.jpg" alt="" class="img-fluid">
      </div>
      <div class="col-md-6 about-text">
        <h1>Learn more About us</h1>
        <p>Our online store is stocked with a wide variety of gadgets to suit every need and budget. From smartphones and tablets to laptops and smartwatches, we've got you covered. 
          We're dedicated to providing you with the best shopping experience possible,and we're always here to help if you have any questions or need assistance.
          So why wait? Start shopping now and upgrade your tech today!.</p>
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