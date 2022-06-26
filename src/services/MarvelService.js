
class MarvelService { 
   //нельзя менять если начинается с лодыша (нижнее подчеркивание) , формально для других программис
   _apiBase = `https://gateway.marvel.com:443/v1/public/`;
   _apiKey = `apikey=27c482231617c13cab6f9222965acb80`

   getResourse = async (url) =>{ 
      let res = await fetch(url)
      if (!res.ok){ 
         throw new Error (`Coult nod fetch ${url}, status: ${res.status}`)
      }
      return await res.json()
      // let data = await res.json()
      // return data
   }
   getAllCharacters = async ()=>{ 
      let res = await this.getResourse(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=260&apikey=27c482231617c13cab6f9222965acb80`);
      


      // return res.data.results.map(this.__transformCharacter);  
      
      
      return res.data.results;
   }

   // https://gateway.marvel.com:443/v1/public/characters/1011186?apikey=27c482231617c13cab6f9222965acb80, status: 429


   getCharacter = async (id)=>{ 
      // return this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
      let data = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this.__transformCharacter(data.data.results[0])
   }
   
   __transformCharacter = (char)=>{ 
   return { 
      //opt
      name: char.name, 
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wikipage: char.urls[1].url
   }
   }

}




export default MarvelService













// const PostData = async (url , data) => { 
//    let res = await fetch(url , { 
//    method: 'POST', 
//    body: data, 
//    headers: { 
//       "Content-Type" : "application/json"
//    }})
//    return await res.json();
// }


// async function GetZap(url) { 
//    let res = await fetch (url)
//    if (!res.ok){ 
//       throw new Error (`Your not fetch ${url}, status: ${res.status}`)
//    }
//    return await res.json()
// }
