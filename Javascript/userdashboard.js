import { jsondata } from "../main.js"

const username = document.getElementById('name')
;
(async()=>{
    const res = await fetch('/get-user')
    const user = await res.json()
    populateuser(user)
})()

function populateuser(user) {
    username.innerHTML = user.username
}
