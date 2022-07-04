import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";

const App = ()=>{ 

    const [state, setState] = useState(null);


    let onCharSelected = (id)=>{ 
        setState(id)
    }
    return ( 
        <div className="app">
        <AppHeader/>
        <main>
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
        </main>
        </div>
    )
}




export default App;