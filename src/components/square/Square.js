import React from 'react';

const Square = (props) => {
 const {keyInx,ClassSquare,value,click} = props;
  return( 
    <button type="button" key={keyInx}  className={ClassSquare}  onClick={click} >
     {value}
   </button> 
 );
}
  export default Square;