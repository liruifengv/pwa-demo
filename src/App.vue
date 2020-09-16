<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/qrcode">qrcode</router-link> |
      <router-link to="/sao">扫一扫</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'APP',
  data () {
    return {
    }
  },
  components: {

  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
