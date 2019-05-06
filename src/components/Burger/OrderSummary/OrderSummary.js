import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{textTransform: "capitalize"}}>{key}</span>: {props.ingredients[key]}
            </li>
        });
  return(
      <>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p><strong>Total price: ${props.price}</strong></p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
          <Button btnType="Success" clicked={props.continue}>Continue</Button>
      </>
  );
};

export default orderSummary;