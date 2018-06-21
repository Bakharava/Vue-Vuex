<template>
    <div class="weather">
        <div v-bind:class="[ 'weather__background', colorThem]">
            <div class="weather__settings-icon fa fa-cog" @click="showWeatherSettings=!showWeatherSettings"
                 @blur="closeMenu"></div>
            <div class="weather__city" v-if="city">{{city}}
                <span v-bind:class="[!showCities ? 'fa fa-angle-down' : 'fa fa-angle-up', 'arrow-icon']"
                      @click="showCitiesList"></span>
            </div>

            <div class="weather__cities-list" v-if="showCities">
                <div class="city-item" v-for="item in cities" @click="changeCity(item)" :key="item">
                    {{item}}
                </div>
                <input v-bind:class="['city-input', 'input-' + colorThem]" placeholder="Type your city" type="text"
                       v-model="searchString" @keyup.enter="changeCity(searchString)"/>
            </div>
            <div class="weather__country" v-if="weatherData.location">{{weatherData.location.country}}</div>
            <div class="weather__degree"
                 v-if="weatherData.item && !showFarengheit">
                {{weatherData.item.condition.temp | convertFromFarengheit}} &deg;C
                <!--{{weatherData.units.temperature}}--> </div>
            <div class="weather__degree"
                 v-if="weatherData.item && showFarengheit">
                {{weatherData.item.condition.temp}} &deg;F
            </div>
            <div class="weather__date" v-if="weatherData.item">{{weatherData.item.condition.date}}</div>
            <div class="weather__wind" v-if="weatherData.wind && showWind">
                <img class="weather__wind-icon" src="../../assets/image/wind-24px.png">
                {{weatherData.wind.speed}} {{weatherData.units.speed}}
            </div>
        </div>
        <weather-settings v-show="showWeatherSettings">
            <div v-bind:class="['settings-item', 'item' + colorThem]"
                 :key="item"
                 v-for="item in settingsItemOptions"
                 @click="getSettings(item)">
                {{item}}
            </div>
        </weather-settings>
        <div class="weather__temperature">
            <div class="weather__today">Today:
                <span v-if="weatherData.item && !showFarengheit">
                    {{weatherData.item.forecast[0].low | convertFromFarengheit}} &deg;C - {{weatherData.item.forecast[0].high | convertFromFarengheit}} &deg;C
                </span>

                <span v-if="weatherData.item && showFarengheit">
                    {{weatherData.item.forecast[0].low }} &deg;F - {{weatherData.item.forecast[0].high }} &deg;F
                </span>
            </div>
            <div class="weather__tomorrow" v-if="!showForecast">Tomorrow:
                <span v-if="weatherData.item && !showFarengheit">
                    {{weatherData.item.forecast[1].low | convertFromFarengheit}} &deg;C - {{weatherData.item.forecast[1].high | convertFromFarengheit}} &deg;C
                </span>
                <span v-if="weatherData.item && showFarengheit">
                    {{weatherData.item.forecast[1].low }} &deg;F - {{weatherData.item.forecast[1].high }} &deg;F
                </span>
            </div>
            <div class="weather__fiveDays" v-if="showForecast">
                <div class="day" v-if="weatherData.item && index < 5 && !showFarengheit" :key="index"
                     v-for="(day, index) in weatherData.item.forecast">
                    <span>{{day.day}}</span> <br/>{{ day.high | convertFromFarengheit}} &deg;C
                </div>
                <div class="day" v-if="weatherData.item && index < 5 && showFarengheit" :key="index"
                     v-for="(day, index) in weatherData.item.forecast">
                    <span>{{day.day}}</span> <br/>{{ day.high }} &deg;F
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import WeatherSettings from "./WeatherSettings/WeatherSettings";

    const degreeCode = String.fromCharCode(176);

    export default {
        name: "Weather",
        components: {WeatherSettings},
        data() {
            return {
                showCities: false,
                searchString: '',
                date: '',
                showWeatherSettings: false,
                showWind: false,
                showFarengheit: false,
                showForecast: false,
            }
        },
        computed: {
            ...mapGetters('weather', {
                cities: 'getCities',
                city: 'getCity',
                weatherData: 'getWeatherData',
                settingsItemOptions: 'getSettingsItemOptions',
                colorThem:'getColorThem'
            }),
        },
        mounted() {
            this.getWeather(this.city);
            this.getDate();
            this.getColorClass(this.date);
        },
        methods: {
            ...mapActions('weather', [
                'selectCity',
                'enterCity',
                'getWeather',
                'changeFivedaysText',
                'getColorClass'
            ]),
            changeCity(item) {
                this.selectCity(item);
                this.getWeather(item);
                this.showCities = false;
                this.searchString = '';
            },
            getDate() {
                let date = new Date();
                return this.date = date.getHours();
            },
            getSettings(item) {
                if (item === 'wind') {
                    this.showWind = !this.showWind
                }
                if (item === degreeCode + 'F') {
                    this.showFarengheit = true;
                }
                if (item === degreeCode + 'C') {
                    this.showFarengheit = false;
                }
                if (item === '5 days') {
                    this.showForecast = true;
                    if (this.showForecast) {
                        this.changeFivedaysText(item);
                    }
                }
                if (item === 'tomorrow') {
                    this.showForecast = false;
                    this.changeFivedaysText(item);
                }
                this.closeMenu();
            },
            closeMenu() {
                this.showWeatherSettings = false;
            },
            showCitiesList() {
                return this.showCities = !this.showCities
            }
        },
        filters: {
            convertFromFarengheit(value) {
                return Math.round(((value) - 32) / 1.8)
            }
        }
    }
</script>

<style src="./Weather.less"></style>
