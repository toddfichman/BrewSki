import React, { Component } from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  CardHeader
} from "reactstrap";
import Autocomplete from "react-google-autocomplete";

import { abbrState } from "./helpers/abbrToState";

import SkiInfo from "./components/SkiInfo/SkiInfo";
import BeerInfo from "./components/BeerInfo/BeerInfo";
import Footer from "./components/Footer/Footer";
import Spinner from './components/Spinner/Spinner';
import "./App.css";

import axios from "axios";

const google = window.google

require("dotenv").config();

//successfully accessing key
let skiKey = process.env.REACT_APP_SKI_API_KEY;

class App extends Component {
  state = {
    townAndState: "",
    townName: "",
    stateName: "",
    skiInfo: [],
    townBeerInfo: [],
    stateBeerInfo: [],
    nearbyBeerInfo: [],
    isLoading: false
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  // fetchDistanceData() {
  //   let origin = this.state.townName + "," + this.state.stateName;
  //   let stateBreweryInfo = this.state.stateBeerInfo
  //       //creates array of townnames and state
  //       let destinations = this.state.stateBeerInfo.map(brewery => {
  //         return brewery.city + ', ' + brewery.state
  //       })
        
  //       //Can only handle 25 destinations per
  //         //might need to call multiple times one after another
  //       var service = new google.maps.DistanceMatrixService();
  //       service.getDistanceMatrix(
  //         {
  //           origins: [origin],
  //           destinations: destinations,
  //           travelMode: "DRIVING",
  //           drivingOptions: {
  //             departureTime: new Date(Date.now()),  
  //             trafficModel: 'optimistic'
  //           },
  //         }, callback.bind(this));

  //         function callback(response, status) {
  //           let distances = response.rows[0].elements.map(town => {
  //             return town.distance.value
  //           })
  //           console.log(distances , 'QQQQQQQQQQQ')
  //           let counter = -1;
  //           stateBreweryInfo = stateBreweryInfo.map(brewery => {
  //             counter++
  //             return {
  //               ...brewery,
  //               distance: distances[counter]
  //             }
  //           })
            
  //           this.sortByKey(stateBreweryInfo, 'distance')
  //           this.setState({ nearbyBeerInfo: stateBreweryInfo, isLoading: false });
  //           console.log(this.state.nearbyBeerInfo, 'FINAL RESULT')
  //         }
  // }

  chunkify(a, n, balanced) {
    
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}

  handleAutoComplete(townAndState) {
    this.setState({isLoading: true});
    //getting skiInfo
    axios
      .get(
        `https://api.worldweatheronline.com/premium/v1/ski.ashx?key=${skiKey}&q=${townAndState}&num_of_days=7&format=json`
      )
      .then(response => {
        this.setState({ skiInfo: response.data });
        // console.log(this.state.skiInfo, "wtf");
      })
      .catch(error => {
        console.log(error);
      });

    let splitTownAndState = townAndState.split(",");
    let town = splitTownAndState[0];
    town = town.split(" ");
    let capitalizedTown = [];
    for (let i = 0; i < town.length; i++) {
      capitalizedTown.push(this.capitalizeFirstLetter(town[i]));
    }
    capitalizedTown = capitalizedTown.join(" ");

    let state = splitTownAndState[1].trim();
    if (state.length > 2) {
      //for if there is zip attached
      state = state[0] + state[1];
    }
    state = abbrState(state, "name");
    let capitalizedState = this.capitalizeFirstLetter(state);
    let townBreweryInfo = [];
    let stateBreweryInfo = [];

    //getting beerInfo
    axios
      .get(
        `https://api.openbrewerydb.org/breweries?by_state=${capitalizedState}&page=1&per_page=50&by_type=micro`
      )
      .then(response => {
        this.setState({ stateName: capitalizedState });
        this.setState({ townName: capitalizedTown });
        //filtering for breweries in searched town
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].city === capitalizedTown) {
            // console.log(response.data[i], 'local brew name')
            townBreweryInfo.push(response.data[i]);
          } else {
            stateBreweryInfo.push(response.data[i]);
          }
        }

        this.setState({ townBeerInfo: townBreweryInfo });


        let splitArray = this.chunkify(stateBreweryInfo, 2, true)
        // console.log(splitArray, 'splitArray ')
        let stateBreweryInfo1 = splitArray[0];
        let stateBreweryInfo2 = splitArray[1];
        // console.log(stateBreweryInfo1, stateBreweryInfo2, 'HALF TIME')

        // console.log(this.state.stateBeerInfo, 'Pre TIME')
        // let destinations = this.state.stateBeerInfo.map(brewery => {
        //   return brewery.city + ', ' + brewery.state
        // })
        let origin = capitalizedTown + "," + capitalizedState;

        let destinations1 = stateBreweryInfo1.map(brewery => {
          return brewery.city + ', ' + brewery.state
        })
        let destinations2 = stateBreweryInfo2.map(brewery => {
          return brewery.city + ', ' + brewery.state
        })
        // console.log(destinations1, 'DESINATIONS')
        
        //Can only handle 25 destinations per
          //might need to call multiple times one after another
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: destinations1,
            travelMode: "DRIVING",
            drivingOptions: {
              departureTime: new Date(Date.now()),  
              trafficModel: 'optimistic'
            },
          },callback.bind(this));

          function callback(response, status) {
            let distances = response.rows[0].elements.map(town => {
              return town.distance.value
            })
            let counter = -1;
            stateBreweryInfo1 = stateBreweryInfo1.map(brewery => {
              counter++
              return {
                ...brewery,
                distance: distances[counter]
              }
            })
            
            // console.log(this.state.nearbyBeerInfo, '1/2 FINAL RESULT')
          }

          //getting distance data with 2nd call
          service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: destinations2,
            travelMode: "DRIVING",
            drivingOptions: {
              departureTime: new Date(Date.now()),  
              trafficModel: 'optimistic'
            },
          },callback2.bind(this));

          function callback2(response, status) {
            let distances = response.rows[0].elements.map(town => {
              return town.distance.value
            })
            // console.log(distances , 'QQQQQQQQQQQ')
            let counter = -1;
            stateBreweryInfo2 = stateBreweryInfo2.map(brewery => {
              counter++
              return {
                ...brewery,
                distance: distances[counter]
              }
            })
            let allstateBreweryInfo = stateBreweryInfo1.concat(stateBreweryInfo2)
            
            this.sortByKey(allstateBreweryInfo, 'distance')
            this.setState({ nearbyBeerInfo: allstateBreweryInfo, isLoading: false });
            // console.log(this.state.nearbyBeerInfo, '2/2 FINAL RESULT')
          }
      })
      .catch(error => {
        console.log(error);
      });
  }

  

  render() {
    
    let skiHeader = this.state.townName ? (
      <h4>
        Ski Report For {this.state.townName}, {this.state.stateName}
      </h4>
    ) : (
      <h4>Ski Report For...</h4>
    );

    let beerHeader = this.state.townName ? (
      <h4>
        Local Beer Report For {this.state.townName}, {this.state.stateName}
      </h4>
    ) : (
      <h4>Local Beer Report For...</h4>
    );

    let content = <Spinner />

    if (!this.state.isLoading) {
      content = (
        <Container fluid className="ski-and-beer">
          <Row>
            <Col xs={12} sm={6}>
              <CardHeader style={{ backgroundColor: "#FFF" }}>
                {skiHeader}
              </CardHeader>
              <SkiInfo skiData={this.state.skiInfo} />
            </Col>

            <Col xs={12} sm={6}>
              <CardHeader style={{ backgroundColor: "#FFF" }}>
                {beerHeader}
              </CardHeader>
              <BeerInfo
                stateBeerData={this.state.nearbyBeerInfo}
                townBeerData={this.state.townBeerInfo}
                townName={this.state.townName}
                stateName={this.state.stateName}
              />
            </Col>
          </Row>
        </Container>
      )
    }

    return (
      <div className="app">
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">BrewSki</h1>
            <p
              className="lead"
              style={{ color: "#757575", fontWeight: "normal" }}
            >
              Ski And Drink Local
            </p>
          </Container>
        </Jumbotron>

        <Container fluid className="search">
          <Row>
            <Col className="search-container">
              <Form>
                <FormGroup>
                  <Label for="exampleSearch">Search By Town Of Resort</Label>

                  <Autocomplete
                    className="auto-complete"
                    onPlaceSelected={place => {
                      this.setState({ townAndState: place.formatted_address });
                      // console.log(this.state.townAndState, "lol");
                      this.handleAutoComplete(this.state.townAndState);
                    }}
                    types={["(regions)"]}
                    componentRestrictions={{ country: "us" }}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>

        {content}

        <Footer />
      </div>
    );
  }
}

export default App;
