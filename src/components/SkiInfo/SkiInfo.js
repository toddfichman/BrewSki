import React, { Component } from 'react';
import { ListGroup, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Moment from 'react-moment';

import HourlySkiInfo from './HourlySkiInfo/HourlySkiInfo';


export default class SkiInfo extends Component {


  render() {

    
    let display = (
      <h6 className="place-holder">
       Enter Location In Search Bar
      </h6>
    )

    if(this.props.skiData.length !== 0 && this.props.skiData.data.request !== undefined) {
      display = (
        <ListGroup flush>

          {this.props.skiData.data.weather && this.props.skiData.data.weather.map((day) => (
            <div className="list-item" key={day.date}>                                          
              <ListGroupItemHeading><Moment format="MM/DD/YY">{day.date}</Moment> ⏤ <Moment format="dddd">{day.date}</Moment></ListGroupItemHeading>
              <ListGroupItemHeading>{day.hourly[3].weatherDesc[0].value === day.hourly[4].weatherDesc[0].value ? day.hourly[3].weatherDesc[0].value : day.hourly[3].weatherDesc[0].value + ' / ' + day.hourly[4].weatherDesc[0].value }</ListGroupItemHeading>
            <ListGroupItemText>
              Low ⏤ High ➜ <span style={{fontWeight: '700'}}> {day.mintempF}°F ⏤ {day.maxtempF}°F </span>
            </ListGroupItemText>
            <ListGroupItemText>
              Chance Of Snow ➜ <span style={{fontWeight: '700'}}>{day.hourly[4].chanceofsnow}% </span>
            </ListGroupItemText>
            <ListGroupItemText>
              Expected Snow Accumulation ➜ <span style={{fontWeight: '700'}}>{(day.totalSnow_cm * 0.393701).toFixed(1)} in.</span>
            </ListGroupItemText>
            <ListGroupItemText>
              Sunrise ⏤ Sunset ➜ <span style={{fontWeight: '700'}}>{day.astronomy[0].sunrise} ⏤ {day.astronomy[0].sunset}</span>
            </ListGroupItemText>

            <ListGroup>
                <HourlySkiInfo day={day}/>  
            </ListGroup>
            
            </div>
          ))}
          {this.props.isOffSeason ? <div className="offseason-warning">Only 1 Day Forcast Available During Offseason.</div> : null}
        </ListGroup>
      )
    } 

    return (
      <div>
        {display}
        
      </div>
    )
  }
}
