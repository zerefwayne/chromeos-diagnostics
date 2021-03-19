<template>
  <div>
    <h2>System Data</h2>
    <p style="margin-top: 1rem">
      Last Updated:
      {{ lastUpdated ? toLastUpdated() : "Fetching latest data..." }}
    </p>
    <div class="metric-card">
      <p class="heading">MEMORY</p>
      <div class="body">
        <div class="info">
          <p class="value-xl mb-0">
            {{ processMemoryUsage()["used"] }}/{{ processMemoryUsage()["total"]
            }}<span class="unit">GB</span>
          </p>
          <p style="font-size: 1.2rem">
            {{ processMemoryUsage()["usedPercentage"] }}%
          </p>
        </div>
        <div class="graph">
          <line-chart
            v-if="lastUpdated !== null"
            :chart-data="memoryGraphData"
            :height="100"
            :options="memoryOptions"
          ></line-chart>
        </div>
      </div>
    </div>
    <div class="metric-card cpu">
      <p class="heading">CPU</p>
      <div class="body">
        <div class="info">
          <ul style="list-style: none; margin-top: 0.5rem">
            <li><b>Model Name:</b> {{ cpu["modelName"] }}</li>
            <li style="margin-top: 0.4rem">
              <b>Architecture:</b> {{ cpu["archName"] }}
            </li>
            <li style="margin-top: 0.4rem">
              <b>Number of Cores:</b> {{ cpu["numOfProcessors"] }}
            </li>
          </ul>
          <div class="row m-0">
            <div
              v-for="(usage, index) in processCPUUsage()"
              :key="'cpu' + index"
              class="col col-md-3 mt-2 px-0"
            >
              CPU {{ index + 1 }}: {{ usage }}%
            </div>
          </div>
        </div>
        <div class="graph py-3">
          <line-chart
            v-if="lastUpdated !== null"
            :chart-data="cpugraphdata"
            :height="250"
            :options="cpuOptions"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import LineChart from "@/components/lineChart";

export default Vue.extend({
  components: {
    LineChart,
  },
  data() {
    return {
      interval: 1000,
      cpu: {},
      memory: {},
      storage: {},
      lastUpdated: null,
      cpugraphdata: {
        labels: [],
        datasets: [],
      },
      dummyDatasets: [],
      memoryGraphData: {
        labels: [],
        datasets: [],
      },
      memoryOptions: {
        //Chart.js options
        animation: {
          duration: 3,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white",
                min: 0,
                max: 100
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      cpuOptions: {
        //Chart.js options
        animation: {
          duration: 3,
        },
        scales: {
          scaleLabel: {
                fontColor: "white"
              },
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              gridLines: {
                display: true,
              },
              
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "white",
            boxWidth: 15
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchMetrics() {
      return new Promise((resolve, reject) => {
        const EXTENSION_ID = process.env.VUE_APP_EXTENSION_ID;
        window.chrome.runtime.sendMessage(
          EXTENSION_ID,
          { type: "SEND_METRICS" },
          function (response: any) {
            resolve(response);
          }
        );
      });
    },
    toGB(bytes: number) {
      return Number.parseFloat((bytes / 1000000000).toFixed(2));
    },
    toLastUpdated() {
      return moment(this.lastUpdated).format("MMMM Do YYYY, h:mm:ss a");
    },
    processMemoryUsage() {
      let used = this.memory.capacity - this.memory.availableCapacity;
      let total = this.memory.capacity;
      let usedPercentage = Number.parseFloat(((used * 100) / total).toFixed(2));

      used = this.toGB(used);
      total = this.toGB(total);
      return { used, usedPercentage, total };
    },
    calculateUsagePercentage(data: any) {
      let utilization = (1 - data["idle"] / data["total"]) * 100;
      return Number.parseFloat(utilization.toFixed(2));
    },
    processCPUUsage() {
      let usages = [];
      this.cpu.processors.forEach((processor: any) => {
        usages.push(this.calculateUsagePercentage(processor.usage));
      });
      return usages;
    },
    pushCPUData() {
      let labels = this.cpugraphdata.labels;
      labels.push(labels.length + 1);

      this.cpu.processors.forEach((processor: any, index: number) => {
        let usage = this.calculateUsagePercentage(processor.usage);
        // console.log(index, usage, processor);
        this.dummyDatasets[index].data.push(usage);
        // console.log(index, this.cpugraphdata.datasets[index].data.length);
      });
      this.cpugraphdata = {
        labels,
        datasets: this.dummyDatasets,
      };

      let dummyMemoryData = { ...this.memoryGraphData.datasets[0] };
      dummyMemoryData.data.push(this.processMemoryUsage()["usedPercentage"]);
      this.memoryGraphData = {
        labels,
        datasets: [dummyMemoryData],
      };

      // console.log("PUSHED NEW DATA", this.cpugraphdata);
    },
    initalizeCPUGraphData() {
      let colors = [
        "#FF9172",
        "#386BD7",
        "#42BAFE",
        "#92B2F0",
        "#D9D9D9",
        "#0052CC",
        "#FFFFFF",
        "#C4C4C4",
      ];
      this.cpu.processors.forEach((processor: any, index: number) => {
        const usage = processor["usage"];
        let dataset = {
          data: [],
          label: "CPU" + index,
          borderColor: colors[index % 8],
          fill: false,
          pointRadius: 0,
          lineTension: 0,
        };
        this.dummyDatasets.push(dataset);
      });
      this.cpugraphdata.datasets = this.dummyDatasets;

      this.memoryGraphData.datasets = [
        {
          data: [],
          label: "Memory Usage",
          borderColor: "#ffffff",
          fill: false,
          pointRadius: 0,
          lineTension: 0,
        },
      ];
    },
  },
  mounted() {
    setInterval(async () => {
      const data = await this.fetchMetrics();
      console.log(data);
      this.memory = data["memory"];
      this.storage = data["storage"];
      this.cpu = data["cpu"];
      if (this.lastUpdated === null) {
        this.initalizeCPUGraphData();
      }
      this.lastUpdated = data["time"];
      this.pushCPUData();
    }, this.interval);
  },
  watch: {
    chartData() {
      this.$data._chart.update();
    },
  },
});
</script>

<style lang="scss" scoped>
.metric-card {
  background-color: #3a6cd7;
  margin-top: 2em;
  padding: 1em 2em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;

  &.cpu {
    background-color: #141414;

    .graph {
      background-color: #2a2e32;
    }
  }

  .body {
    display: flex;
  }

  .info {
    flex: 1;
  }

  .graph {
    flex: 0 0 50%;
    background-color: #3664c4;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: lighter;
    font-size: 2rem;
    color: #555;
  }

  .heading {
    font-family: "Nunito";
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  .value-xl {
    font-size: 2em;
    font-weight: bold;
  }

  .unit {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ccc;
    margin-left: 0.2rem;
  }
}
</style>
