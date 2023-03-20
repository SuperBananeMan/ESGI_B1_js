const bouton = document.getElementById("btn")
let input_x = document.getElementById("inputx")
let input_y = document.getElementById("inputy")

//Création de balises HTML
let site_link = document.createElement("a")
let a_link = document.createElement("a")
let saut_ligne = document.createElement("br")
let img = document.createElement('img')

function fetchPhotos(){
    return fetch("https://randomfox.ca/floof/") //API
}

bouton.addEventListener("click",function(){
    const carApi = fetchPhotos().then((httpResponse) => {
        return httpResponse.json()
    }).then((data)=>{
        const divBody = document.getElementById("container") //Représente le paragraphe qui va contenir les éléments

        site_link.href = data.link //Ajoute le lien du site vers l'image
        site_link.append(data.link)
         
        a_link.href = data.image //Ajoute le lien de l'image
        a_link.append(data.image)

        img.src = data.image //Ajoute l'image
        img.style = "max-width:" + input_x.value + "px;max-height:" + input_y.value + "px;" + "margin-bottom:25px;" //CSS de l'image

        //Ajout de tous les éléments dans la div
        divBody.append(site_link)
        divBody.append(saut_ligne)
        divBody.innerHTML += ""
        divBody.append(a_link)
        divBody.append(saut_ligne)
        divBody.innerHTML += ""
        divBody.append(img)
        divBody.append(saut_ligne)
        divBody.innerHTML += ""

        //Réinitialise les liens
        site_link.innerHTML = ''
        site_link.innerText = ""
        a_link.innerHTML = ''
        a_link.innerText = ""
    })
})