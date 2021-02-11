import React from 'react'
import ReactECharts from 'echarts-for-react';
import clearsky from "../images/clearsky.jpg"
import cloudysky from "../images/cloudysky.jpg"
import rain from "../images/rain.jpg";
import snow from "../images/snow.jpg";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AcUnitIcon from '@material-ui/icons/AcUnit';

function EachDay(props) {
  // if(!props.hourlyData) return <div />

console.log('hourlyData', props.hourlyData)

const getDate = (timestamp) => {
  var date = new Date(timestamp * 1000)

  const stringDate = JSON.stringify(date)
  const finalDate = stringDate.substring(1,11)
  const hour = date.getHours()
  return hour;
}

const getTime = (timestamp) => {
  var date = new Date(timestamp * 1000)
  var hour = date.getHours();
  var min = date.getMinutes();

  const digit = (value) => {
    if(value < 10){
      return `0${value}`
    }else{
      return value;
    }
  }
  
  return `${digit(hour)}:${digit(min)}`;
}

const celsius = (kelvin) => {
  var cel = kelvin - 273.15;
  var finalCel = JSON.stringify(cel).substring(0, 5)
  return finalCel;
}

console.log('getTime', getTime(1613007542))

const option = {
  title: {
    text: 'Hourly Temperature'
  },
  tooltip : {
    trigger: 'axis'
  },
  // legend: {
  //   data:['邮件营销','联盟广告','视频广告']
  // },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : props.hourlyData.hourly.map(item => {return getDate(item.dt)})
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'Temp',
      type:'line',
      // stack: '总量',
      areaStyle: {normal: {}},
      data: props.hourlyData.hourly.map(item => {return item.temp})
    },
    
  ]
};

  return (
    <div style={{position: 'relative', color: 'black', fontSize: 30}}>
      {
        props.item.weather[0].main === "Clouds" ? <img src={cloudysky} style={{height: '600px'}} /> 
        : props.item.weather[0].main === "Clear" ? <img src={clearsky} style={{height: '600px'}} />
        : props.item.weather[0].main === "Rain" ? <img src={rain} style={{height: '600px'}} /> : <img src={snow} style={{height: '600px'}} />

      }
      
      <div className="top-left"><WbSunnyIcon fontSize="large" />Sunrise: {getTime(props.item.sunrise)} </div>
      <div className="top-right"><NightsStayIcon fontSize="large" /> Sunset: {getTime(props.item.sunset)} </div>
      <div className="centered">Temperature: {celsius(props.item.temp.day)}<sup>o</sup>C </div>
      <div className="centered" style={{top: '23%'}}>Humidity: {props.item.humidity} </div>
      <div className="bottom-center" style={{color: 'white'}}><LocationSearchingIcon fontSize="large" /> Lat: {props.hourlyData.lat} and Lon: {props.hourlyData.lon}  </div>
      <br /><br />
      <ReactECharts
    option={option}
    style={{ height: 400 }}
  />
    </div>
  )
}

export default EachDay
