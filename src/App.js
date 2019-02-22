import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col, Form, FormGroup, Input, InputGroupAddon, InputGroup, Button, Label, CardHeader } from 'reactstrap';
import Autocomplete from "react-google-autocomplete";

import { abbrState } from './helpers/abbrToState';

import SkiInfo from './components/SkiInfo/SkiInfo';
import BeerInfo from './components/BeerInfo/BeerInfo';
import Footer from './components/Footer/Footer';
import './App.css';

import axios from 'axios';

require('dotenv').config();

//successfully accessing key
let skiKey = process.env.REACT_APP_SKI_API_KEY

class App extends Component {

  state = {
    townAndState: '',
    townName: '',
    stateName: '',
    skiInfo: [],
    townBeerInfo: [],
    stateBeerInfo: [],
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  handleAutoComplete(townAndState) {

    //getting skiInfo
    axios.get(`https://api.worldweatheronline.com/premium/v1/ski.ashx?key=${skiKey}&q=${townAndState}&num_of_days=7&format=json`)
      .then(response => {
        this.setState({ skiInfo: response.data })
        console.log(this.state.skiInfo, 'wtf')
      })
      .catch(error => {
        console.log(error)
      })


      let splitTownAndState = townAndState.split(',');
      let town = splitTownAndState[0];
      town = town.split(' ');
      let capitalizedTown = [];
      for (let i = 0; i < town.length; i++) {
        capitalizedTown.push(this.capitalizeFirstLetter(town[i]));
      }
      capitalizedTown = capitalizedTown.join(' ');
      
  
      let state = splitTownAndState[1].trim();
      if(state.length > 2) { //for if there is zip attached
        state = state[0] + state[1];
      }
      state = abbrState(state, 'name')
      let capitalizedState = this.capitalizeFirstLetter(state);
      let townBreweryInfo = [];
      let stateBreweryInfo = [];
      
      //getting beerInfo
      axios.get(`https://api.openbrewerydb.org/breweries?by_state=${capitalizedState}&page=1&per_page=50&by_type=micro`)
      .then(response => {
        this.setState({ stateName: capitalizedState });
        this.setState({ townName: capitalizedTown }); 
        //filtering for breweries in searched town
        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].city === capitalizedTown) {
            // console.log(response.data[i], 'local brew name')
            townBreweryInfo.push(response.data[i])
          } else {
            stateBreweryInfo.push(response.data[i])
          }
        }
        this.setState({ townBeerInfo: townBreweryInfo });
        this.setState({ stateBeerInfo: stateBreweryInfo });
        // console.log(this.state.stateBeerInfo, 'state beer');
      })
      .catch(error => {
        console.log(error)
      });
  }


  render() {

    let skiHeader = this.state.townName? <h4>Ski Report For {this.state.townName}, {this.state.stateName}</h4> : <h4>Ski Report For...</h4>

    let beerHeader = this.state.townName ? <h4>Local Beer Report For {this.state.townName}, {this.state.stateName}</h4> : <h4>Local Beer Report For...</h4>

    return (
      <div className="app">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">BrewSki</h1>
            <p className="lead" style={{color: '#757575', fontWeight: 'normal'}}>Ski And Drink Local</p>
          </Container>
        </Jumbotron>


        <Container fluid className="search">

          <Row>
            <Col className="search-container">
             
              <Form >
              <FormGroup>
                <Label for="exampleSearch">Search By Town Of Resort</Label>
                
                <Autocomplete
                className="auto-complete"
                onPlaceSelected={place => {
                  this.setState({townAndState: place.formatted_address})
                  console.log(this.state.townAndState, 'lol');
                  this.handleAutoComplete(this.state.townAndState)
                }}
                types={["(regions)"]}
                componentRestrictions={{ country: "us" }}
              />
              </FormGroup>
              </Form>
            </Col>
          </Row>

        </Container>

        <Container fluid className="ski-and-beer">

          <Row>
            <Col xs={12} sm={6}>

              <CardHeader style={{ backgroundColor: '#FFF' }}>{skiHeader}</CardHeader>
              <SkiInfo 
                skiData={this.state.skiInfo}/>

            </Col>

            <Col xs={12} sm={6}>
 
                <CardHeader style={{ backgroundColor: '#FFF' }}>{beerHeader}</CardHeader>
                <BeerInfo 
                  stateBeerData={this.state.stateBeerInfo}
                  townBeerData={this.state.townBeerInfo}
                  townName={this.state.townName}
                  stateName={this.state.stateName}/>
      
            </Col>
          </Row>

        </Container>

      <Footer />

      </div>
    );
  }
}

export default App;
