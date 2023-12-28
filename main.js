export let jsondata
;
(async ()=>{
    const res = await fetch('/users-data')
    jsondata = await res.json()
    console.log(jsondata)
})()