import React from "react";
import PropTypes from "prop-types";




const ReactTestChildren =(props)=>{ 
   return ( 
      



      //first method add components
      // <div>
      // {props.children}
      // </div>


      // Second method add child component
      // React.Children.map(props.children , child =>{ 
      //    return React.cloneElement(child, {className: `m-2 p-2 border`})      
      // })
      //dont forgot this method you can used if your child  not it's Fragment becose Fragment it's one component and you can affect map method only from array


      //third method
      //pass your component from props and use this as usual
      <div>
         {props.left}
         {props.right}
      </div>

   )
}


ReactTestChildren.propTypes = { 
   left: PropTypes.object, 
   right: PropTypes.object.isRequired
}

ReactTestChildren.defaultProps = { 
   left: <div>default left prop</div>, 
   right: <div>default right prop</div>
}

export default ReactTestChildren; 