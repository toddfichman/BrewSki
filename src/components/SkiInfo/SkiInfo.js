import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Moment from 'react-moment';

import HourlySkiInfo from './HourlySkiInfo/HourlySkiInfo';


export default class SkiInfo extends Component {
  

  render() {

    console.log(this.props.skiData, 'SKIDATA')
    
    let display = (
      <h6 className="place-holder">
       Enter Location In Search Bar
      </h6>
    )

    if(this.props.skiData.length !== 0 && this.props.skiData.data.request !== undefined) {
      display = (
        <ListGroup flush>

          {this.props.skiData.data.weather.map((day) => (
            <ListGroupItem key={day.date}>                                          
              <ListGroupItemHeading><Moment format="MM/DD/YY">{day.date}</Moment> ⏤ <Moment format="dddd">{day.date}</Moment></ListGroupItemHeading>
              <ListGroupItemHeading>{day.hourly[3].bottom[0].weatherDesc[0].value === day.hourly[4].bottom[0].weatherDesc[0].value ? day.hourly[3].bottom[0].weatherDesc[0].value : day.hourly[3].bottom[0].weatherDesc[0].value + ' / ' + day.hourly[4].bottom[0].weatherDesc[0].value }</ListGroupItemHeading>
            <ListGroupItemText>
              Low ⏤ High ➜ <span style={{fontWeight: '700'}}> {day.bottom[0].mintempF}°F ⏤ {day.bottom[0].maxtempF}°F </span>
            </ListGroupItemText>
            <ListGroupItemText>
              Chance Of Snow ➜ <span style={{fontWeight: '700'}}>{day.chanceofsnow}% </span>
            </ListGroupItemText>
            <ListGroupItemText>
              Expected Snow Accumulation ➜ <span style={{fontWeight: '700'}}>{(day.totalSnowfall_cm * 0.393701).toFixed(1)} in.</span>
            </ListGroupItemText>
            <ListGroupItemText>
              Sunrise ⏤ Sunset ➜ <span style={{fontWeight: '700'}}>{day.astronomy[0].sunrise} ⏤ {day.astronomy[0].sunset}</span>
            </ListGroupItemText>

            <ListGroup>
                <HourlySkiInfo day={day}/>  
            </ListGroup>
            
            
            {/* <ListGroupItemText>
              Hourly &#8681; {day.hourly.map((hour) => (
                hour.bottom[0].tempF
              ))}
            </ListGroupItemText> */}
            </ListGroupItem>
          ))}

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
