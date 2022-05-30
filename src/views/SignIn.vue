<template>
  <div class="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
      <div class="md:flex w-full">
        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div class="text-center mb-2">
            <h1 class="font-bold text-3xl text-gray-900">Sign in</h1>
            <p>Enter your information to sign in into your account</p>
          </div>
          <div>
            <div class="flex -mx-3">
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <label class="text-xs font-semibold px-1">Email</label>
                <div class="flex">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i
                    class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                  <input v-model="email" type="email"
                         class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                         placeholder="example@mail.com">
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-1">
                <label class="text-xs font-semibold px-1">Password</label>
                <div class="flex relative">
                  <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i
                    class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                  <input v-model="password" :type="passwordVisible ? 'text' : 'password'"
                         class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                         placeholder="************">
                  <div
                    class="absolute right-5 top-2"
                    @click="passwordVisible = !passwordVisible"
                    tabindex="-1"
                  >
                    <i v-if="passwordVisible" class="fa fa-eye" aria-hidden="true"></i>
                    <i v-if="!passwordVisible" class="fa fa-eye-slash" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 py-4">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label for="remember" class="text-sm font-semibold text-gray-500">Remember me</label>
            </div>
            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
            <div class="flex -mx-3">
              <div class="w-full px-3 mb-5">
                <button @click="register"
                        class="block w-full max-w-xs mx-auto bg-zinc-900 hover:bg-zinc-700 text-white rounded-lg px-2 py-1 font-semibold">
                  Login
                </button>
              </div>
            </div>
            <a
              @click="sighInWithGoogle"
              href="#"
              class="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
            >
              <span class="w-5 h-5 text-gray-800 fill-current group-hover:text-white">
                <img src="../assets/images/google.svg" alt="google icon">
              </span>
              <span class="text-sm font-medium text-gray-800 group-hover:text-white">Google</span>
            </a>
            <div class="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an Account ?
              <router-link to="/register" class="cursor-pointer text-indigo-600 hover:text-indigo-800">Register
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block w-1/1 bg-white-500 py-10 px-10">
          <img src="../../src/assets/images/team.svg" alt="Team" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useStore } from 'vuex'
import router from "@/router";

const store = useStore();

const email = ref("");
const password = ref("");
const passwordVisible = ref(false);
const errMsg = ref();
const register = () => {
  if (email.value === 'admin' && password.value === '12345') {
    email.value = 'admin@gmail.com';
    password.value = '123456';
  }
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in");
      router.push('/profile');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that emaul found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "The username or password you entered is incorrect";
          break;
      }
    })
};

const sighInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/profile");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style>

</style>