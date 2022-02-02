<template>
  <van-cell-group inset>
    <Scanner ref='scanner'></Scanner>
    <van-field v-model='email' label='Email' placeholder='Email to receive exposure notifications'/>
  </van-cell-group>
</template>

<script>
import Scanner from '@/components/Scanner.vue';
import RecordService from '@/services/RecordService';
import { ref } from 'vue';

export default {
  name: 'Scan',
  components: {
    Scanner,
  },
  setup() {
    const email = ref('');
    return { email };
  },
  data() {
    return {
      record: {
        email: null,
        locationId: null,
        string: null,
      },
    };
  },
  methods: {
    uploadRecord() {
      RecordService.uploadRecord(this.record);
    },
  },
};
</script>
