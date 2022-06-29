import React from "react";
import PropTypes from "prop-types";


const ReactTest = (props) =>{ 

return ( 
   <div>
      {React.Children.map(props.children , (child)=>( 
         React.cloneElement(child , {className: `m-3 p-2 border` , style: {width: `200px` , color: props.color} })
      )   )}
   </div>
)
}


ReactTest.propTypes = { 
   children: PropTypes.node
}

ReactTest.defaultProps = { 
   color: `red`
}


export default ReactTest