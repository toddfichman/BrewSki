import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, Pagination } from 'reactstrap';
import BreweryInfo from './BreweryInfo/BreweryInfo';

import './BeerInfo.css';

export default class BeerInfo extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: 1,
      breweriesPerPage: 15,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // state = {
  //   currentPage: 1,
  //   breweriesPerPage: 15,
  // }
  

  handleClick(event) {
    this.setState({currentPage: Number(event.target.id)});
  }

  render() {

    const { currentPage, breweriesPerPage } = this.state;
    const { stateBeerData, townBeerData } = this.props

    const indexOfLastTodo = currentPage * breweriesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - breweriesPerPage;
    const currentBreweries = stateBeerData.slice(indexOfFirstTodo, indexOfLastTodo);

    console.log(stateBeerData, 'it worked!')

    let localDisplay = (
      <h6 className="place-holder">
        Find Out What Breweries Are Local
      </h6>
    );

    let stateDisplay;

    if(townBeerData.length !== 0) {
        localDisplay = (
          <ListGroupItem>

          <ListGroupItemHeading>Breweries in Town</ListGroupItemHeading>

          <ListGroup flush>
            {townBeerData.map((localBrewery) => (
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

    if(stateBeerData.length !== 0) {
      // console.log(stateBeerData, 'BEER INFO')
      stateDisplay = (
        <ListGroupItem>

          <ListGroupItemHeading>Other Breweries Nearby</ListGroupItemHeading>

          <ListGroup flush>
            {currentBreweries.map((stateBrewery) => (
              
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

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stateBeerData.length / breweriesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="page-number" 
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <ListGroup flush>
        {localDisplay}
        {stateDisplay}
        <ListGroupItem style={{border: 'none'}}>

          <ul className="page-numbers" >
          
              <Pagination>
                {renderPageNumbers}
              </Pagination>

            
          </ul>
        </ListGroupItem>
      </ListGroup>
    )
  }
}
