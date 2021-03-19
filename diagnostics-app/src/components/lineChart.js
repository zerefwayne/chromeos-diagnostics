import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    this.renderBarChart();
  },
  methods: {
    renderBarChart: function () {
      this.renderChart(this.chartData, this.options);
    }
  },
  watch: {
    chartData: function () {
      this.$data._chart.update();
      this.renderBarChart();
    }
  }
}
