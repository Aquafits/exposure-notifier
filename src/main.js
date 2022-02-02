import { createApp } from 'vue';

import axios from 'axios';
import {
  Button,
  CellGroup,
  Form,
  Field,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
} from 'vant';
import VueGoogleMaps from '@fawmi/vue-google-maps';

import VueAxios from 'vue-axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);

// import vant 3
app
  .use(Button)
  .use(CellGroup)
  .use(Icon)
  .use(Field)
  .use(Form)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem);

// import axios, bind to a global name $httpclient
app.use(VueAxios, { $httpclient: axios });

// import google map, thanks to https://vue-map.netlify.app/
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB6h2oNIEeArQyATIOK3ckcXmWeBX5f-Jw',
    libraries: 'visualization',
  },
});

app.use(store)
  .use(router)
  .mount('#app');
