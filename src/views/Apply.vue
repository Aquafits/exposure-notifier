<template>
  <div>
    <van-nav-bar title='Get QR code'/>
    <van-cell-group title='Location' inset>
      <GMapMap
        ref='locator'
        :center="{'lat': 34.03, 'lng': -118.24}"
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
        style='height: 24vh'
      >
        <GMapMarker :position='center'></GMapMarker>
      </GMapMap>
    </van-cell-group>

    <van-form @submit='getIndexForLocations'>
      <van-cell-group title='Address' inset>
        <van-field v-model='lat' label='Latitude' name='latitude'/>
        <van-field v-model='lng' label='Longitude' name='longitude'/>
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
  ref, computed, watch,
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

    const locator = ref();
    watch(locator, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          map.addListener('center_changed', () => {
            const latlng = map.getCenter();
            lat.value = latlng.lat();
            lng.value = latlng.lng();
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
      lat,
      lng,
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
.vue-map {
  min-height: 25vh;
}

.van-popup {
  text-align: center;
}

canvas {
  -webkit-touch-callout: default;
}
</style>
