export const getters = {
    getCities: state => {
        return state.cities
    },
    getCity: state => {
        return state.city
    },
    getWeatherData: state=> {
        return state.weatherData
    },
    getSettingsItemOptions: state=> {
        return state.settingsItemOptions
    },
    getColorThem: state => state.colorThem
};
