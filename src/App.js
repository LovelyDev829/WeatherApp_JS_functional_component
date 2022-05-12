import './App.css';
import React, { useState } from 'react';
import 'animate.css';
import ConditionToday from './components/Conditions/ConditionToday';
import TemperatureToday from './components/Conditions/TemperatureToday';
import PictureToday from './components/Conditions/PictureToday';

function App() {

  let [city, setCity] = useState('');
  let [click, setClick] = useState(0);
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  const uriEncodedCity = encodeURIComponent(city);


  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const d = new Date(`${year}/${month < 10 ? `0${month}` : `${month}`}/${date} `);
  let nowDay = d.getDay();

  function day(num) {
    num += nowDay;
    if (num >= 7) num -= 7;
    switch (num) {
      case 0: return "Mon";
      case 1: return "Tue";
      case 2: return "Wed";
      case 3: return "Thr";
      case 4: return "Fri";
      case 5: return "Sat";
      default: return "Sun";
    }
  }
  function getCountry() {
    if (responseObj.cod === "200" || responseObj.cod === 200) {
      return responseObj.city.name;
    }
  }
  function getForecast(cityName) {
    setError(false);
    setResponseObj({});
    setLoading(true);
    let uriEncodedCity = encodeURIComponent(cityName);
    fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${uriEncodedCity}`, {
      "method": "GET",
      "headers": {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '3d1a718219mshb6323ab04ba5d98p1010c3jsnb53c54afe8ce'
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.cod !== '200' && response.cod !== 200) {
          throw new Error()
        }
        setResponseObj(response);
        setLoading(false);
        // console.log(responseObj);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }
  return (
    <div className="App">
      <div>
      </div>
      <div className='mainDiv'>
        <div className='mainTitleDiv'>
          <div className={getCountry() === "Ottawa" ? 'mainTitleText addColor' : 'mainTitleText'}
            onClick={function () {
              getForecast("Ottawa");
            }}>
            OTTAWA
          </div>
          <div className={getCountry() === "Moscow" ? 'mainTitleText addColor' : 'mainTitleText'}
            onClick={function () {
              getForecast("Moscow");
            }}>
            MOSCOW
          </div>
          <div className={getCountry() === "Tokyo" ? 'mainTitleText addColor' : 'mainTitleText'}
            onClick={function () {
              getForecast("Tokyo");
            }}>
            TOKYO
          </div>
        </div>
        {/* <div className={click===1 ? 'mainBody button_click' : 'mainBody'}> */}
        <div className='mainBody'>
          <div className='mainTopDiv'>
            <div className="topcenterDiv">
              <p>Today</p>
              <div className='topcenterBottom'>
                <div className='pictureTodayDiv'>
                  <PictureToday responseObj={responseObj} error={error} loading={loading} day='0' width='150' />
                </div>
                <div className='degreeC'>
                  <h1 id='todayDegree'><TemperatureToday responseObj={responseObj} error={error} loading={loading} day="0" />˚</h1>
                  <p id='todayCondition'><ConditionToday responseObj={responseObj} error={error} loading={loading} day="0" /></p>
                </div>
              </div>
            </div>
          </div>
          <div className='mainBottomDiv'>
            <div className='bottomSubDiv1'>
              <div className='dayDiv'>
                <p className='dayWhat'>{day(1)}</p>
                <div className='dayIcon'>
                  <PictureToday responseObj={responseObj} error={error} loading={loading} day='8' width='70' />
                </div>
                <div className='dayDegree'>
                  <TemperatureToday responseObj={responseObj} error={error} loading={loading} day="8" />˚
                </div>
              </div>
            </div>
            <div className='bottomSubDiv2'>
              <div className='dayDiv'>
                <p className='dayWhat'>{day(2)}</p>
                <div className='dayIcon'>
                  <PictureToday responseObj={responseObj} error={error} loading={loading} day='16' width='70' />
                </div>
                <div className='dayDegree'>
                  <TemperatureToday responseObj={responseObj} error={error} loading={loading} day="16" />˚
                </div>
              </div>
            </div>
            <div className='bottomSubDiv3'>
              <div className='dayDiv'>
                <p className='dayWhat'>{day(3)}</p>
                <div className='dayIcon'>
                  <PictureToday responseObj={responseObj} error={error} loading={loading} day='24' width='70' />
                </div>
                <div className='dayDegree'>
                  <TemperatureToday responseObj={responseObj} error={error} loading={loading} day="24" />˚
                </div>
              </div>
            </div>
            <div className='bottomSubDiv4'>
              <div className='dayDiv'>
                <p className='dayWhat'>{day(4)}</p>
                <div className='dayIcon'>
                  <PictureToday responseObj={responseObj} error={error} loading={loading} day='32' width='70' />
                </div>
                <div className='dayDegree'>
                  <TemperatureToday responseObj={responseObj} error={error} loading={loading} day="32" />˚
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
