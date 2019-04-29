import React from 'react';
import axios from 'axios';

import './OrderList.css';

export default class OrderList extends React.Component {

    constructor(props) {
    super(props)
        this.state = {
          orders: []
        }
    }

    componentWillReceiveProps(props) {
    this.setState({ orders: props.orders })
    }

    componentDidMount(){
        console.log("RENDER ORDER LIST");
        this.interval = setInterval(() => {
            this.state.orders.forEach(function(order, index){
                if(order.status != "received" && order.status != "ready" && order.status != "failed"){
                    axios.get('/v1/order/' + order.id).then(res =>{
                        if(order.id != res.data.id){
                            console.log("Warning: Wrong id received from API")
                        }
                        else if(order.id == res.data.id && this[index].status !== res.data.status){
                            console.log("Update order status: " + order.status + " -> "+ res.data.status);
                            this[index].status = res.data.status;
                            
                        }
                        
                    })
                    .catch(err => {
                        console.log("Error: " + err);
                        order.status = "failed;"
                    });
                }
            }, this.state.orders);
            
        this.setState({orders: this.state.orders});
        }, 5000);  

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }    

    render() {
        
        return(

                <ol className="orderList">
                {
                    this.state.orders.length > 0
                    ? (
                        null
                    )
                    :(
                        <p>No orders made</p>
                    )
                }
                    {this.state.orders.map(order =>
                        <li className="orderItem" key={order.id}>Sandwich: {order.sandwich.name}, status: {order.status}</li>
                    )}
                </ol>
            

         
        );
    }
}