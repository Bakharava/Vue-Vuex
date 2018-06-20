import Vue from 'vue'
import Vuex from 'vuex'
import weather from './modules/weather/index';
//import products from './modules/products'
//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        weather,
  //      products
    },
    strict: debug,
 //   plugins: debug ? [createLogger()] : []
})
