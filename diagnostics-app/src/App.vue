<template>
  <div id="app">
    <div id="app-container">
      <div id="app-sidebar">
        <div id="app-branding">
          <img
            src="./assets/logo.png"
            alt="ChromeOS Diagnostics"
            height="37%"
          />
        </div>
        <div id="app-nav">
          <div class="nav-heading">NAVIGATION</div>
          <ul>
            <router-link
              tag="li"
              v-for="item in navigationItems"
              :to="item.to"
              v-bind:key="item.alt"
              active-class="active-li"
            >
              <img :src="item.icon" :alt="item.alt" />
              <p>{{ item.text }}</p>
            </router-link>
          </ul>
        </div>
      </div>
      <div id="app-router">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DataIcon from "@/assets/icons/data-light.svg";
import DiagIcon from "@/assets/icons/diag-light.svg";
import StateIcon from "@/assets/icons/state-light.svg";

export default Vue.extend({
  data() {
    return {
      navigationItems: [
        {
          alt: "Data",
          icon: DataIcon,
          text: "System Data",
          to: "data",
        },
        {
          alt: "State",
          icon: StateIcon,
          text: "System State",
          to: "state",
        },
        {
          alt: "Diagnostics",
          icon: DiagIcon,
          text: "Diagnostics Manager",
          to: "diagnostics",
        },
      ],
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  color: white;
  background-color: #272b2f;
  height: 100vh;
  width: 100%;
  padding: 3em;
}

#app-container {
  height: 100%;
  width: 100%;
  background-color: #212529;
  border-radius: 1.5em;
  display: flex;
  overflow: hidden;
}

#app-sidebar {
  flex: 0 0 20%;
  background-color: #2a2e32;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
}

#app-router {
  flex: 1;
  background-color: #212529;
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
}

#app-branding {
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app-nav {
  padding: 1em;

  .nav-heading {
    font-family: "Nunito";
    font-weight: bold;
    color: #a9a9a9;
  }

  ul {
    list-style: none;
    margin-top: 1em;
  }

  li {
    margin-top: 0.5em;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #c7c7c7;
    padding: 0.5em 1em;
    border-radius: 5px;

    p {
      text-align: center;
    }

    img {
      height: 1.2em;
      margin-right: 1em;
      fill: pink;
    }
  }

  .active-li {
    background-color: #3a6cd7;
    color: white;
    padding-left: 1.1em;
    transition: all 200ms ease-out;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
