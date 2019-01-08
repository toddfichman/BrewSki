import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import BreweryInfo from './BreweryInfo/BreweryInfo';

export default class BeerInfo extends Component {

  render() {

    let localDisplay = (
      <h6 className="place-holder">
        Find Out What Breweries Are Local
      </h6>
    );

    let stateDisplay;

    if(this.props.townBeerData.length !== 0) {
        localDisplay = (
          <ListGroupItem>

          <ListGroupItemHeading>Breweries in Town</ListGroupItemHeading>

          <ListGroup flush>
            {this.props.townBeerData.map((localBrewery) => (
              <BreweryInfo 
                name={localBrewery.name}
                key={localBrewery.id}
                street={localBrewery.street}
                town={this.props.townName}
                state={localBrewery.state}
                phone={localBrewery.phone}
                website={localBrewery.website_url}/>
            ))}
          </ListGroup>
          </ListGroupItem>
        )
      }
        else if (this.props.townName) {
        localDisplay = (
          <ListGroupItem>
            <ListGroupItemHeading>No Breweries in {this.props.townName}, {this.props.stateName}</ListGroupItemHeading>
          </ListGroupItem>
        )
      }

    if(this.props.stateBeerData.length !== 0) {
      stateDisplay = (
        <ListGroupItem>

          <ListGroupItemHeading>Breweries in State</ListGroupItemHeading>

          <ListGroup flush>
            {this.props.stateBeerData.map((stateBrewery) => (
              <BreweryInfo 
              name={stateBrewery.name}
              key={stateBrewery.id}
              street={stateBrewery.street}
              town={stateBrewery.city}
              state={stateBrewery.state}
              phone={stateBrewery.phone}
              website={stateBrewery.website_url}/>
            ))}
          </ListGroup>

        </ListGroupItem>
      )
    }

    return (
      <ListGroup flush>
        {localDisplay}
        {stateDisplay}
      </ListGroup>
    )
  }
}
