const signUpBtn = document.querySelector(".sign-up-btn")
const signInBtn = document.querySelector(".sign-in-btn")
const container = document.querySelector(".container")





signUpBtn.addEventListener("click", (e)=>{
    container.classList.add("active")
    console.log(123)})

signInBtn.addEventListener("click", (e)=>{
    container.classList.remove("active")
    console.log(123)})