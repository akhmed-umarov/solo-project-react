import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import decoration from '../../resources/img/vision.png';
import { Component } from "react";


///wht people don't used extend from them components , answer is simple , becouse in react we have all from easy use composition ( remake or add  components by using props ) почему не используют наследования а вместо него исопьзуется композиция , нам леге переделать объект добавии в него некоторые дополнительные пропсы или элементы для его специализации вместо того чтобы использовать наследование 



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