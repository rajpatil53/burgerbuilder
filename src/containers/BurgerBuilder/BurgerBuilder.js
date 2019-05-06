import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.6,
    cheese: 1,
    meat: 1.5,
    bacon: 1.5
};

class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        showSpinner: false
    };

    componentDidMount(){
        console.log(this.props);
        axios.get('https://react-burger-2a0ec.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err =>{
               console.log(err)
            });
    }

    updatePurchasable = (ingredients) => {
      const sum = Object.keys(ingredients)
          .map((key) =>{
              return ingredients[key]
          })
          .reduce((sum, el) =>{
              return sum + el;
        },0);

        return sum > 0
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type]<=0){
            return;
        }
        const updatedCount = this.state.ingredients[type]-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchasable(updatedIngredients);
    };

    updatePurchase = () => {
        this.setState({purchasing:true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    };

    purchaseContinueHandler = () => {
        //alert('You continue');
        // this.setState({showSpinner: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Raj Patil',
        //         address: 'address',
        //         email: 'test@test.com',
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({showSpinner: false});
        //         this.setState({purchasing:false});
        //     })
        //     .catch(err => {
        //         this.setState({showSpinner: false});
        //         this.setState({purchasing:false});
        //     })
        const queryParams = [];
        for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });
    };

    render(){
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }



        let orderSummary=null;
        let burger = <Spinner/>;

        if(this.props.ings){
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                    price={this.props.price.toFixed(2)}
                />
            );
            burger =(
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.OnIngredientAdded}
                        ingredientRemoved={this.props.OnIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price.toFixed(2)}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        purchase={this.updatePurchase}
                    />
                </>
            );
        }
        if(this.state.showSpinner){
            orderSummary = <Spinner/>;
        }

        return(
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        OnIngredientAdded: (ing) => {dispatch({type: actionTypes.ADD_INGREGIENT, ingredient: ing})},
        OnIngredientRemoved: (ing) => {dispatch({type: actionTypes.REMOVE_INGREGIENT, ingredient: ing})}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);