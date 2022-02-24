<template>
  <div>
    <van-nav-bar title='Case Stats'/>
    <van-cell-group title='Active Cases' inset>
      <GMapMap
        ref='heatmap'
        :center="{'lat': 33.676194, 'lng': -117.867329}"
        :zoom="9"
        :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                      gestureHandling: 'greedy',
                }"
      >
        <GMapHeatmap :data="heatData"></GMapHeatmap>
      </GMapMap>
      <van-cell title="Date range" :value="dateRange" @click="showPickDate = true"/>
      <van-calendar v-model:show="showPickDate"
                    type="range"
                    color="#1989fa"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="onDateRangeChange"/>
    </van-cell-group>
  </div>
</template>

<script>
import {
  ref, computed, watch, onMounted,
} from 'vue';
import RecordService from '@/services/RecordService';

export default {
  name: 'Case',
  setup() {
    // create google map
    const lat = ref(34.03);
    const lng = ref(-118.24);
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
    });
    const center = computed(() => ({
      lat: Number(lat.value),
      lng: Number(lng.value),
    }));
    onMounted(() => {
      // don't modify this, solved a bug with map height
      document.querySelector('.vue-map').id = 'vue-map';
      document.getElementById('vue-map').style.minHeight = '50vh';
    });

    // create heat data
    const dateRange = ref('Today');
    const minDate = ref(new Date(2019, 1, 1));
    const maxDate = ref(new Date());
    const showPickDate = ref(false);
    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onDateRangeChange = (range) => {
      const [start, end] = range;
      showPickDate.value = false;
      dateRange.value = `${formatDate(start)} - ${formatDate(end)}`;
    };
    const heatmap = ref();
    const heatData = ref([]);
    const googlize = (e) => ({
      location: new window.google.maps.LatLng(
        {
          lat: Number(e.latitude),
          lng: Number(e.longitude),
        },
      ),
      weight: Number(e.number),
    });

    watch(heatmap, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then(() => {
          RecordService.getHeatMapByActiveCases()
            .then((response) => {
              const rawHeatData = response.data.heatMapDetailDTOS;
              for (let i = 0; i < rawHeatData.length; i += 1) {
                rawHeatData[i] = googlize(rawHeatData[i]);
              }
              heatData.value = rawHeatData;
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    });

    return {
      // google map
      lat,
      lng,
      center,
      heatmap,
      heatData,
      dateRange,
      minDate,
      maxDate,
      showPickDate,
      onDateRangeChange,
    };
  },
};
</script>

<style>
canvas {
  -webkit-touch-callout: default;
}
</style>
