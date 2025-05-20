<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const email = ref("");
const password = ref("");

const emit = defineEmits(["login"]);

const doLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    emit("login");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
  }
};
</script>

<template>
  <div class="login-page">
    <form class="login-page__form" @submit.prevent="doLogin">
      <h2 class="login-page__title">Login</h2>
      <div class="login-page__group">
        <label class="login-page__label" for="email">Email</label>
        <input class="login-page__input" type="email" id="email" v-model="email" placeholder="Enter your email" required />
      </div>
      <div class="login-page__group">
        <label class="login-page__label" for="password">Password</label>
        <input class="login-page__input" type="password" id="password" v-model="password" placeholder="Enter your password" required />
      </div>
      <button class="login-page__button" type="submit">Login</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>

.login-page {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 12px #eee;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__group {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__label {
    font-weight: bold;
  }

  &__input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  &__button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
