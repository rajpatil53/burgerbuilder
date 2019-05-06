import React, {Component} from 'react'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component{
    state={
        orders: [],
        loading: true
    };

    componentDidMount(){
        axios.get('/orders.json')
            .then((res)=>{
                const fetchedData=[];
                for(let key in res.data){
                    fetchedData.push(
                        {
                            ...res.data[key],
                            id: key
                        }
                    )
                }
                this.setState({loading:false,orders:fetchedData});
            })
    }

    render(){
        return(
            <div>
                {
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ))
                }
            </div>
        )
    }
}

export default Orders;