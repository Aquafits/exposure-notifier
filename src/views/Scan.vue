<template>
  <div id='scan'>
    <van-nav-bar title='Scan QR code'/>
    <van-cell-group v-if="!located" title='Scanner' inset>
      <Scanner ref='scanner'></Scanner>
    </van-cell-group>

    <van-form @submit='uploadRecord'>
      <van-cell-group title='You are visiting...' inset>
        <van-field v-model='locationId' label="Location Id" name="locationId"
                   placeholder='scan to get location id'/>
        <van-field v-model='email' label="Email" name="email"
                   placeholder='to receive exposure notifications'/>
      </van-cell-group>
      <div style='margin: 16px;'>
        <van-button round block type='primary' native-type='submit'>
          Submit
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script>
import Scanner from '@/components/Scanner.vue';
import RecordService from '@/services/RecordService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Toast } from 'vant';

export default {
  name: 'Scan',
  components: {
    Scanner,
  },
  setup() {
    const email = ref('');
    const locationId = ref('');
    const located = ref(false);
    if (useRoute().params.locationId) {
      locationId.value = useRoute().params.locationId;
      located.value = true;
    }
    const timestamp = ref('');
    const uploadRecord = (record) => {
      console.log(record);
      RecordService.uploadRecord({
        email: record.email,
        locationId: record.locationId,
        timestamp: '',
      })
        .then((response) => {
          const ok = response.data;
          if (ok) {
            Toast.success('submitted');
          } else {
            Toast.fail('failed to submit');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      email,
      locationId,
      located,
      timestamp,
      uploadRecord,
    };
  },
};
</script>

<style>
#scan {
  min-height: 95vh;
}
</style>
