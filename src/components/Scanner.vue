<template>
  <div>
    <div class="center stream">
      <qr-stream @decode="onDecode" class="mb">
        <div class="frame"></div>
      </qr-stream>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { QrStream } from 'vue3-qr-reader';

export default {
  name: 'Scanner',
  emits: ['decode'],
  components: {
    QrStream,
  },
  setup(props, context) {
    // scanner
    const apiReactive = reactive({
      api: null,
    });

    function onDecode(api) {
      context.emit('decode', api);
    }

    return {
      ...toRefs(apiReactive),
      onDecode,
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
