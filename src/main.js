import { createApp } from 'vue';

import axios from 'axios';
import {
  ActionSheet,
  Button,
  Calendar,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  Locale,
  NavBar,
  Popup,
  Switch,
  Tabbar,
  TabbarItem,
} from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

import VueGoogleMaps from '@fawmi/vue-google-maps';

import VueAxios from 'vue-axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Locale.use('en-US', enUS);

const app = createApp(App);

// import vant 3
app
  .use(ActionSheet)
  .use(Button)
  .use(Calendar)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Field)
  .use(Form)
  .use(NavBar)
  .use(Popup)
  .use(Switch)
  .use(Tabbar)
  .use(TabbarItem);

// import axios, bind to a global name $httpclient
app.use(VueAxios, { $httpclient: axios });

// import google map, thanks to https://vue-map.netlify.app/
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCqhifzJk_S6qkPv8gWs7cSemBvDpfR4II',
    libraries: 'visualization',
  },
});

app.use(store)
  .use(router)
  .mount('#app');
