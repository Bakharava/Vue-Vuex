import api from '../../api/api';

//initial state for weather
const state = {
    weatherData: {},
    settingsItemOptions: [String.fromCharCode(176) + 'F', String.fromCharCode(176) + 'C', "wind", "5 days"],
    date: '',
    colorThem: '',
    showWeatherSettings: false,
    showWind: false,
    cities: ['London', 'New York', 'Tokyo', 'Moscow', 'Minsk', 'Toronto', 'Madrid', 'Berlin'],
    showFarengheit: false,
    showForecast: false,
    city: 'London'
   // searchString: false
};
const getters = {
    getCities: state => {
        return state.cities
    },
    getCity: state => {
        return state.city
    },
    getWeatherData: state=> {
        return state.weatherData
    }
};

const mutations = {
    selectCity(state, {city}) {
        state.city = city
    },
    enterCity(state, {city}) {
        state.city = city
    },
    setWeatherData(state, data) {
        state.weatherData = data;
    }
};


const actions = {
    async getWeather({ commit }, query) {
       try {
         const res = await api().get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${query}")&format=json`);
           const weather = await res.data.query.results.channel
           commit('setWeatherData',  weather)
       } catch (e) {
           // eslint-disable-next-line no-console
           console.log(e)
       }
    },
    selectCity({commit}, item) {
        commit('selectCity', {city: item})
    },
    enterCity({commit}, param) {
    //    console.log(param);
        commit('enterCity', {city: param })
    }
};

export default  {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}