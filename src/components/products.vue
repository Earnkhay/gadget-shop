<template>
  <div id="app">
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Products</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, inventore id. Tenetur, eligendi. Amet magnam ducimus accusantium dolor, vel eos.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_shopping_app_flsj.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <!-- Button trigger modal -->
    <div class="d-flex justify-content-between container px-5 py-2 mb-3 border-bottom">
      <h2>Products List</h2>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Product
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add new product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Product name</label>
              <input type="text" v-model="name" class="form-control" id="exampleFormControlInput1" placeholder="Input Product name">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Product price</label>
              <input type="number" class="form-control" v-model="price" id="exampleFormControlInput1" placeholder="Input Product price">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Product Image</label>
              <input type="file" class="form-control" @change="uploadImage" id="exampleFormControlInput1">
            </div>
            <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images" :key="index">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Product Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="desc" rows="3"></textarea>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addProduct">Add</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container px-5 cover mb-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, id) in products" :key="id">
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td>
              <i class="fa-solid fa-pen-to-square text-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="editProduct(product.id)"></i>
              <i class="fa-solid fa-trash text-danger ms-2" @click.prevent="deleteProduct(product.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
    <!-- Edit Modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Product Name</label>
                  <input class="form-control" v-model="editName" type="text" aria-label="default input example">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Product price</label>
                <input type="number" class="form-control" v-model="editPrice" id="exampleFormControlInput1">
              </div>
              <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editDesc"></textarea>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateProduct">Update Task</button>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytes, } from "firebase/storage";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, snapshot, getDoc, orderBy, query } from "firebase/firestore";

@Options({
  components: {
  },
})
export default class products extends Vue {
  products = []
  images = []
  name = ""
  price = null
  desc = ""
  editName = ""
  editPrice = null
  editDesc = ""
  currentProduct
  auth = getAuth()
  user = this.auth.currentUser
  id = this.user.uid
  productsCollectionRef = collection(db, `profiles/${this.id}/products`)
  productsCollectionQuery = query(this.productsCollectionRef, orderBy('date', 'desc'));

  mounted(){ 
    onAuthStateChanged(this.auth, (user) => {
        if (user) {
            onSnapshot(this.productsCollectionQuery, (querySnapshot) => {
            const fbProducts = []
            querySnapshot.forEach((doc) => {
                const product = {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    desc: doc.data().desc
                }
                fbProducts.push(product)
            })
                this.products = fbProducts
            })
        }
    })
  }

  addProduct(){
      if(this.name) {
          addDoc(this.productsCollectionRef, { 
              name: this.name,
              price: this.price,
              desc: this.desc,
              date: Date.now(),
          })
        this.name = ""
        this.price = ""
        this.desc = ""
      }
  }

  uploadImage(){
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const storageRef = ref(storage, 'products/'+ Math.random() + '_'  + file.name);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  editProduct(id){
      const taskToUpdate = this.products.find((product) => product.id === id)
      this.editName = taskToUpdate.name,
      this.editPrice = taskToUpdate.price,
      this.editDesc = taskToUpdate.desc
      this.currentProduct = taskToUpdate
  }

  async updateProduct(){
      await updateDoc(doc(db, `profiles/${this.id}/products`, this.currentProduct.id), {
          name: this.editName,
          price: this.editPrice,
          desc: this.editDesc
      });
  }

  deleteProduct(id){
      deleteDoc(doc(db, `profiles/${this.id}/products`, id));
  }
}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }

  .cover{
      white-space: nowrap;
      overflow-x:auto;
  }
</style>
