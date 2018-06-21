export const mutations = {
    selectCity(state, {city}) {
        state.city = city
    },
    setWeatherData(state, data) {
        state.weatherData = data;
    },
    setFivedaysText(state, text){
        const tomorrow = 'tomorrow';
        const fiveDays = '5 days';
        if(text === tomorrow){
            state.settingsItemOptions.splice(-1, 1, fiveDays)
        }
       else {
            state.settingsItemOptions.splice(-1, 1, tomorrow)
        }
    },
    setColorClass(state, date) {
        const morning = 6;
        const afternoon = 12;
        const night = 19;
        if (date < afternoon && date > morning) {
            state.colorThem = 'morning';
        } else if (date < night && date >= afternoon) {
            state.colorThem = 'afternoon';
        } else {
            state.colorThem = 'night';
        }
    }
};
