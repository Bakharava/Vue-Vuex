import api from "../../../api/api";

export const actions = {
    async getWeather({commit}, query) {
        try {
            const res = await api().get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${query}")&format=json`);
            const weather = await res.data.query.results.channel;
            const status = await res.status;
            if (status === 200) {
                commit('setWeatherData', weather, query);
            } else {
                commit('setNoData');
            }
        } catch (error) {
            commit('setError', error);
        }
    },
    selectCity({commit}, item) {
        commit('selectCity', {city: item})
    },
    changeFivedaysText({commit}, item) {
        commit('setFivedaysText', item);
    },
    getColorClass({commit}, date) {
        commit('setColorClass', date);
    }
};
