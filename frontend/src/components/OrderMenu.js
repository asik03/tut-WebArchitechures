import React from 'react';
import SandwichList from './SandwichList';

export default class OrderMenu extends React.Component {

    constructor(props) {
    super(props)
        this.state = {
          showMenu: false,
        }
    }

    componentDidMount(){ 

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    } 

    showMenu = function(){
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
    }.bind(this);
    
    closeMenu = function() {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
    }.bind(this);


    render() {
        
        return(
            <div>
            <button onClick={this.showMenu}>Make an order</button>
            {
                this.state.showMenu
                ? (
                    <SandwichList addOrder={this.props.addOrder} orderMade={this.props.orderMade} >
                    </SandwichList>
                )
                : (
                    null
                )
            }
                
            </div>

         
        );
    }
}