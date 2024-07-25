import { auth, provider } from './firebase.js';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const mainView = document.getElementById("main-view");

const logInForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const googleLoginBtn = document.getElementById("google-login-btn");
const loginErrorMessage = document.getElementById("login-error-message");
const needAnAccountBtn = document.getElementById("need-an-account-btn");

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");
const signUpFormView = document.getElementById("signup-form");
const haveAnAccountBtn = document.getElementById("have-an-account-btn");

const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");
const logOutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    logInForm.style.display = "none";
    signUpFormView.style.display = "none";
    userProfileView.style.display = "block";
    UIuserEmail.innerHTML = user.email;
  } else {
    logInForm.style.display = "block";
    signUpFormView.style.display = "none";
    userProfileView.style.display = "none";
  }
  mainView.classList.remove("loading");
});

const signUpButtonPressed = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log(userCredential);
  } catch (error) {
    console.log(error.code);
    UIErrorMessage.innerHTML = formatErrorMessage(error.code, "signup");
    UIErrorMessage.classList.add("visible");
  }
};

const logOutButtonPressed = async () => {
  try {
    await signOut(auth);
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log(error);
  }
};

const loginButtonPressed = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
  } catch (error) {
    console.log(error.code);
    loginErrorMessage.innerHTML = formatErrorMessage(error.code, "login");
    loginErrorMessage.classList.add("visible");
  }
};

const googleLoginButtonPressed = async (e) => {
  e.preventDefault();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.log(error.code);
    loginErrorMessage.innerHTML = formatErrorMessage(error.code, "login");
    loginErrorMessage.classList.add("visible");
  }
};

const needAnAccountButtonPressed = () => {
  logInForm.style.display = "none";
  signUpFormView.style.display = "block";
};

const haveAnAccountButtonPressed = () => {
  logInForm.style.display = "block";
  signUpFormView.style.display = "none";
};

signUpBtn.addEventListener("click", signUpButtonPressed);
haveAnAccountBtn.addEventListener("click", haveAnAccountButtonPressed);
logOutBtn.addEventListener("click", logOutButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);
googleLoginBtn.addEventListener("click", googleLoginButtonPressed);
needAnAccountBtn.addEventListener("click", needAnAccountButtonPressed);

const formatErrorMessage = (errorCode, action) => {
  let message = "";
  if (action === "signup") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-email"
    ) {
      message = "Por favor introduzca una dirección de correo electrónico válida";
    } else if (
      errorCode === "auth/missing-password" ||
      errorCode === "auth/weak-password"
    ) {
      message = "La contraseña debe tener 6 caracteres como mínimo";
    } else if (errorCode === "auth/email-already-in-use") {
      message = "El correo ya existe en la base de datos";
    }
  } else if (action === "login") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-password"
    ) {
      message = "Correo electrónico o la contraseña son incorrectos";
    } else if (errorCode === "auth/user-not-found") {
      message = "Nuestro sistema no pudo verificar su correo electrónico o contraseña.";
    }
  }

  return message;
};
