import { Component } from "react";
import ErrorTag from "../errorTag/ErrorTag";



class ErrorBoundaries extends Component { 

   state = { 
      error: false
   }
   
   // componentDidCatch(error , infEr) { 
   //    console.log(error);
   //    //we can change component state in this line but it's old method better use new method getDerivedStateFromError
   //    // this.setState({ 
   //    //    error: true
   //    // })
   // }

   static getDerivedStateFromError(error) { 
      //we can't used setState now we should return object 
      console.log(error);
      return { 
         error: true
      }
   }
   render() { 

      if (this.state.error) { 
         return (         
         <ErrorTag/>
         )
      }
      return ( 
         this.props.children
      )
      
   }
}


export default ErrorBoundaries;