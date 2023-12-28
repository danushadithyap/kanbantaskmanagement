import { jsondata } from "../main.js"
// Sign In Elements
const emailsignin = document.getElementById('email-signin-inp')
const passwordsignin = document.getElementById('password-signin-inp')
const signinbtn = document.getElementById('form-signin-btn')

signinbtn.addEventListener('click',()=>{
    const email = emailsignin.value
    const password = passwordsignin.value
    if(!email|| !password) return
    validateuser(jsondata,email,password)
})

async function validateuser(jsondata,email,password) {
    let user = jsondata.users.filter((user)=>user.email === email)
    if(!user) {
        window.alert('No user found !')
        return
    }
    user = user[0]
    if(user.password != password) {
        window.alert('Incorrect Password')
        return
    }

    const response = await fetch('/load-user', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(user),
    });
    
    window.location.href="/user-dashboard"
}