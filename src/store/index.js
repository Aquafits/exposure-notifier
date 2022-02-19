import { createStore } from 'vuex';

export default createStore({
  state: {
    loggedIn: false,
    currentUser: {
      email: null,
    },
    exposureStatus: {
      status: 'UNKNOWN',
      icon: 'minus',
      color: '#c8c9cc',
    },
  },
  mutations: {
    logIn(state, email) {
      state.loggedIn = true;
      state.currentUser.email = email;
    },
    logOut(state) {
      state.loggedIn = false;
      state.currentUser.email = null;
    },
    setExposureStatus(state, visualization) {
      state.exposureStatus.status = visualization.status;
      state.exposureStatus.icon = visualization.icon;
      state.exposureStatus.color = visualization.color;
    },
    resetExposureStatus(state) {
      state.exposureStatus.status = 'UNKNOWN';
      state.exposureStatus.icon = 'minus';
      state.exposureStatus.color = '#c8c9cc';
    },
  },
  actions: {
  },
  modules: {
  },
});
