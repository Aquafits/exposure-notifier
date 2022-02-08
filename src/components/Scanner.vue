<template>
  <div>
    <div class="center stream">
      <qr-stream @decode="onDecode" class="mb">
        <div style="color: red;" class="frame"></div>
      </qr-stream>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { QrStream } from 'vue3-qr-reader';

export default {
  name: 'Scanner',
  components: {
    QrStream,
  },
  setup(props, context) {
    // scanner
    const apiReactive = reactive({
      api: null,
    });

    function onDecode(api) {
      context.emit('onDecode', api);
    }

    return {
      ...toRefs(apiReactive),
      onDecode,
    };
  },
  data() {
    return {
      record: {
        locationId: null,
        string: null,
      },
    };
  },
};
</script>

<style scoped>
.stream {
  max-height: 50vh;
  margin: auto;
}

.frame {
  border-style: solid;
  border-width: 2px;
  border-color: cornflowerblue;
  height: 150px;
  width: 150px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}
</style>
