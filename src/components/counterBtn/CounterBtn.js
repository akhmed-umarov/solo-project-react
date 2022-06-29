import { Component } from "react";
import PropType from "prop-types";


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
      const { counter } = this.state
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

Message.propType = { 
   counter: PropType.number
}

Message.defaultProps = { 
   counter: 0, 
   color: `red`
}

export {Message}; 
export default Counter;