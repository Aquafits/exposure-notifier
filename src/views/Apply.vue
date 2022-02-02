<template>
  <div>
    <van-nav-bar title='Get QR code'/>
    <van-cell-group title="Location" inset>
      <GMapMap
        ref='locationPicker'
        :center='center'
        :zoom='14'
        :disableDefaultUI='false'
        :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                }"
      >
        <GMapMarker
          :position='center'
        />
      </GMapMap>
    </van-cell-group>

    <van-form @submit="onSubmit">
      <van-cell-group title="Address" inset>
        <van-field v-model=lat label='Latitude'/>
        <van-field v-model=lng label='Longitude'/>
        <van-field v-model=country label='Country'/>
        <van-field v-model=state label='State'/>
        <van-field v-model=zipcode label='Zipcode'/>
        <van-field v-model=name label='Place name'/>
        <van-field v-model=type label='Place type'/>
      </van-cell-group>
      <van-cell-group inset>
        <van-button type="primary" round block>submit</van-button>
      </van-cell-group>
    </van-form>
  </div>

</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Apply.vue',
  setup() {
    const lat = ref(33.6595107);
    const lng = ref(-117.8051574);
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
    });
    const country = ref('');
    const name = ref('');
    const state = ref('');
    const type = ref('');
    const zipcode = ref('');
    const center = computed(() => ({
      lat: Number(lat.value),
      lng: Number(lng.value),
    }));
    const onSubmit = (values) => {
      console.log('submit', values);
    };

    return {
      lat,
      lng,
      country,
      name,
      state,
      type,
      zipcode,
      center,
      onSubmit,
    };
  },
};
</script>

<style>
.vue-map {
  min-height: 35vh;
}
</style>
