import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = ()=>{ 

   const [state, setState] = useState(null);

   let onCharSelected = (id)=>{ 
       setState(id)
   }

   return ( 
      <>
   <ErrorBoundaries>
         <RandomChar/>
   </ErrorBoundaries>
       <div className="char__content">
            <CharList onCharSelected = {onCharSelected}/>
                <ErrorBoundaries>
                    <CharInfo charId = {state}/>
                </ErrorBoundaries>
       </div>
    <img className="bg-decoration" src={decoration} alt="vision"/>
    
      </>
   )
}


export default MainPage;