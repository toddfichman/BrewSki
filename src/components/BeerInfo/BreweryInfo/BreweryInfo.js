import React, { Component } from 'react';
import { ListGroupItem, Collapse, CardText, Card, Button } from 'reactstrap';
import Linkify from 'react-linkify';
import NumberFormat from 'react-number-format';

export default class BreweryInfo extends Component {

  state = {
    collapse: false
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <ListGroupItem >
        <Button color="white" onClick={() => this.toggle()} style={{ marginBottom: '1rem', padding: '0', color: 'gray', fontWeight: '700', width: '100%' }}>{this.props.name}{this.state.collapse ? "  " + "-" : " " + "+"}</Button>
          <Collapse isOpen={this.state.collapse} >
            <Card style={{border: 'none'}}>
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
