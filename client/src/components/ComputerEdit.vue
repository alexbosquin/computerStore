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
   <div class="col-md-4">
    	<router-link :to="{ name: 'ComputerAdmin' }" class="btn btn-primary">Manage Computers</router-link>
   </div>
  </div>

</template>

<script>

import ServiceListComputer from '@/services/ServiceListComputer'
export default {
  name: 'HelloWorld',
  data () {
    return {
	  msg: 'Register a Computer',
	  result: ' click add to register a computer',
      title: '',
      description: '',
	  price: 0.00,
	  items: []
      
	}
	
  },
  created: function()
  {
	  this.fetchData();

  },
  methods: {
	  async fetchData(){
		 const response = await ServiceListComputer.listComputerByID(this.$route.query.id);
			console.log(response.data);
		 },

	  async addComputer(){
		  const response = await ServiceRegisterComputer.addComputer({
			  title:this.title,
			  description:this.description,
			  price:this.price
		  });
      this.result = response.data.Computer;
	  if (response.data.error == false)
	  {
		  this.title = '';
		  this.description = '';
		  this.price = '';
	  }
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
