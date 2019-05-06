import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.6,
    cheese: 1,
    meat: 1.5,
    bacon: 1.5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREGIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            };
        case actionTypes.REMOVE_INGREGIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            };

        default:
            return state;
    }
};

export default reducer;