<template>
  <div>
    <van-cell-group title='Your status' style="background: #f7f8fa" inset>
      <div style="text-align: center">
        <van-icon name="success" size="28vh" style="color: #42b983"/>
      </div>
    </van-cell-group>

    <van-cell-group title='News' style="background: #f7f8fa" inset>
      <van-cell title="Active cases" value="66"/>
      <van-cell title="Positive cases yesterday" value="6"/>
      <van-cell title="Active cases around you" value="66"/>
      <van-cell title="Positive cases yesterday around you" value="6"/>
    </van-cell-group>

    <van-cell-group title='Self report test status' inset>
      <van-field v-model='email' label="Email" name="email"
                 placeholder='email used during past visits'/>
    </van-cell-group>
    <div style='margin: 16px;'>
      <van-button round block type='success'>
        Negative
      </van-button>
    </div>
    <div style='margin: 16px;'>
      <van-button round block type='warning'>
        Positive
      </van-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
};
</script>
