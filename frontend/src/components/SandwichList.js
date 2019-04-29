import React from 'react';
import axios from 'axios';

import sandwichPNG from './sandwich.png';
import './SandwichList.css';

export default class SandwichList extends React.Component {
    state = {
        sandwiches : [],
    };
    
    handleOrder = function(sandwich){
        var order = { 
            sandwichId: sandwich.id,
            id: 0,
            status: "received"
        };

        this.props.addOrder(order);
        axios.post('/v1/order/', order).then(res => {
            console.log("new order made: " + res.data);
            //Update order state on order list as in queue or whatever status was received
            var item = res.data;
            item.sandwich = sandwich;
            this.props.orderMade(item);

            //Display the order status

        })
        .catch(e => {
            //Update order state as failed
            console.log("ERROR: " + e);
        });
    };

    componentDidMount(){
        console.log("RENDER SANDWICH LIST");
        console.log('/v1/sandwich/');

        axios.get('/v1/sandwich/').then(res => {
            console.log("RECEIVED API: " + res.data);
            this.setState({ sandwiches: res.data });
        })
        .catch(err => {
            console.log("Error connecting with api: " + err);
        });
    }

    render() {
        return(
            <div>
                <ul className="sandwichList">
                    {
                        this.state.sandwiches.length > 0
                        ? (
                            null
                        )
                        :(
                            <p>Sorry, no sandwiches available ;(</p>
                        )
                    }
                    {this.state.sandwiches.map(sandwich => 
                        <li className="sandwichItem" key={sandwich.id}><button onClick={() => this.handleOrder(sandwich)}><img src={sandwichPNG}></img>{sandwich.name}</button></li>
                    )}
                </ul>
            </div>
            
        );
    }
}