
//api url'si
const url =
    'https://shazam.p.rapidapi.com/search?term=ati242&locale=tr';

//api ye gonderilmesi gerken headerlar
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '01cda5f971msh8c1f7493277eb41p1cfe1ejsn221f351a9f55',
    'x-rapidapi-host': 'shazam.p.rapidapi.com'
  }
};

// fonskiyonlarin birarada tutulmasi icin class yapisini tercih edelim
export default class API {
    //populer muzikler getirecek
    async getPopuler() {
        const data1 = await this.searchMusic("ati242");
        const data2 = await this.searchMusic("emre fel");
        return [...data1, ...data2];
    }

    //aratilan kelimeyte uygun sonuclari getirecek
    async searchMusic(query) {
        //term paramtresini dinamik olarak belirledik
        const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

        //api istegini at - gelen cevabi isle
        const res = await fetch(url, options);
        const data = await res.json();

        //api'den gelen cevabi daha iyi bir formata cevirdik
        const formatted = data.tracks.hits.map((item) => item.track);

        //fonskiyonun cagirildigi yerde return et
        return formatted;
    }
}