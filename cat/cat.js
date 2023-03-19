const bouton = document.getElementById("btn")
let a_link = document.createElement("a")
let saut_ligne = document.createElement("br")
let input_x = document.getElementById("inputx")
let input_y = document.getElementById("inputy")

let img
let video

function fetchPhotos(){
    return fetch("https://random.dog/woof.json")
}

bouton.addEventListener("click",function(){
    const carApi = fetchPhotos().then((httpResponse) => {
        return httpResponse.json()
    }).then((data)=>{
        const divBody = document.getElementById("container")
        const taille = data.fileSizeBytes
        a_link.href = data.url
        a_link.append(data.url)
        console.log(isImage(data.url))
        if (isImage(data.url) == true){
            img = document.createElement('img')
            img.src = data.url
            img.style = "max-width:" + input_x.value + "px;max-height:" + input_y.value + "px;"
        }else if (isImage(data.url) == false) {
            video = document.createElement('video')
            video.width = input_x.value/2
            video.length = input_y.value/2
            video.setAttribute("controls","controls")

            let source = document.createElement('source')
            source.src = data.url
            source.type = "video/mp4"
            source.type = "video/webm"
            video.append(source)
            video.append("Your browser does not support the video.")
        }
        const newText = "<p>La taille de l'image est de " + taille + ' bytes.</p>'
        divBody.append(a_link)
        divBody.append(saut_ligne)
        if(img == undefined){
            divBody.append(video)
            console.log(divBody)
        }else{
            divBody.append(img)
        }
        divBody.innerHTML += newText

        a_link.innerHTML = ''
        a_link.innerText = ""
        if(img == undefined){
            video = undefined
        }else{
            img = undefined
        }
    })
})





function getExtension(filename) {
    let parts = filename.split('.')
    return parts[parts.length - 1]
  }
  
function isImage(filename) {
     ext = getExtension(filename)
     if (ext == "mp4" || ext == "webm"){
        return false
     }
     return true
}