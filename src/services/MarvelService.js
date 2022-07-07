import { useHttp } from '../components/hooks/http.hooks';

const useMarvelService =()=> { 

 const {load , error , request , clearError} = useHttp()

 const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
 const _apiKey = `apikey=27c482231617c13cab6f9222965acb80`;
 const _offset = 260; 

   const getAllCharacters = async (offset=_offset)=>{ 
      let res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);      
      return res.data.results;
   }

   const getCharacter = async (id)=>{ 
      let res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return __transformCharacter(res.data.results[0])
   }

   const getAllComics = async (offset)=>{ 
   let res = await request(`${_apiBase}comics?orderBy=title&limit=8&offset=${offset}&${_apiKey}`);
     return res.data.results
   }

   const getComic = async (id)=>{ 
      let res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=27c482231617c13cab6f9222965acb80`)
      return _transformComics(res.data.results[0])
   }

   const __transformCharacter = (char)=>{ 
      return { 
         name: char.name, 
         description: char.description,
         thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
         homepage: char.urls[0].url,
         wikipage: char.urls[1].url,
         comicsData: char.comics
      }}

   const _transformComics = (comics) => {
         return {
             id: comics.id,
             title: comics.title,
             description: comics.description || 'There is no description',
             pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
             thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
             language: comics.textObjects.language || 'en-us',
             price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
         }
   }

      
      return {load , error, getAllCharacters , getCharacter , clearError , getAllComics , getComic}
   }


export default useMarvelService 