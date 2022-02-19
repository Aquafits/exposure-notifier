<template>
  <div id='scan'>
    <van-nav-bar title='Scan QR code'/>
    <van-cell-group v-if="!located" title='Scanner' inset>
      <Scanner ref='scanner' @decode='onDecode'></Scanner>
    </van-cell-group>

    <van-cell-group title='You are visiting...' inset>
      <van-cell title="Location Id" :value='locationId' label='scan to get location id'/>
    </van-cell-group>
    <LoginCell style="padding-top: 16px"/>
    <div style='margin: 16px;'>
      <van-button round block type='primary'
                  :disabled="!store.state.loggedIn"
                  @click='uploadRecord'
      >
        Submit
      </van-button>
    </div>
  </div>

</template>

<script>
import Scanner from '@/components/Scanner.vue';
import LoginCell from '@/components/LoginCell.vue';
import RecordService from '@/services/RecordService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Toast } from 'vant';
import { useStore } from 'vuex';

export default {
  name: 'Scan',
  components: {
    LoginCell,
    Scanner,
  },
  setup() {
    const store = useStore();
    const locationId = ref('');
    const located = ref(false);
    const onDecode = (api) => {
      const id = api.substring(api.lastIndexOf('/') + 1);
      if (!Number.isNaN(Number(id))) {
        locationId.value = id;
        Toast({
          message: 'Success',
          position: 'bottom',
        });
      } else {
        Toast({
          message: 'Not a valid location',
          position: 'bottom',
        });
      }
    };
    if (useRoute().params.locationId) {
      locationId.value = useRoute().params.locationId;
      located.value = true;
    }
    const timestamp = ref('');

    const uploadRecord = () => {
      RecordService.uploadRecord({
        email: store.state.currentUser.email,
        locationId: locationId.value,
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
      store,
      locationId,
      located,
      timestamp,
      onDecode,
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
