import React, {useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {fetchWeather, fetchHourly} from '../api/WeatherApi'
import EachDay from '../components/EachDay'
import { Route, Switch, Redirect, BrowserRouter, useHistory, Link } from "react-router-dom";
import DateCard from "../components/DateCard"
import Button from '@material-ui/core/Button';

function SearchCity(props) {
  const [city, SetCity] = React.useState("Mumbai");
  const [weatherData, setWeatherData] = React.useState(null);
  const [hourlyData, setHourlyData] = React.useState([]);
  const [lat, SetLat] = React.useState(19.076090);
  const [lon, SetLon] = React.useState(72.877426);

  const getHourlyData = async () => {
    try{
      const data = await fetchHourly(lat,lon )
      setHourlyData(data);
      
    }catch(error){
      console.log('error', error)
    }
  }

  const getData = async () => {
    try{
      const data = await fetchWeather(city)
      setWeatherData(data);
      SetLat(data.city.coord.lat);
      SetLon(data.city.coord.lon);
      getHourlyData()
      
    }catch(error){
      console.log('error', error)
    }
  }


  React.useEffect(() => {
    getData();
    getHourlyData();
  }, [])

  const getDate = (timestamp) => {
    var date = new Date(timestamp * 1000)

    const stringDate = JSON.stringify(date)
    const finalDate = stringDate.substring(1,11)
    return finalDate;
  }

  // console.log('weatherData', weatherData)
  console.log("hourlyData.daily", hourlyData.daily)
  const history = useHistory();
  return (
    <BrowserRouter>
      <Container style={{textAlign: 'center'}}>
        <TextField fullWidth value={city} onChange={(e) => SetCity(e.target.value)} label="Search City" variant="outlined" style={{maxWidth: 600, margin: '0 auto', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', display: 'block'}} />
        <br />
        <Button onClick={() => {getData();getHourlyData();}} variant="contained" color="primary">Search</Button>
        <br /><br />
        {hourlyData?.daily?.map(item => <DateCard key={item.dt} timestamp={item.dt} />)}
        <br /> <br />
        {hourlyData?.daily?.map(item => <Route key={item.dt} path={`/${item.dt}`} component={() => 
          { return (<EachDay key={item.dt} item={item} hourlyData={hourlyData} />)}} /> )}
      </Container>
    </BrowserRouter>
  )
}

export default SearchCity
