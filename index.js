const bouton = document.getElementById("btn")
let input_x = document.getElementById("inputx")
let input_y = document.getElementById("inputy")

//Créer des balises
let a_link = document.createElement("a")
let saut_ligne = document.createElement("br")

//Créer des valeurs non définies
let img
let video

function fetchPhotos(){
    return fetch("https://random.dog/woof.json") //API
}

bouton.addEventListener("click",function(){
    const carApi = fetchPhotos().then((httpResponse) => {
        return httpResponse.json()
    }).then((data)=>{
        const divBody = document.getElementById("container") //Représente le paragraphe qui va contenir les éléments

        const taille = data.fileSizeBytes //Représente la taille de l'image

        a_link.href = data.url //Ajoute le lien de l'image
        a_link.append(data.url)

        if (isImage(data.url) == true){ //Complète une valeur par une balise suivant le retour de la fonction isImage()
            img = document.createElement('img')
            img.src = data.url
            img.style = "max-width:" + input_x.value + "px;max-height:" + input_y.value + "px;"  //CSS de l'image
            
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

        const newText = "<p>The size of the image is " + taille + ' bytes.</p>'

        //Ajout de tous les éléments dans la div
        divBody.append(a_link)
        divBody.append(saut_ligne)
        if(img == undefined){ //Vérifie si img est défini pour éviter les erreurs
            divBody.append(video)
        }else{
            divBody.append(img)
        }
        divBody.innerHTML += newText

        //Réinitialise les liens et les valeurs img et video
        a_link.innerHTML = ''
        a_link.innerText = ""
        if(img == undefined){
            video = undefined
        }else{
            img = undefined
        }
    })
})





function getExtension(filename) { //Sépare les éléments du lien et récupère l'extention
    let parts = filename.split('.')
    return parts[parts.length - 1]
  }
  
function isImage(filename) { //Vérifie l'extension du lien (renvoie faux si c'est une video)
     ext = getExtension(filename)
     if (ext == "mp4" || ext == "webm" || ext == "ogg"){
        return false
     }
     return true
}