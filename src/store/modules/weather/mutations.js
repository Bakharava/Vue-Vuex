export const mutations = {
    selectCity(state, {city}) {
        state.city = city
    },
    setWeatherData(state, data) {
        state.weatherData = data;
    }
};