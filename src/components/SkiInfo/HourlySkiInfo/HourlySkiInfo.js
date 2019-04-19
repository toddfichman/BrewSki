import React, { Component } from "react";
import { ListGroupItem, Collapse, Row, Col, Card, Button } from "reactstrap";
// import Moment from "react-moment";
import { Line } from "react-chartjs-2";

import "./HourlySkiInfo.css";

export default class HourlySkiInfo extends Component {
  state = {
    collapse: false
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    // console.log(this.props.day, "hourly day");
    let hourlyTemp = [];
    let hourlyDescription = [];
    let hourlyDescriptionPics = [];
    for (let i = 0; i < this.props.day.hourly.length; i++) {
      hourlyTemp.push(this.props.day.hourly[i].bottom[0].tempF);
      hourlyDescription.push(
        this.props.day.hourly[i].bottom[0].weatherDesc[0].value
      );
      hourlyDescriptionPics.push(
        this.props.day.hourly[i].bottom[0].weatherIconUrl[0].value
      );
    }
    // console.log(hourlyTemp, hourlyDescription, hourlyDescriptionPics, "hourly");

    let chartData = {
      labels: [
        "02:00 AM",
        "05:00 AM",
        "08:00 AM",
        "11:00 AM",
        "02:00 PM",
        "05:00 PM",
        "08:00 PM",
        "11:00 PM"
      ],
      
      datasets: [
        {
          label: "Temperature",
          data: hourlyTemp,
          backgroundColor: "#92C0DB",
          borderColor: "#92C0DB",
          hourlyDesc: hourlyDescription,
          hourlyDescPics: hourlyDescriptionPics,
          pointRadius: 5,
          pointHitRadius: 20,
          fill: false,
        }
      ]
    };
    

    let graph = (
      <div>
        <Line
          height={175}
        
          data={chartData}
          options={{
            
            title: {
              display: true,
              text: "Temperature Breakdown",
              fontSize: 20
            },
            legend: {
              display: false
              // position: 'right'
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.datasets[0].data[tooltipItem.index] + " °F";
                },
                afterLabel: function(tooltipItem, data) {
                  return data.datasets[0].hourlyDesc[tooltipItem.index];
                }
              },
              titleFontSize: 16,
              bodyFontSize: 14,
              displayColors: false
            },
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  suggestedMin: Math.min.apply(this, hourlyTemp) - 5,
                  suggestedMax: Math.max.apply(this, hourlyTemp) + 5,
                  callback: function(value, index, values) {
                    return  value + " °F";
                }
                }
              }]
            }
          }}
        />
      </div>
    );

    return (
      <ListGroupItem>
        <Button
          className="dropdown-btn"
          color="white"
          onClick={() => this.toggle()}
        >
          Breakdown{this.state.collapse ? "-" : "+"}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card style={{ border: "none", color: "#757575" }}>
            <Row>
              <Col className="chart-container">{graph}</Col>
            </Row>
            {/* <Row>
              <Col>Time</Col>{" "}
              <Col xs={6} className="hourly-temp">
                Temperature{" "}
              </Col>
            </Row> */}

            {/* {this.props.day.hourly.map(hour => (
              <Row key={hour.time} className="hourly-container">
                <Col>
                  <Moment parse="hmm" format="hh:mm A">
                    {hour.time}
                  </Moment>
                </Col>{" "}
                <Col xs={6} className="hourly-temp">
                  {hour.bottom[0].tempF} °F --->{" "}
                  <img
                    className="weather-img"
                    src={hour.bottom[0].weatherIconUrl[0].value}
                    alt="WEATHER"
                  />{" "}
                </Col>
              </Row>
            ))} */}
          </Card>
        </Collapse>
      </ListGroupItem>
    );
  }
}
