<template>
  <GMapMap
    ref='map'
    :center="{ lat: 51.093048, lng: 6.84212 }"
    :zoom='7'
    :disableDefaultUI='false'
  />
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      center: {
        lat: 51.093048,
        lng: 6.84212,
      },
      options: {
        styles: [],
      },
    };
  },
};
</script>

<style>
.vue-map {
  min-height: 25vh;
}
</style>
