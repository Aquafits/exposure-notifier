<template>
  <div id="app">
    <router-view id ="router-view"/>
    <div id="nav">
      <van-tabbar route>
        <van-tabbar-item replace to='/' icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item replace to='/scan' icon="scan">Scan</van-tabbar-item>
        <van-tabbar-item replace to='/case' icon="chart-trending-o">Cases</van-tabbar-item>
        <van-tabbar-item replace to='/apply' icon="qr">QR Code</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  background-color: #f7f8fa;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
