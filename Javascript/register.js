// Register Elements
const nameregister = document.getElementById('name-register-inp')
const emailregister = document.getElementById('email-register-inp')
const passwordregister = document.getElementById('password-register-inp')
const registerbtn = document.getElementById('form-register-btn')
let jsondata
;

(async ()=>{
    const res = await fetch('/users-data')
    jsondata = await res.json()
})()

registerbtn.addEventListener('click',()=>{
    const name = nameregister.value
    const email = emailregister.value
    const password = passwordregister.value
    if(!name || !email || !password) {
        window.alert('All Fields are required')
        return
    }
    registeruser(jsondata,nameregister.value,emailregister.value,passwordregister.value)
})

async function registeruser(jsonData,name,email,password) {
    const checkuser = jsondata.users.find((users)=> users.email === email)
    if(checkuser) {
        window.alert('User Already Exists')
        return
    }

    const newId = jsonData.users.length + 1;
    const newuser = {
        "id":newId,
        "username":name,
        "email":email,
        "password":password,
        "role":"developer"
    }
    
    const response = await fetch('/add-user', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newuser),
    });

    window.location.href = '/signin'
}