<template>
    <div class="weather">
        <div v-bind:class="[ 'weather__background', colorThem]">
            <div class="weather__settings-icon fa fa-cog" @click="showWeatherSettings=!showWeatherSettings"></div>
            <div class="weather__city" v-if="weatherData.location">{{weatherData.location.city}}</div>
            <div class="weather__country" v-if="weatherData.location">{{weatherData.location.country}}</div>
            <div class="weather__degree"
                 v-if="weatherData.units && !showFarengheit">
                {{weatherData.ttl | convertFromFarengheit}} &deg;C
                <!--{{weatherData.units.temperature}}--> </div>
            <div class="weather__degree"
                 v-if="weatherData.units && showFarengheit">
                {{weatherData.ttl}} &deg;F
             </div>
            <div class="weather__date" v-if="weatherData.item">{{weatherData.item.condition.date}}</div>
            <div class="weather__wind fa" v-if="weatherData.wind && showWind">
                <img class="weather__wind-icon" src="../../assets/image/wind-24px.png">
                 {{weatherData.wind.speed}} {{weatherData.units.speed}}
            </div>
        </div>
        <WeatherSettings v-if="showWeatherSettings" >
                <div  v-bind:class="['settings-item', 'item' + colorThem]"
                     :key="item"
                     v-for="item in settingsItemOptions"
                     @click="getSettings(item)"
                     @blur="closeMenu">
                    {{item}}
                </div>
        </WeatherSettings>
        <div class="weather__temperature">
            <div class="weather__today">Today:
                <span v-if="weatherData.item && !showFarengheit">
                    {{weatherData.item.forecast[0].high | convertFromFarengheit}} &deg;C - {{weatherData.item.forecast[0].low | convertFromFarengheit}} &deg;C
                </span>

                <span v-if="weatherData.item && showFarengheit">
                    {{weatherData.item.forecast[0].high }} &deg;F - {{weatherData.item.forecast[0].low }} &deg;F
                </span>
            </div>
            <div class="weather__tomorrow" v-if="!showForecast">Tomorrow:
                <span v-if="weatherData.item && !showFarengheit">
                    {{weatherData.item.forecast[1].high | convertFromFarengheit}} &deg;C - {{weatherData.item.forecast[1].low | convertFromFarengheit}} &deg;C
                </span>
                <span v-if="weatherData.item && showFarengheit">
                    {{weatherData.item.forecast[1].high }} &deg;F - {{weatherData.item.forecast[1].low }} &deg;F
                </span>
            </div>
            <div class="weather__fiveDays" v-if="showForecast">
                <div class="day" v-if="weatherData.item && index < 5 && !showFarengheit" :key="index" v-for="(day, index) in weatherData.item.forecast">
                   <span>{{day.day}}</span> <br/>{{ day.high  | convertFromFarengheit}} &deg;C
                </div>
                <div class="day" v-if="weatherData.item && index < 5 && showFarengheit" :key="index" v-for="(day, index) in weatherData.item.forecast">
                    <span>{{day.day}}</span> <br/>{{ day.high }} &deg;F
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import WeatherSettings from "./WeatherSettings/WeatherSettings";

    export default {
        name: "Weather",
        components: {WeatherSettings},
        weatherUrl: 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="London")&format=json',
        data() {
            return {
                weatherData: [],
                settingsItemOptions: [String.fromCharCode(176) + 'F', String.fromCharCode(176) + 'C', "wind", "5 days"],
                date: '',
                colorThem: '',
                showWeatherSettings: false,
                showWind: false,
                showFarengheit: false,
                showForecast: false
            }
        },
        mounted() {
            this.getWeather();
            this.getDate();
            this.getColorClass();
        },
        methods: {
            getWeather() {
                axios.get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="London")&format=json`)
                    .then(res => {
                    this.weatherData = res.data.query.results.channel;
                    console.log(this.weatherData)
                }).catch((error) => {
                    console.log(error);
                });
            },
            getDate() {
                let date = new Date();
                return this.date = date.getHours();
            },
            getColorClass() {
                if(this.date < 12 && this.date > 6 ) {
                    this.colorThem = 'morning';
                } else if(this.date < 19 && this.date >= 12 ) {
                    this.colorThem = 'afternoon';
                } else {
                    this.colorThem = 'night';
                }
                return this.colorThem;
            },
           getSettings(item) {
                if(item === 'wind'){
                    this.showWind = !this.showWind
                } if(item === String.fromCharCode(176) + 'F') {
                    this.showFarengheit = true;
               } if(item === String.fromCharCode(176) + 'C') {
                   this.showFarengheit = false;
               } if(item === '5 days') {
                   this.showForecast = !this.showForecast;
               }
           },
            closeMenu() {
                return this.showWeatherSettings = false;
            }
        },
        filters: {
            convertFromFarengheit(value) {
                return Math.round(((value)-32)/1.8)
            }
        }
    }
</script>

<style src="./Weather.less"></style>
