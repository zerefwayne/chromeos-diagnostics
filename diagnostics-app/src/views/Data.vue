<template>
  <div>
    <h2>System Data</h2>
    <p style="margin-top: 1rem">
      Last Updated:
      {{ lastUpdated ? toLastUpdated() : "Fetching latest data..." }}
    </p>
    <div class="metric-card">
      <p class="heading">RAM</p>
      <p class="value-xl">
        {{ toGB(memory.capacity - memory.availableCapacity) }}/{{
          toGB(memory.capacity)
        }}<span class="unit">GB</span>
      </p>
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
      return (bytes / 1000000000).toFixed(2);
    },
    toLastUpdated() {
      return moment(this.lastUpdated).format("MMMM Do YYYY, h:mm:ss a");
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