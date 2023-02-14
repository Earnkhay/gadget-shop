<template>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{modalType == "signUp" ? 'Create Account' : 'Log In'}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="modal-body">
              <div class="form">
                  <div class="text-center">
                      <alert v-if="alertShow" :alertText="alertTitle" :alertType="alertType"></alert>
                  </div>
                  <div class="row justify-content-center mt-2">
                          <form action="" id="login-form" class="col-md-10 text-xs-center">   
                              <div class="mb-3 text-xs-center" v-if="modalType == 'signUp'">
                                  <label for="exampleFormControlInput1" class="form-label">Name</label>
                                  <input type="text" class="form-control" id="username" placeholder="Your name" v-model="name">
                                </div>
                              
                              <div class="mb-3 text-xs-center">
                                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                  <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" @blur="validateEmail">
                                </div>
                  
                              <div class="mb-4 text-xs-center">
                                  <label for="inputPassword" class=" form-label">Password</label>
                                  <div class="d-flex">
                                    <input :type="passwordType" class="form-control password" id="inputPassword" placeholder="Password" v-model="password" @blur="checkmodalTypePassword">
                                    <i class="fa-solid icon" :class="{'fa-eye': showEye, 'fa-eye-slash': !showEye}" id="togglePassword" @click="toggleVisibility"></i>
                                  </div>
                                </div>
                          
                              <div class="text-center">
                                  <button type="submit" class="mb-2 btn bg-primary w-100"  data-bs-dismiss="modal" aria-label="Close" id="signup" @click.prevent="checkModalTypeAuth(modalType)" :disabled="!closeBtn">
                                          {{ modalType == "signUp" ? "Sign Up" : "Sign In"}}
                                  </button>
                              </div>
                          <p id="account" class="text-center"> {{modalType == "signUp" ? "Already have an account?" : "Don't have an account?"}} 
                              <a href="" id="link" @click.prevent="setLoginPage" class="text-decoration-none">{{ modalType == "signUp" ? "Log in here" : "Sign up here" }}</a></p>
                      </form>    
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import alert from '@/components/UI/alert.vue'
import axios from 'axios'
import toast from '@/components/UI/toast.vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore";

@Options({
    components: {
        alert, 
        toast,
    },
})
export default class login extends Vue {
    passwordType = 'password'
    modalType ="login"
    alertTitle = ""
    alertType = ""
    alertShow = false
    toastIcon = ''
    toastTitle = ''
    toastShow = false
    name = ""
    email = ""
    password = ""
    mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

    setLoginPage(){     
        if(this.modalType == "signUp"){
            this.modalType = "login"
            this.email = ""
            this.password = ""
        }else if(this.modalType == "login"){
            this.modalType = "signUp"
            this.email = ""
            this.password = ""
        }
    }
    toggleVisibility() {
        if (this.showEye) this.passwordType = "text";
        else this.passwordType = "password";
    }
    get showEye() {
        return this.passwordType == "password";
    }
    get closeBtn(){
        return this.email !== '' && this.password !== ''
    }
    validateEmail() {
        if (this.mailformat.test(this.email)) {
            // console.log('valid email address');
        } else if(this.email == ""){
            this.alertTitle = "Please input Email address"
            this.alertType = "Danger"
            this.alertShow = true
            setTimeout(
                () => {
                    this.alertShow = false
            },3000)
        }else{
            this.alertTitle = "Please input valid Email address"
            this.alertType = "Danger"
            this.alertShow = true
            setTimeout(
                () => {
                    this.alertShow = false
                    this.email = ""
            },3000)
        }
    }
    validatePassword() {
            if (this.regPassword.test(this.password)) {
                this.alertShow = false
            }else if(this.password == ""){
                this.alertTitle = "Please input Password"
                this.alertType = "Danger"
                this.alertShow = true
                setTimeout(
                    () => {
                        this.alertShow = false
                },3000)
            }else{
                this.alertTitle = "Password should be at least 6 characters long, contain at least one uppercase & one digit"
                this.alertType = "Danger"
                this.alertShow = true
                setTimeout(
                    () => {
                        this.password = ""
                },3000)
            }
    }
    checkmodalTypePassword() {
        if (this.modalType == 'signUp') {
            this.validatePassword()
        }else {
            return null
        }
    }

    async checkModalTypeAuth(modalType: string){
        const formData = {
            email: this.email,
            password: this.password,
            name: this.name
        }
        const auth = getAuth()
        if (modalType == 'signUp' && this.name != "" && this.email != "" && this.password != '') {
            await createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((user) => {
                setDoc(doc(db, "profiles", user.user.uid), {
                    name: this.name
                });
                axios.post('https://gadget-shop-65d7a-default-rtdb.firebaseio.com/signup.json', {
                    formData: formData
                })
                this.toastIcon = 'success'
                this.toastTitle = 'Signed up successfully'
                this.toastShow = true
                this.$router.replace(`/account/profile`)
            })
            .catch((err) => {
                this.toastIcon = 'error'
                this.toastShow = true
                switch (err.code) {
                    case "auth/email-already-in-use":
                        this.toastTitle = "Email is already in use";
                        break;
                    case "auth/invalid-email":
                        this.toastTitle = "The email address is Invalid";
                        break;
                    case "auth/operation-not-allowed":
                        this.toastTitle = "Operation not allowed";
                        break;
                    default:
                        this.toastTitle = "Email or password was incorrect";
                        break;
                }
                this.name = ''
                this.email = ''
                this.password = ''
            });
        }else if(modalType == 'login'){
            await signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
                this.toastIcon = 'success'
                this.toastTitle = 'Signed in successfully'
                this.toastShow = true
                this.$router.replace('/account/overview')
            })
            .catch((err) => {
                this.toastIcon = 'error'
                this.toastShow = true
                switch (err.code) {
                    case "auth/invalid-email":
                        this.toastTitle = "Invalid email";
                        break;
                    case "auth/user-not-found":
                        this.toastTitle = "No Account with that email was found";
                        break;
                    case "auth/wrong-password":
                        this.toastTitle = "Incorrect password";
                        break;
                    default:
                        this.toastTitle = "Email or password was incorrect";
                        break;
                }
                this.name = ''
                this.email = ''
                this.password = ''
            });
        }else{
            this.toastIcon = 'error'
            this.toastTitle = 'Please input required details'
            this.toastShow = true
            return 
        }
    }
}
</script>

<style scoped>
#app{
    min-height: 100vh;
}
.icon{
    margin-left: -30px; 
    margin-top: 10px;
}
#signup:hover{
    color: red;
}

form a:hover{
    color: red;
}
</style>
  