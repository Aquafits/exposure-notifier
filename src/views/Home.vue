<template>
  <div>
    <div style="padding-top: 2.5vh">
      <van-cell-group title='Your status' class="status-panel" inset>
        <van-icon :name="statusIcon" size="25vh" :color="statusColor"/>
      </van-cell-group>
      <LoginCell @login="onLogin" @logout="onLogout"/>
    </div>

    <van-cell-group title='Cases' style="background: #f7f8fa" inset>
      <van-cell is-link title="Within" value="California"/>
      <van-cell center title="Only Yesterday">
        <template #right-icon>
          <van-switch v-model="onlyYesterday" size="24"/>
        </template>
      </van-cell>
      <van-cell title="Active cases"
                :value="onlyYesterday ? activeCasesYesterday: activeCases"/>
      <van-cell title="Active cases around you"
                :value=" onlyYesterday? activeCasesYesterdayAroundYou: activeCasesYesterday"/>
    </van-cell-group>

    <van-cell-group title="Volunteering test report" style="background: #f7f8fa" inset>
      <div style='margin: 16px;'>
        <van-button round block type='success'
                    :disabled="!store.state.loggedIn"
                    @click="stageTestResult('negative')"
        >
          Negative
        </van-button>
      </div>
      <div style='margin: 16px;'>
        <van-button round block color="#e37474"
                    :disabled="!store.state.loggedIn"
                    @click="stageTestResult('negative')"
        >
          Positive
        </van-button>
      </div>
    </van-cell-group>

    <van-action-sheet
      :show="showConfirm"
      :actions="[{name: 'Confirm'}]"
      cancel-text="Cancel"
      close-on-click-action
      @click="commitTestResult"
      @cancel="showConfirm = false"
    />

  </div>
</template>

<script>
// @ is an alias to /src

import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import LoginCell from '@/components/LoginCell.vue';
import RecordService from '@/services/RecordService';

export default {
  name: 'Home',
  components: { LoginCell },
  setup() {
    const store = useStore();

    // your status
    const statusIcon = computed(() => store.state.exposureStatus.icon);
    const statusColor = computed(() => store.state.exposureStatus.color);
    const statusVisualization = new Map([
      ['UNKNOWN', {
        status: 'UNKNOWN',
        icon: 'success',
        color: '#07c160',
      }],
      ['EXPOSED', {
        status: 'EXPOSED',
        icon: 'fail',
        color: '#ff976a',
      }],
      ['ACTIVE', {
        status: 'ACTIVE',
        icon: 'circle',
        color: '#ee0a24',
      }],
    ]);
    const onLogin = () => {
      RecordService.getStatus({ email: store.state.currentUser.email })
        .then((response) => {
          let status = response.data;
          if (!statusVisualization.has(status)) {
            status = 'UNKNOWN';
          }
          store.commit('setExposureStatus', statusVisualization.get(status));
        })
        .catch((e) => {
          if (e.response) {
            // if email not exist (bad request)
            if (e.response.status === 400) {
              store.commit('setExposureStatus', statusVisualization.get('UNKNOWN'));
            }
          }
        });
    };
    const onLogout = () => {
      store.commit('resetExposureStatus');
    };

    // news
    const geoPermission = ref(false);
    const onlyYesterday = ref(true);
    const activeCases = ref(0);
    const activeCasesAroundYou = ref(0);
    const activeCasesYesterday = ref(0);
    const activeCasesYesterdayAroundYou = ref(0);
    navigator.geolocation.getCurrentPosition((position) => {
      geoPermission.value = true;
      RecordService.getDailyCases({
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.latitude),
      })
        .then((response) => {
          const { data } = response;
          activeCases.value = data.activeCases;
          activeCasesAroundYou.value = data.activeCasesAroundYou;
          activeCasesYesterday.value = data.activeCasesYesterday;
          activeCasesYesterdayAroundYou.value = data.activeCasesYesterdayAroundYou;
        })
        .catch((e) => {
          console.log(e);
        });
    }, () => {
      geoPermission.value = false;
    });

    // volunteer report
    const showConfirm = ref(false);
    const testResult = ref(null);
    const stageTestResult = (res) => {
      showConfirm.value = true;
      testResult.value = res;
    };
    const commitTestResult = () => {
      RecordService.uploadStatus({
        email: store.state.currentUser.email,
        status: testResult.value,
        timestamp: '',
      })
        .then((response) => {
          console.log('Exposed demo: ', response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return {
      store,
      statusIcon,
      statusColor,
      onLogin,
      onLogout,

      geoPermission,
      onlyYesterday,
      activeCases,
      activeCasesAroundYou,
      activeCasesYesterday,
      activeCasesYesterdayAroundYou,

      showConfirm,
      testResult,
      stageTestResult,
      commitTestResult,
    };
  },
};
</script>

<style>
.status-panel {
  background: #f7f8fa;
  text-align: center;
  height: 30vh;
}
</style>
