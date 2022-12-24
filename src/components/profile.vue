<template>
  <div id="app">
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Profile</h1>
          <p>Change your profile settings here.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_Profile_re_4a55.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <div class="container p-4">
      <div class="container">
        <div class="mb-3">
          <button type="button" class="btn me-2" :class="[profileDisplay == false ? 'btn-transparent' : 'btn-primary']" @click="profileDisplay = true, formDisplay = false">Profile</button>
          <button type="button" class="btn btn-transparent" :class="[formDisplay == true ? 'btn-primary' : '']" @click="formDisplay = true, profileDisplay = false">Account settings</button>
        </div>
        
        <form action="" v-if="profileDisplay">
          <input class="form-control mb-3" type="text" v-model="name" placeholder="Name" aria-label="default input example">
          <input class="form-control mb-3" type="text" v-model="address" placeholder="Address" aria-label="default input example">
          <input class="form-control mb-3" type="number" v-model="number" placeholder="Phone Number" aria-label="default input example">
          <button type="button" class="btn btn-primary" @click="updateProfile">Save changes</button>
        </form>
        
        <form action="" v-if="formDisplay">
          <input class="form-control mb-3" type="text" v-model="name" placeholder="Name" readonly>
          <input class="form-control mb-3" type="email" v-model="email" placeholder="email" aria-label="default input example" readonly>
          <!-- <div class="d-flex mb-3">
            <input class="form-control me-2" type="text" placeholder="New Password" aria-label="default input example">
            <input class="form-control" type="text" placeholder="Confirm password" aria-label="default input example">
          </div> -->          
          <div class="mb-3">
            <input class="form-control mb-3" type="file" ref="fileInput" id="imageInput" @change="uploadImage">
            <img :src="photoURL" style="width: 5rem; height: 30%;" alt="preview image"><span class="p-1 delete-img" style="cursor: pointer;" @click="deleteImage()">X</span>
          </div>
          <button type="button" class="btn btn-primary me-2 mb-2" @click="savePicture">Save Avatar</button>
          <button type="button" class="btn btn-success mb-2" @click="updatePass">Reset Password</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

@Options({
  components: {
  },
})
export default class profile extends Vue {
  auth = getAuth();
  user = this.auth.currentUser
  id = this.user.uid
  name = ""
  address = ""
  email = ""
  images = []
  number = null
  formDisplay = false
  profileDisplay = true
  storage = getStorage();
  photoURL = ""

  created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        onSnapshot(doc(db, `profiles/${this.id}`), (doc) => {
            // console.log("Current data: ", doc.data());
            this.name = doc.data().name
            this.address = doc.data().address
            this.number = doc.data().number
        });
        this.email = user.email;
        this.photoURL = user.photoURL;
          if(user.displayName != null){
              this.name = user.displayName
          }else {
              onSnapshot(doc(db, "profiles", user.uid), (doc) => {
                  this.name = doc.data().name
              })
          }
      }
    });
  }

  async uploadImage() {
    const file = document.getElementById('imageInput').files[0];
    const storageRef = ref(this.storage, 'avatar/' + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
        this.images.push(snapshot);
        // this.fileName = snapshot.metadata.name
        console.log('Uploaded a blob or file!');
      });

    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.photoURL = url
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

  deleteImage(){
    // Create a reference to the file to delete
    const imageRef = ref(this.storage, `${this.photoURL}`)

    // Delete the file
    deleteObject(imageRef).then(() => {
      this.photoURL = "" 
      document.getElementById('imageInput').value = '';
      console.log('deleted successfully');
    }).catch((error) => {
      console.log(error);
    });
  }

  updatePass(){
    sendPasswordResetEmail(this.auth, this.email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  async updateProfile(){
    await updateDoc(doc(db, `profiles/${this.id}`), {
        name: this.name,
        address: this.address,
        number: this.number
    });
  }
  async savePicture(){
    await updateDoc(doc(db, `profiles/${this.id}`), {
        photoURL: this.photoURL,
    });
    document.getElementById('imageInput').value = '';
    this.photoURL = ""
  }
}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
