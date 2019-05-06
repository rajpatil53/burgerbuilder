import React from 'react'

import classes from './Order.module.css'

const orders = (props) => {
    let ingredients=[]

    for(let ingredient in props.ingredients){
        ingredients.push({
            name:ingredient,
            amount:props.ingredients[ingredient]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',border:'1px solid #ccc',padding:'5px'}}>{ig.name}({ig.amount})</span>;
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: USD {props.price.toFixed(2)}</p>
        </div>
    );

};

export default orders;