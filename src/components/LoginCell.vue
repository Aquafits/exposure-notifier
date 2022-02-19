<template>
  <div>
    <van-cell-group inset>
      <van-cell is-link title="User"
                :value="currentUserLabel"
                @click="showLoginPopup=true"></van-cell>
    </van-cell-group>
    <van-action-sheet class="login-popup" v-model:show="showLoginPopup" title="User">
      <van-cell-group inset>
        <van-field v-model="emailInput"
                   v-if="!loggedIn"
                   label="Email"
                   placeholder="enter here"></van-field>
      </van-cell-group>
      <div style='margin: 16px;'>
        <van-button v-if="!loggedIn" round block type='primary' @click="onLogin">
          Log in
        </van-button>
        <van-button v-else round block type='primary' @click="onLogout">
          Log out
        </van-button>
      </div>
    </van-action-sheet>

  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LoginCell',
  emits: ['login', 'logout'],
  setup(props, context) {
    const store = useStore();
    const loggedIn = computed(() => store.state.loggedIn);
    const currentUserEmail = computed(() => store.state.currentUser.email);

    const currentUserLabel = computed(() => {
      if (loggedIn.value) {
        return currentUserEmail.value;
      }
      return 'Click to log in';
    });
    const emailInput = ref('');
    const showLoginPopup = ref(false);

    const onLogin = () => {
      store.commit('logIn', emailInput.value);
      showLoginPopup.value = false;
      context.emit('login');
    };
    const onLogout = () => {
      store.commit('logOut');
      emailInput.value = null;
      showLoginPopup.value = false;
      context.emit('logout');
    };

    return {
      loggedIn,
      currentUserEmail,
      currentUserLabel,
      emailInput,
      showLoginPopup,
      onLogin,
      onLogout,
    };
  },
};
</script>
