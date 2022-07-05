import { useState , useCallback } from "react";


export const useHttp = ()=>{ 
   const [load , setLoad] = useState(false);
   const [error , setError] = useState(false);

      const request =  useCallback( async(url , method = 'GET' , body = null , headers = { 'Content-Type' : 'application/json'})=>{


         setLoad(true)

         try { 
            const responce = await fetch ( url , { method , body , headers});
            if (!responce.ok){ 
               throw new Error(`Could not fetch ${url} , status ${responce.status}`);
            }
            let data = await responce.json()

            setLoad(false)
            return data

         } catch(e){ 
            setLoad(false)
            setError(e.message)
            throw e;
         }

   } , [])

   const clearError = useCallback(()=> setError(null) , [])
   
   return { load , error , request , clearError }

}