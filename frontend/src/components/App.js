import React, { Component } from 'react';
//import logo from './logo.png';
import './App.css';
//import bgp from './bgp.png';
//import bgsandwich from '../HOME.png'
//import sandwich from '../sandwich.png'

import OrderMenu from './OrderMenu';
import OrderList from './OrderList';
  


class App extends Component {

  constructor(props) {
    super(props)
        this.state = {
          orders: []
        }
      };


 handleAddOrder = function(order){
  console.log("ADD ORDER:");
  console.log(order);
  // Add order

  // Update the orderlist display
}.bind(this);

handleNewOrder = function(order){
  console.log("NEW ORDER MADE:");
  console.log(order);


  // Create a new array based on current state:
  let orders = [...this.state.orders];

  // Add item to it
  orders.push(order);

  // Set state
  this.setState({ orders });


}.bind(this);

  


  render() {
    console.log("APP HOST: " + window._env_.API_HOST);
    return (
      <div className='outerContainer'>
        <div className='innerContainer'>
          <div className='header'>
            <h1>Welcome to Make Me A Sandwich</h1>
          </div>

          <div className='ordermenu-column'>
            <h6>Select a sandwich to order:</h6>
            <OrderMenu addOrder={this.handleAddOrder} orderMade={this.handleNewOrder}>
            </OrderMenu>
          </div>
          <div className='orderlist-column'>
            <h6>Your orders:</h6>
            <OrderList orders={this.state.orders}></OrderList>
          </div>
        </div>
      </div>
    );
  }

}

export default App;

