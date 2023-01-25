<template>
  <div id="app">
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Products</h1>
          <p>Add new products here.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_shopping_app_flsj.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <!-- <input list="items">
    <datalist id="items">
      <option value="nk"></option>
      <option value="nkechi"></option>
      <option value="julia"></option>
      <option value="nkechi onyimadu"></option>
    </datalist> -->
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
                <label for="category" class="form-label">Category</label>
                <select class="form-select" id="category" v-model="category" required>
                    <option value="">Select a category</option>
                    <option >Laptop</option>
                    <option >Phone</option>
                </select>
            </div>
            <div class="mb-3 img-wrapp">
              <label for="exampleFormControlInput1" class="form-label">Product Image</label>
              <input type="file" class="form-control mb-2" id="imageInput" @change="uploadImages" accept=".png, .jpg, .jfif">
                <img :src="image" style="width: 5rem; height: 30%;" alt="preview image"><span class="p-1 delete-img" style="cursor: pointer;" @click="deleteImage()">X</span>
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
            <th scope="col">Product img</th>
            <!-- <th scope="col">Image name</th> -->
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, id) in products" :key="id">
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td><img :src="product.image" style="width: 2rem; height: 10%;" alt=""></td>
            <!-- <td>{{product.imgName}}</td> -->
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
                <label for="editCategory" class="form-label">Category</label>
                <select class="form-select" v-model="editCategory" required>
                    <option value=""></option>
                    <option >Laptop</option>
                    <option >Phone</option>
                </select>
              </div>
              <!-- <div class="mb-3 img-wrapp">
                <label for="exampleFormControlInput1" class="form-label">Product Image</label>
                <input type="file" class="form-control mb-2" id="editImgInput" @change="editImage">
                  <img :src="url" style="width: 5rem; height: 30%;" alt="preview image"><span class="p-1 delete-img" style="cursor: pointer;" @click="delEditImage()">X</span>
              </div> -->
              <div class="mb-3 img-wrapp">
                <label for="exampleFormControlInput1" class="form-label">Product Image</label>
                <input type="file" class="form-control mb-2" id="imageInput" @change="uploadImages">
                  <img :src="image" style="width: 5rem; height: 30%;" alt="preview image"><span class="p-1 delete-img" style="cursor: pointer;" @click="deleteImage()">X</span>
              </div>
              <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editDesc"></textarea>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateProduct">Update Product</button>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import toast from '@/components/UI/toast.vue'
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";

@Options({
  components: {
    toast
  },
})
export default class products extends Vue {
  products:any = []
  image = ""
  url = ""
  name = ""
  price = null
  desc = ""
  fileName = ""
  imgName = ""
  editName = ""
  editPrice = null
  editDesc = ""
  editCategory = ""
  images = []
  storage = getStorage();
  currentProduct: any
  toastIcon = ''
  toastTitle = ''
  toastShow = false
  category = ""
  auth = getAuth()
  user = this.auth.currentUser
  id = this.user?.uid
  productsCollectionRef = collection(db, `products`)
  productsCollectionQuery = query(this.productsCollectionRef, orderBy('date', 'desc'));

  mounted(){ 
    onAuthStateChanged(this.auth, (user) => {
        if (user) {
            onSnapshot(this.productsCollectionQuery, (querySnapshot) => {
            const fbProducts: { id: string; name: any; price: any; desc: any; category: any; image: any; imgName: any; }[] = []
            querySnapshot.forEach((doc) => {
                const product = {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    desc: doc.data().desc,
                    category: doc.data().category,
                    image: doc.data().image,
                    imgName: doc.data().imgName,
                }
                fbProducts.push(product)
            })
                this.products = fbProducts
            })
        }
    })
  }

