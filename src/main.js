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
import './registerServiceWorker';

import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import {
  CanvasRenderer,
} from 'echarts/renderers';
import {
  LineChart,
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
} from 'echarts/components';
import store from './store';
import router from './router';
import App from './App.vue';

Locale.use('en-US', enUS);

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
]);

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
    key: 'YOUR_API_KEY',
    libraries: 'visualization',
  },
});

// add vue-echarts
app.component('v-chart', ECharts);

app.use(store)
  .use(router)
  .mount('#app');
