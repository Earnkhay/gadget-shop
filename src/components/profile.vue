<template>
  <div id="app">
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
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
          <button type="button" class="btn me-2" :class=" [profileDisplay == false ? 'btn-transparent' : 'btn-primary']" @click="profileDisplay = true, formDisplay = false">Profile</button>
          <button type="button" class="btn btn-transparent" :class="[formDisplay == true ? 'btn-primary' : '']" @click="formDisplay = true, profileDisplay = false"> Account settings</button>
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import toast from '@/components/UI/toast.vue'
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

@Options({
  components: {
    toast
  },
})
export default class profile extends Vue {
  auth = getAuth();
  user = this.auth.currentUser
  id = this.user?.uid
  name = ""
  address = ""
  email: any = ""
  images = []
  number = null
  toastIcon = ''
  toastTitle = ''
  toastShow = false
  formDisplay = false
  profileDisplay = true
  storage = getStorage();
  photoURL: any = "" 

  created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        onSnapshot(doc(db, `profiles/${this.id}`), (doc) => {
            this.name = doc.data()?.name
            this.address = doc.data()?.address
            this.number = doc.data()?.number
        });
        this.email = user.email;
      }
    });
  }

  async uploadImage() {
    // const file = (<HTMLInputElement | null>document.getElementById('imageInput')).files[0];
    const file = (document.getElementById('imageInput') as HTMLInputElement | any).files[0];
    const storageRef = ref(this.storage, 'avatar/' + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
        // this.images.push(snapshot);
        // this.fileName = snapshot.metadata.name
        this.toastIcon = 'success'
        this.toastTitle = 'Image uploaded successfully'
        this.toastShow = true
      });

    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.photoURL = url
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

  deleteImage(){
    // Create a reference to the file to delete
    const imageRef = ref(this.storage, `${this.photoURL}`)

    // Delete the file
    deleteObject(imageRef).then(() => {
      (document.getElementById('imageInput')as HTMLInputElement).value = '';
      this.toastShow = true
      this.toastIcon = 'success'
      this.toastTitle = 'Image deleted successfully'
      this.photoURL = "" 
    }).catch((error) => {
      this.toastShow = true
      this.toastIcon = 'error'
      this.toastTitle = error
    });
  }

  updatePass(){
    sendPasswordResetEmail(this.auth, this.email)
    .then(() => {
      this.toastShow = true
      this.toastIcon = 'success'
      this.toastTitle = 'Password reset email sent!'
    })
    .catch((error) => {
      this.toastShow = true
      this.toastIcon = 'error'
      this.toastTitle = error.message
    });
  }

  updateProfile(){
    updateDoc(doc(db, `profiles/${this.id}`), {
        name: this.name,
        address: this.address,
        number: this.number
    })
    this.toastShow = true
    this.toastIcon = 'success'
    this.toastTitle = 'Profile updated successfully'
  }
  savePicture(){
    updateDoc(doc(db, `profiles/${this.id}`), {
        photoURL: this.photoURL,
    });
    (document.getElementById('imageInput') as HTMLInputElement).value = '';
    this.toastIcon = 'success'
    this.toastTitle = 'Avatar uploaded successfully'
    this.toastShow = true
    this.photoURL = ""
  }
}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
</style>
