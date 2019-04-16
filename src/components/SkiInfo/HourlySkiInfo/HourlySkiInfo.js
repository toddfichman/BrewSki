import React, { Component } from 'react';
import { ListGroupItem, Collapse, Row, Col, Card, Button  } from 'reactstrap';
import Moment from 'react-moment';

import './HourlySkiInfo.css'

export default class HourlySkiInfo extends Component {

  state = {
    collapse: false
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    // console.log(this.props.day, 'hourly day')
    let hourlyTemp = [];
    for (let i = 0; i < this.props.day.hourly.length; i++) {
      hourlyTemp.push(this.props.day.hourly[i].bottom[0].tempF)
      console.log(hourlyTemp, 'hourly')
    }

    return (
      

        
      <ListGroupItem >
      <Button className="dropdown-btn" color="white" onClick={() => this.toggle()} >Breakdown{this.state.collapse ?  "-" : "+"}</Button>
        <Collapse isOpen={this.state.collapse} >
          <Card style={{border: 'none', color: "#757575"}}>
            <Row>
              <Col >Time</Col> <Col xs={6} className="hourly-temp">Temperature </Col>
            </Row>
              {this.props.day.hourly.map(hour => (
                <Row key={hour.time} className="hourly-container">
                  
                  <Col><Moment parse="hmm" format="hh:mm A">{hour.time}</Moment></Col> <Col xs={6} className="hourly-temp">{hour.bottom[0].tempF} °F --->  <img className="weather-img" src={hour.bottom[0].weatherIconUrl[0].value} alt="WEATHER" /> </Col> 
                </Row>
              ))}
          </Card>
        </Collapse>
    </ ListGroupItem>
      
    )
  }
}

