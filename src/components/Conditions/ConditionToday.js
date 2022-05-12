import React from 'react';
const conditionToday = (props) => {
    console.log(props.responseObj);
    if (props.responseObj.cod === 200 || props.responseObj.cod === '200')
        return props.responseObj.list[props.day].weather[0].main;
    else return "Wait...";
};
export default conditionToday;