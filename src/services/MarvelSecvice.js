 

 class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if(!res.of) {
      throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource("https://gateway.marvel.com:443/v1/public/characters?apikey=ae2025a972cd33a6ea6a8bfbd4d0b723");

  }
 }

 export default MarvelService;