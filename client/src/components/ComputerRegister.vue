<template>
  <div class="reg">
    <h1>{{ msg }}</h1>
    <input 
      type="text"
      placeholder="title"
      name="title"
      v-model="title"
    />

    <br>

    <input
      type="textarea"
      placeholder="product description"
      name="description"
      v-model="description" 
      />

    <br>

      <input
      type="number"
      placeholder="price"
      name="price"
      v-model="price"
      />
    
	<br>

    <button @click="addComputer">Add</button>
	<br>
	<p>{{result}}</p>
  </div>
</template>

<script>

import ServiceRegisterComputer from '@/services/ServiceRegisterComputer'

export default {
  name: 'HelloWorld',
  data () {
    return {
	  msg: 'Register a Computer',
	  result: '',
      title: '',
      description: '',
      price: 0.00
      
    }
  },
  methods: {
	  async addComputer(){
		  const response = await ServiceRegisterComputer.addComputer({
			  title:this.title,
			  description:this.description,
			  price:this.price
		  });
		  this.result = response.data.message.title;
		  console.log(response);
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
