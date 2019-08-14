import React, { Component } from "react";
import { ListGroup, Pagination } from "reactstrap";
import BreweryInfo from "./BreweryInfo/BreweryInfo";

import "./BeerInfo.css";

export default class BeerInfo extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      breweriesPerPage: 15
    };
    this.handleClick = this.handleClick.bind(this);
    this.newPage = React.createRef();
  }

  handleClick(event) {
    this.setState({ currentPage: Number(event.target.id) });
    if (this.newPage.current) {
      this.newPage.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  render() {
    const { currentPage, breweriesPerPage } = this.state;
    const { stateBeerData, townBeerData } = this.props;

    const indexOfLastTodo = currentPage * breweriesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - breweriesPerPage;
    const currentBreweries = stateBeerData.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    let localDisplay = (
      <h6 className="place-holder">Find Out What Breweries Are Local</h6>
    );

    let stateDisplay;

    if (townBeerData.length !== 0) {
      localDisplay = (
        <div className="brewery-list-group">
          <div className="brewery-header">Breweries in Town</div>

          <ListGroup flush>
            {townBeerData.map(localBrewery => (
              <BreweryInfo
                name={localBrewery.name}
                key={localBrewery.id}
                street={localBrewery.street}
                town={this.props.townName}
                state={localBrewery.state}
                phone={localBrewery.phone}
                website={localBrewery.website_url}
              />
            ))}
          </ListGroup>
        </div>
      );
    } else if (this.props.townName) {
      localDisplay = (
        <div>
          <div className="brewery-header">
            No Breweries in {this.props.townName}, {this.props.stateName}
          </div>
        </div>
      );
    }

    if (stateBeerData.length !== 0) {
      stateDisplay = (
        <div className="brewery-list-group">
          <div ref={this.newPage} className="brewery-header">
            Other Breweries Nearby
          </div>

          <ListGroup flush>
            {currentBreweries.map(stateBrewery => (
              <BreweryInfo
                name={stateBrewery.name}
                key={stateBrewery.id}
                distance={stateBrewery.distance}
                street={stateBrewery.street}
                town={stateBrewery.city}
                state={stateBrewery.state}
                phone={stateBrewery.phone}
                website={stateBrewery.website_url}
              />
            ))}
          </ListGroup>
        </div>
      );
    }

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(stateBeerData.length / breweriesPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="page-number"
          key={number}
          id={number}
          onClick={event => {
            this.handleClick(event);
          }}
        >
          {number}
        </li>
      );
    });

    let pages;

    if (stateBeerData.length !== 0) {
      pages = (
        <ul className="page-numbers">
          <Pagination>{renderPageNumbers}</Pagination>
        </ul>
      );
    }

    return (
      <ListGroup flush>
        {localDisplay}
        {stateDisplay}
        <div className="page-container" style={{ border: "none" }}>
          {pages}
        </div>
      </ListGroup>
    );
  }
}
