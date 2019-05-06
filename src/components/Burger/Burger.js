import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) =>{
    let TransformedIngredients = Object.keys(props.ingredients)
        .map(IgKey => {
            return [...Array(props.ingredients[IgKey])].map((_,index) => {
                return <BurgerIngredient key={IgKey+index} type={IgKey}/>
            })
        })
        .reduce((arr, ele) => {
            return arr.concat(ele)
        },[]);

    if(TransformedIngredients.length===0){
        TransformedIngredients = <p>Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {TransformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;