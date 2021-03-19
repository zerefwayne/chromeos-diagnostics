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
          <p class="value-xl">
            {{ processMemoryUsage()["used"] }}/{{ processMemoryUsage()["total"]
            }}<span class="unit">GB</span>
          </p>
          <p style="margin-top: 0.5rem; font-size: 1.2rem">
            {{ processMemoryUsage()["usedPercentage"] }}%
          </p>
        </div>
        <div class="graph"></div>
      </div>
    </div>
    <div class="metric-card">
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
              CPU 1: {{ usage }}%
            </div>
          </div>
        </div>
        <div class="graph"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  data() {
    return {
      interval: 1000,
      cpu: {},
      memory: {},
      storage: {},
      lastUpdated: null,
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
      console.log(data);
      let utilization = (1 - data["idle"] / data["total"])*100;
      console.log(data["idle"], data["total"], utilization);
      return Number.parseFloat(utilization.toFixed(2));
    },
    processCPUUsage() {
      let usages = [];
      this.cpu.processors.forEach((processor: any) => {
        usages.push(this.calculateUsagePercentage(processor.usage));
      });
      return usages;
    },
  },
  mounted() {
    setInterval(async () => {
      const data = await this.fetchMetrics();
      console.log(data);
      this.memory = data["memory"];
      this.storage = data["storage"];
      this.cpu = data["cpu"];
      this.lastUpdated = data["time"];
    }, this.interval);
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

  .body {
    display: flex;
  }

  .info {
    flex: 1;
  }

  .graph {
    flex: 0 0 50%;
    background-color: #3664c4;
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