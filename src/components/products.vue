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
              <input type="file" class="form-control mb-2" ref="fileInput" id="imageInput" @change="uploadImages">
                <img :src="image" style="width: 5rem; height: 30%;" alt="preview image"><span class="delete-img" style="cursor: pointer;" @click="deleteImage()">X</span>
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
            <th scope="col">Image name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, id) in products" :key="id">
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td><img :src="product.image" style="width: 2rem; height: 10%;" alt=""></td>
            <td>{{product.imgName}}</td>
            <td>
              <i class="fa-solid fa-pen-to-square text-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="editProduct(product.id)"></i>
              <i class="fa-solid fa-trash text-danger ms-2" @click.prevent="deleteProduct(product.id, index)"></i>
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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, child } from "firebase/storage";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, snapshot, getDoc, orderBy, query } from "firebase/firestore";

@Options({
  components: {
  },
})
export default class products extends Vue {
  products = []
  image = ""
  name = ""
  price = null
  desc = ""
  fileName = ""
  imgName = []
  editName = ""
  editPrice = null
  editDesc = ""
  images = []
  storage = getStorage();
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
                    desc: doc.data().desc,
                    image: doc.data().image,
                    imgName: doc.data().imgName,
                }
                fbProducts.push(product)
            })
                this.products = fbProducts
                // this.imgName = fbProducts.imgName
                // console.log(fbProducts.imgName);
            })
        }
    })
  }

  async uploadImages() {
    // const storage = getStorage();
    const file = document.getElementById('imageInput').files[0];
    const storageRef = ref(this.storage, 'products/' + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
        this.images.push(snapshot);
        this.fileName = snapshot.metadata.name
        // console.log(this.images, this.fileName);
      });

    // console.log(storageRef);
    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.image = url
        // console.log(this.image, 'comparing image and url', url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  addProduct(){
      if(this.name && this.price) {
          addDoc(this.productsCollectionRef, { 
              name: this.name,
              price: this.price,
              desc: this.desc,
              image: this.image,
              imgName: this.fileName,
              date: Date.now(),
          })
          // console.log(this.image)
        this.name = ""
        this.price = ""
        this.desc = ""
        this.image = ""
        document.getElementById('imageInput').value = '';
        }
  }

  // async uploadImages() {
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
  //         this.uploadImage(fileData, file.name);
  //         this.image = fileData
  //       });

  //       // Read the contents of the file as a base64-encoded string
  //       reader.readAsDataURL(file);
  //     }
  //     // const storage = getStorage();
  //     // const file = document.getElementById('imageInput').files[0];
  //     // const storageRef = ref(storage, file.name);
  //     // uploadBytes(storageRef, file).then((snapshot) => {
  //     //   console.log('Uploaded a blob or file!');
  //     //   this.images.push(snapshot);
  //     // });
  //   }
  //   async uploadImage(fileData, fileName) {
  //     const storage = getStorage();
  //     const storageRef = ref(storage, 'products/' + fileName);

  //     // 'file' comes from the Blob or File API
  //     uploadBytes(storageRef, fileData).then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //       this.images.push(snapshot);
  //     });
  //   }


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

  deleteProduct(id, index){
    // Create a reference to the file to delete
    const storageRef = ref(this.storage)

    const imagesRef = ref(storageRef, 'products');

    const itemToBedeleted = this.products.find((data) => data.id == id);
    // console.log(itemToBedeleted.imgName);

    const spaceRef = ref(imagesRef, `${itemToBedeleted.imgName}`);

    //Delete the file
    deleteObject(spaceRef).then(() => {
      console.log('deleted successfully');
    }).catch((error) => {
      console.log(error);
    });
    deleteDoc(doc(db, `profiles/${this.id}/products`, id));
  }

  deleteImage(){
    // Create a reference to the file to delete
    const imageRef = ref(this.storage, `${this.image}`)

    // Delete the file
    deleteObject(imageRef).then(() => {
      this.image = "" 
      console.log('deleted successfully');
    }).catch((error) => {
      console.log(error);
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
