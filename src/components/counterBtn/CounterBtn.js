import { Component } from "react";



class Counter extends Component { 
   state = {
      counter: 0
   }


   counterPlus = () =>{ 
      this.setState(({counter})=>({
         counter: counter +1 
      }))
   }


   render() { 
      const {counter } = this.state
      return ( 
         <div>
            <button onClick={this.counterPlus}>Click mi</button>
            {this.props.render(counter)}
         </div>
      )
   }
}


const Message = ({counter})=>{ 
   return ( 
      <p>Text number {counter}</p>
   )
}


export {Message}; 
export default Counter;