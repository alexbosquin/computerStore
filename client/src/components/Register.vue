<template>
  <div class="reg">
    <h1>{{ msg }}</h1>
    <input 
      type="email"
      placeholder="email"
      name="email"
      v-model="email"
    />
        <input 
      type="password"
      placeholder="password"
      name="password"
      v-model="password"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Register',
      email:'',
      password:''
    }
  },
  methods:{
    async register(){
      const response = await AuthenticationServices.register({
        email:this.email,
        password:this.password
      });
      console.log(response.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
