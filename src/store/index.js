import Vue from 'vue'
import Vuex from 'vuex'
import weather from './modules/weather/index';
import content from './modules/contentNews/index'
//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        weather,
        content
    },
    strict: debug,
 //   plugins: debug ? [createLogger()] : []
})
