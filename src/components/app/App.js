import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";

import ReactTest from "../reactTest/ReactTest";


class App extends Component {
    state = { 
        selectedChar: null
    }

    onCharSelected =(id)=>{ 
        this.setState({
            selectedChar: id
        })
    }


    render() {
    const {selectedChar} = this.state
    return (
        <div className="app">
            <AppHeader/>
            <main>

                <ReactTest>
                    <p>Hello world!</p>
                    <p>My name Akhmed!</p>
                </ReactTest>

                <ErrorBoundaries>
                <RandomChar/>
                </ErrorBoundaries>
                <div className="char__content">
                    <CharList onCharSelected = {this.onCharSelected}/>
                    <ErrorBoundaries>
                    <CharInfo charId = {selectedChar}/>
                    </ErrorBoundaries>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    }
}


















// const App = () => {

    
    
//     return (
//         <div className="app">
//             <AppHeader/>
//             <main>
//                 <RandomChar/>
//                 <div className="char__content">
//                     <CharList/>
//                     <CharInfo/>
//                 </div>
//                 <img className="bg-decoration" src={decoration} alt="vision"/>
//             </main>
//         </div>
//     )
// }

export default App;