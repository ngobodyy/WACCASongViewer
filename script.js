import { waccaSongs } from "/waccaSongs.js"

const dropdown = document.getElementById("songSelect")


for (let s in waccaSongs){
    dropdown.innerHTML += `<option value=${s}>${waccaSongs[s].artist} - ${waccaSongs[s].title}</option>`
}

dropdown.addEventListener("change", (event)=>{
    let songKey = event.target.value
    document.getElementById("displayInfo").innerHTML = `
        <h3>${waccaSongs[songKey].title}</h3>
        <h3>${waccaSongs[songKey].artist}</h3>
        <img class=albumart src="/WACCA_Songs/img/${waccaSongs[songKey].imageName}">
        <audio controls src="/WACCA_Songs/audio/${waccaSongs[songKey].audioPath}"></audio>
        <audio controls src="/WACCA_Songs/audio/${waccaSongs[songKey].audioInfPath}"></audio>   
    `
})