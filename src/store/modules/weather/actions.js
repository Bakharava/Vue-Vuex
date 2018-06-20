import api from "../../../api/api";

export const actions = {
    async getWeather({ commit }, query) {
        try {
            const res = await api().get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${query}")&format=json`);
            const weather = await res.data.query.results.channel;
            commit('setWeatherData',  weather, query)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
        }
    },
    selectCity({commit}, item) {
        commit('selectCity', {city: item})
    }
};
