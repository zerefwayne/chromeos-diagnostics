<template>
  <div id="app">
    <div id="app-container">
      <div id="app-sidebar">
        <div id="app-branding">
          <img src="./assets/logo.png" alt="ChromeOS Diagnostics" height="35%" />
        </div>
      </div>
      <div id="app-router">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
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
  background-color: #2A2E32;
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
