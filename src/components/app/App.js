import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";



import ReactTestChildren from "../reactTestChilden/ReactTestChildren";


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


            <ReactTestChildren left = {<div><p>Kak tvoi dela</p></div>}
                               right= {<div><p>Normal`no tvoi kak</p></div>}> 
                               <div>
                                <p>Kak tvoi dela</p>
                               </div>
                                <div>
                                <p>Normalno</p>
                               </div>
            </ReactTestChildren>


            <AppHeader/>
            <main>
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