  async uploadImages() {
    const file = (document.getElementById('imageInput') as HTMLInputElement | any).files[0];
    const storageRef = ref(this.storage, 'products/' + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
        // this.images.push(snapshot);
        this.fileName = snapshot.metadata.name
        this.toastIcon = 'success'
        this.toastTitle = 'Uploaded image successfully'
        this.toastShow = true
      });

    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.image = url
      })
      .catch((error) => {
        this.toastShow = true
        this.toastIcon = 'error'
        switch (error.code) {
          case 'storage/object-not-found':
            this.toastTitle = 'object not found'
            break;
          case 'storage/unauthorized':
            this.toastTitle = 'unauthorized'
            break;
          case 'storage/canceled':
            this.toastTitle = 'canceled'
            break;
          case 'storage/unknown':
            this.toastTitle = 'unknown'
            break;
        }
      });
  }

  addProduct(){
    if(this.name && this.price && this.desc && this.image) {
      addDoc(this.productsCollectionRef, { 
        name: this.name,
        price: this.price,
        desc: this.desc,
        image: this.image,
        imgName: this.fileName,
        category: this.category,
        date: Date.now(),
      })
       const img = (document.getElementById('imageInput') as HTMLInputElement).value = '';
        this.toastIcon = 'success'
        this.toastTitle = 'Product added successfully'
        this.toastShow = true
        this.name = ""
        this.price = null
        this.desc = ""
        this.image = ""
        this.category = ''
        img
      }else{
        this.toastIcon = 'error'
        this.toastTitle = 'please input all required details'
        this.toastShow = true
      }
  }

  // async editImages() {
  //     // Get a reference to the file input element
  //     const fileInput = this.$refs.fileInput;

  //     // Get the selected files
  //     const files = fileInput.files;

  //     // Iterate over the selected files
  //     for (let i = 0; i < files.length; i++) {
  //       // Get the current file
  //       const file = files[i];

  //       // Create a new FileReader instance
  //       const reader = new FileReader();

  //       // Listen for the 'load' event on the FileReader instance
  //       reader.addEventListener('load', () => {
  //         // The 'result' property of the FileReader instance contains the base64-encoded contents of the file
  //         const fileData = reader.result;

  //         // Now you can use the Firebase Storage API to upload the file data to your storage bucket
  //         this.editImage(fileData, file.name);
  //         // this.url = fileData
  //         // console.log(fileData);
  //       });

  //       // Read the contents of the file as a base64-encoded string
  //       reader.readAsDataURL(file);
  //     }
  // }
    // async editImage() {
    //   const storage = getStorage();
    //   const file = document.getElementById('editImgInput').files[0];
    //   const storageRef = ref(storage, 'products/' + file.name);
    //   this.imgName = file.name

    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     this.images.push(snapshot);
    //   });

    // getDownloadURL(storageRef)
    //   .then((url) => {
    //     this.url = url
    //     console.log(this.url);
    //   })
    //   .catch(() => {
    //     //
    //   });
    // }

  editProduct(id: any){
      const taskToUpdate = this.products.find((product: { id: any; }) => product.id === id)
      this.editName = taskToUpdate.name,
      this.editPrice = taskToUpdate.price,
      this.editDesc = taskToUpdate.desc,
      this.image = taskToUpdate.image,
      this.editCategory = taskToUpdate.category
      this.currentProduct = taskToUpdate
  }

  updateProduct(){
    this.toastIcon = 'success'
    this.toastTitle = 'Product updated successfully'
    this.toastShow = true
      updateDoc(doc(db, `products`, this.currentProduct.id), {
          name: this.editName,
          price: this.editPrice,
          desc: this.editDesc,
          // image: this.image,
          // imgName: this.fileName,
          category: this.editCategory
      });
  }

  deleteProduct(id: string){
    this.toastIcon = 'success'
    this.toastTitle = 'Product deleted successfully'
    this.toastShow = true
    // Create a reference to the file to delete
    const storageRef = ref(this.storage)

    const imagesRef = ref(storageRef, 'products');

    const itemToBedeleted = this.products.find((data: { id: string; }) => data.id == id);

    const spaceRef = ref(imagesRef, `${itemToBedeleted.imgName}`);

    //Delete the file
    deleteObject(spaceRef).then(() => {
      // console.log('deleted successfully');
    }).catch((error) => {
      this.toastIcon = 'error'
      this.toastTitle = error
      this.toastShow = true
    });
    deleteDoc(doc(db, `products`, id));
  }

  // delEditImage(){
  //   // Create a reference to the file to delete
  //   const imageRef = ref(this.storage, `${this.url}`)

  //   // Delete the file
  //   deleteObject(imageRef).then(() => {
  //     this.url = "" 
  //     document.getElementById('editImgInput').value = '';
  //   }).catch(() => {
  //     // console.log(error);
  //   });
  // }
  deleteImage(){
    // Create a reference to the file to delete
    const imageRef = ref(this.storage, `${this.image}`)

    // Delete the file
    deleteObject(imageRef).then(() => {
      (document.getElementById('imageInput') as HTMLInputElement).value = '';
      this.image = "" 
      this.toastIcon = 'success'
      this.toastTitle = 'Image deleted successfully'
      this.toastShow = true
    }).catch((error) => {
      this.toastIcon = 'error'
      this.toastTitle = error
      this.toastShow = true
    });
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
