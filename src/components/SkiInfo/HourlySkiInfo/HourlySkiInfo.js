import React, { Component } from 'react';
import { ListGroupItem, ListGroup, ListGroupItemText, Collapse, Row, Col, Card, Button  } from 'reactstrap';
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
            <Row>
              <Col>Time</Col> <Col xs={6} className="hourly-temp">Temperature </Col><Col>PIC</Col>
            </Row>
              {this.props.day.hourly.map(hour => (
                <Row key={hour.time} className="hourly-container">
                  
                  <Col><Moment parse="hmm" format="hh:mm A">{hour.time}</Moment></Col> <Col xs={6} className="hourly-temp">{hour.bottom[0].tempF} °F ---> <span>{hour.bottom[0].weatherDesc[0].value}</span> </Col> <Col><img src={hour.bottom[0].weatherIconUrl[0].value} alt="WEATHER"/></Col>
                </Row>
              ))}
            {/* </CardText> */}
          </Card>
        </Collapse>
    </ ListGroupItem>
      
    )
  }
}

