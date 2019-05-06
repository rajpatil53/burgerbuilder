import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Cheese", type:"cheese"},
    {label:"Bacon", type:"bacon"},
    {label:"Meat", type:"meat"}
];

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current price: <strong>$ {props.price}</strong></p>
        {controls.map(ctr => {
            return <BuildControl
                label={ctr.label}
                key={ctr.label}
                added={() => props.ingredientAdded(ctr.type)}
                removed={() => props.ingredientRemoved(ctr.type)}
                disabled={props.disabled[ctr.type]}
            />
        })}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchase}
        >ORDER NOW</button>
    </div>
);

export default buildControls;