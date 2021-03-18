<template>
  <div>
    <h2>
      System Data
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    const APP_ID = "elhcpbmdpgckegclfnboafhdnkkmbalo";
    window.chrome.runtime.sendMessage(APP_ID, {hello: "hello"}, function(response) {
      console.log("Response from extension", response);
    });
  }
})
</script>

<style lang="scss" scoped>

</style>