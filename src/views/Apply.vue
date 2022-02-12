<template>
  <div>
    <van-nav-bar title='Get QR code'/>
    <van-cell-group title='Location' inset>
      <GMapMap
        ref='locator'
        :center="center"
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
        <GMapMarker :position='location'
                    :icon= '{
                      url: require("../assets/Location.svg"),
                      scaledSize: {width:15, height: 15},
                      alpha: 0.5
                    }'
        >
        </GMapMarker>
        <GMapMarker :position='center' style="z-index: 200"></GMapMarker>

      </GMapMap>
    </van-cell-group>

    <van-form @submit='getIndexForLocations'>
      <van-cell-group title='Address' inset>
        <van-field v-model='markerLat' label='Latitude' name='latitude'/>
        <van-field v-model='markerLng' label='Longitude' name='longitude'/>
        <van-field v-model='country' label='Country' name='county'/>
        <van-field v-model='state' label='State' name='state'/>
        <van-field v-model='zipcode' label='Zipcode' name='zipcode'/>
        <van-field v-model='name' label='Place name' name='name'/>
        <van-field v-model='type' label='Place type' name='type'/>

      </van-cell-group>
      <div style='margin: 16px;'>
        <van-button round block type='primary' native-type='submit'>
          Submit
        </van-button>
      </div>
    </van-form>

    <van-popup v-model:show='showQRCode' position='top' closeable close-icon="close">
      <vue-qr ref="qrcode" :text='urlOfQRCode'>
      </vue-qr>
    </van-popup>

  </div>

</template>

<script>
import {
  ref, computed, watch, onMounted,
} from 'vue';
import RecordService from '@/services/RecordService';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';

export default {
  name: 'Apply.vue',
  components: {
    vueQr,
  },
  setup() {
    // create google map
    const location = ref({ lat: 200, lng: 200 });
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      location.value.lat = position.coords.latitude;
      location.value.lng = position.coords.longitude;
      console.log(location.value);
    });

    const markerLat = ref(location.value.lat === 200 ? 33.676194 : location.value.lat);
    const markerLng = ref(location.value.lng === 200 ? -117.867329 : location.value.lng);
    const center = computed(() => ({
      lat: Number(markerLat.value),
      lng: Number(markerLng.value),
    }));
    onMounted(() => {
      // don't modify this, solved a bug with map height
      document.querySelector('.vue-map').id = 'vue-map';
      document.getElementById('vue-map').style.minHeight = '24vh';
    });

    const locator = ref();
    watch(locator, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          map.addListener('dragend', () => {
            const latlng = map.getCenter();
            markerLat.value = latlng.lat();
            markerLng.value = latlng.lng();
          });
        });
      }
    });

    // submit form to get location id
    const country = ref('United States');
    const name = ref('');
    const state = ref('');
    const type = ref('');
    const zipcode = ref('');
    const showQRCode = ref(false);
    const urlOfQRCode = ref('http://192.168.0.94:8080/#/scan');
    const getIndexForLocations = (locationInfoDTO) => {
      // console.log('submit locationInfoDTO', locationInfoDTO);
      RecordService.getIndexForLocations(locationInfoDTO)
        .then((response) => {
          showQRCode.value = true;
          const locationId = response.data;
          urlOfQRCode.value = `http://192.168.0.94:8080/#/scan/${locationId}`;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      // google map
      locator,
      location,
      markerLat,
      markerLng,
      center,
      // form
      country,
      name,
      state,
      type,
      zipcode,
      showQRCode,
      urlOfQRCode,
      getIndexForLocations,
    };
  },
};
</script>

<style>
.van-popup {
  text-align: center;
}

canvas {
  -webkit-touch-callout: default;
}
</style>
