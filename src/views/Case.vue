<template>
  <div>
    <van-nav-bar title='Case Stats'/>
    <heatmap title="Active Cases" mode="ACTIVE"></heatmap>
    <heatmap title="Exposed Cases" mode="EXPOSED"></heatmap>
    <van-cell-group title="Cases">
<!--      <van-cell>-->
      <v-chart ref='lineChart' class="chart" :option="option"></v-chart>
<!--      </van-cell>-->
    </van-cell-group>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Heatmap from '@/components/Heatmap.vue';
import VChart, { THEME_KEY } from 'vue-echarts';

export default {
  name: 'Case',
  components: { Heatmap, VChart },
  provide: {
    [THEME_KEY]: 'light',
  },
  setup() {
    const lineChart = ref();
    const resizeChart = () => {
      lineChart.value.resize();
    };
    onMounted(() => {
      // don't modify this, solved a bug with map height
      const maps = document.querySelectorAll('.vue-map');
      for (let i = 0; i < maps.length; i += 1) {
        console.log('selected', i);
        const mapId = `vue-map${i}`;
        maps[i].id = mapId;
        document.getElementById(mapId).style.minHeight = '40vh';
      }

      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      window.addEventListener('resize', resizeChart);
    });

    const option = ref({
      xAxis: {
        type: 'category',
        data: ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    });

    return {
      option,
      resizeChart,
    };
  },
};
</script>

<style scoped>
.chart{
  margin-left: 20px;
  margin-right: 20px;
  height: 40vh;
}
</style>
