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

