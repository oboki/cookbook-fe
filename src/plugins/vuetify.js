import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#343b57',
        secondary: '#929292',
      },
    },
  },
  icons: {
    iconfont: 'mdi'
  }
});
