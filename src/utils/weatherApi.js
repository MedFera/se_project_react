
//import {apiKey} from './constants.js'

function _checkResponse(res){
    
    if (res.ok) {
        return res.json();
    }
    else {
        return Promise.reject(res.error);
    }
}

class weatherApi {
    constructor(options){
        this.longitude = options.longitude;
        this.latitude = options.latitude
    }
    
    async getWeatherObj() {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=bb70dde03746a6ae0029aaf18268eafe`)
        .then(res => _checkResponse(res))
        .then(data => {
            return data;
        })
    }

}


export {weatherApi}