<template>
  <div>
    <van-nav-bar title='Case Stats'/>
    <van-cell-group title='Heatmap' inset>
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
    </van-cell-group>

  </div>

</template>

<script>
import {
  ref, computed, watch, onMounted,
} from 'vue';
// import RecordService from '@/services/RecordService';

export default {
  name: 'Case.vue',
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
    const heatmap = ref();
    const heatData = ref([]);
    const googlize = (e) => ({
      location: new window.google.maps.LatLng(
        { lat: Number(e.latitude), lng: Number(e.longitude) },
      ),
      weight: Number(e.number),
    });

    watch(heatmap, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then(() => {
          const response = {
            data: {
              heatMapDetailDTOS: [
                {
                  latitude: '33',
                  locationId: '1',
                  longitude: '-117',
                  number: '1',
                  statics: [
                    0,
                  ],
                },
                {
                  latitude: '33.4',
                  locationId: '4',
                  longitude: '-117.04',
                  number: '1',
                  statics: [
                    1,
                  ],
                },
              ],
            },
          };
          const rawHeatData = response.data.heatMapDetailDTOS;
          for (let i = 0; i < rawHeatData.length; i += 1) {
            rawHeatData[i] = googlize(rawHeatData[i]);
          }
          heatData.value = rawHeatData;
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
    };
  },
};
</script>

<style>
canvas {
  -webkit-touch-callout: default;
}
</style>
