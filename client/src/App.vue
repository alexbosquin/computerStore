<template>
  <div id="app">
    <v-toolbar light>
    <v-toolbar-title>Gaming Computer Store</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" v-for="item in items" :key="item.text">
      <v-btn flat @click="gotoPage(item.route)">{{ item.text }}</v-btn>
    </v-toolbar-items>
    <div class="g-signin2" data-onsuccess="onSignIn">teste</div>
  </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'app',
        items: [
          {
            text: 'Home',
            route: 'home'
          },
          {
            text: 'Dashboard',
            route: 'computeradmin'
          }
        ]
      }
    },
    methods:{
      gotoPage(route)
      {
        this.$router.push(route);
      }
    }
  }
</script>

