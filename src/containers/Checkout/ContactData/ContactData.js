import React,{ Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType: "input",
                elementConfig:{
                    type:"text",
                    placeholder:"Name",
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address:{
                elementType: "input",
                elementConfig:{
                    type:"text",
                    placeholder:"Address",
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig:{
                    type:"email",
                    placeholder:"Email",
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig:{
                    options:[
                        {value:"fastest", displayValue:"Fastest"},
                        {value:"cheapest", displayValue:"Cheapest"}
                    ]
                },
                value:'',
                validation:{},
                valid: true
            }
        },
        loading: false,
        isFormValid:false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementId in this.state.orderForm){
            formData[formElementId]= this.state.orderForm[formElementId].value
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props._price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
            })
    };

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim()!=="" && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputId]=updatedFormElement;
        let formIsValid = true;
        for (let inputId in updatedOrderForm){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm:updatedOrderForm,isFormValid:formIsValid});
    };

    render(){
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=>this.inputChangeHandler(event, formElement.id)}
                        />
                    ))
                }
                <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your data:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        _price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);