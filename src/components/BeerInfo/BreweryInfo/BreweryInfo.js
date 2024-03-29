import React, { Component } from 'react';
import {  Collapse, CardText, Card, Button, ListGroupItem } from 'reactstrap';
import Linkify from 'react-linkify';
import NumberFormat from 'react-number-format';

import '../../SkiInfo/HourlySkiInfo/HourlySkiInfo.css'
import '../BeerInfo.css'
export default class BreweryInfo extends Component {

  state = {
    collapse: false
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <ListGroupItem style={{borderRadius: '10px'}} className="list-item brewery-card">
        <Button className="dropdown-btn" onClick={() => this.toggle()} >{this.props.name}<span className='dropdown-btn-signal-brewery'>{this.state.collapse ?  "-" :  "+"}</span></Button>
          <Collapse isOpen={this.state.collapse} >
            <Card style={{border: 'none'}}>
            <CardText className="brewery-distance">
                {this.props.distance ?<span> {(this.props.distance * 0.000621371).toFixed(1) + ' Miles Away' }</span>: null}
              </CardText>
              <CardText>
                <span role="img" aria-label="pin">📍</span> <a href={`http://maps.google.com/?q=${this.props.name}`} target="_blank" rel="noopener noreferrer">{this.props.street ? this.props.street+',' : null} {this.props.town ? this.props.town+',' : null} {this.props.state}</a>
              </CardText>
              <CardText>
                <span role="img" aria-label="phone">📞</span> {this.props.phone ? <NumberFormat value={this.props.phone} format="+1 (###) ###-####" displayType={'text'} /> : 'No number provided'} 
              </CardText>
              <CardText>
                <span role="img" aria-label="computer">🖥</span> {this.props.website ? <Linkify properties={{target: '_blank'}}>{this.props.website}</Linkify> : 'No website provided'}
              </CardText>
            </Card>
          </Collapse>
      </ ListGroupItem>
    )
  }
}
