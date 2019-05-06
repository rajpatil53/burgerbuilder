import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
    return(
        <div style={{textAlign:"center"}}>
            <h1>Your Burger looks good!</h1>
            <div style={{width:"100%",margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
};

export default checkoutSummary;