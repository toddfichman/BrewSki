import React, { Component } from 'react';
import { ListGroupItem, ListGroup, ListGroupItemText, Collapse, CardText, Card, Button  } from 'reactstrap';
import Moment from 'react-moment';

export default class HourlySkiInfo extends Component {

  state = {
    collapse: false
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  addLetter(date) {
    return typeof(date);
  }

  render() {
    let day = this.props.day
    console.log(this.props.day, 'hourly day')

    //PASSING DOWN EACH DAY INDIVDUALY
    //NEED TO SEND BACK A COLLAPSABLE CARD FOR EACH DAY
      //EACH DAY DISPLAYS ALL THE HOURS FOR THAT ONE DAY ONLY

    return (
      

        
      <ListGroupItem >
      <Button color="white" onClick={() => this.toggle()} style={{ marginBottom: '1rem', padding: '0', color: 'white', fontWeight: '700', width: "100%", backgroundColor: "#92C0DB" }}>Hourly Breakdown{this.state.collapse ? "  " + "-" : " " + "+"}</Button>
        <Collapse isOpen={this.state.collapse} >
          <Card style={{border: 'none'}}>
            {/* <CardText> */}
              {this.props.day.hourly.map(hour => (
                <div key={hour.time}>
                  <Moment parse="hmm" format="hh:mm A">{hour.time} Hey </Moment><span>{hour.bottom[0].tempF}</span>
                </div>
              ))}
            {/* </CardText> */}
          </Card>
        </Collapse>
    </ ListGroupItem>
      
    )
  }
}

