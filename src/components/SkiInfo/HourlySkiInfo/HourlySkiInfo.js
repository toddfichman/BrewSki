import React, { Component } from 'react';
import { ListGroupItem, ListGroup, ListGroupItemText, Collapse, CardText, Card, Button  } from 'reactstrap';

export default class HourlySkiInfo extends Component {

  state = {
    collapse: false
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    let day = this.props.day
    console.log(this.props.day)

    //PASSING DOWN EACH DAY INDIVDUALY
    //NEED TO SEND BACK A COLLAPSABLE CARD FOR EACH DAY
      //EACH DAY DISPLAYS ALL THE HOURS FOR THAT ONE DAY ONLY

    return (
      

        
        <div></div>
      
    )
  }
}

