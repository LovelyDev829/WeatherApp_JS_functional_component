import React from 'react';
const temperatureToday = (props) => {
    if(props.responseObj.cod === 200 || props.responseObj.cod === '200')
        return Math.round(props.responseObj.list[props.day].main.temp)-273;
    else return "00";
}
export default temperatureToday;