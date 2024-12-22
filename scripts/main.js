
import API from "./api.js";
import UI from "./ui.js";

//class icerisindeki methodlari kullanabilmek icin claas ornegini al
const api = new API();
const ui = new UI();

//sayfa load yuklendigi anda api'den populer muzikleri al, renderla 
document.addEventListener("DOMContentLoaded", () => {
   
   //ekrana loader bas
   ui.renderLoader();
   
    // 1) then - catch 
    //api istegi atiyoruz
    api
        .getPopuler()
        .then((data) => 
            //gelen data icerisndeki her bir nesne icin ekrana lkartlari bas
            ui.renderCards(data))
        .catch((err) => {
            console.log(err);
            alert("uzgunuz bir sorun olustu ");
        });

});

//formdan bir sey aratildiginda apiden eslesen kelimeye uygun sonuclari al ve renderla
ui.form.addEventListener("submit", (e) => {
    //sayfanin yenilenmesini engelle
    e.preventDefault();

    //aratilan kelimeye eris
    const query = e.target[0].value

    //aratilan kelime bossa fonks. durdur.(trim ile query nin onunde arkasinda ki bosluklai kaldirir o sekilde ici bos mu degilmi anlariz)
    if(query.trim() === "") return alert("Lutfen gecerli bir metin aratin");


    //ekrana loader bas
    ui.renderLoader(); 


    //basligi gunceller.
    ui.updateTitle(query + " icin sonuclar");

    //api'den kelimeye uygun sonuclari al
    api
    .searchMusic(query).then((data) => ui.renderCards(data))
    .catch((err) => {
        console.log(err);
        alert("uzgunuz bir sorun olustu ");
    });

});

//liste alanindaki tiklama olaylarini izle ve eger oynat butonuna tiklanirsa o sarkiyi oynat
ui.list.addEventListener("click", (e)=>{

   

    //eger butonuna tiklanirsa o sarkiyi oynat 
    if(e.target.className === "play"){
        
        // oynatilacak sarkinin kartina eris
        const card = e.target.closest(".card");

        //oynatilacak sarkinin bilgilerini al
        const data = card.dataset;


        // player alanini tekrar renderla
        ui.renderPlayer(data);
    }

    
});



