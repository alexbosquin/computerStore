<template>
	<div style="padding:2%">

<v-layout >
		<v-flex >
		<v-card class="grid">
			<v-toolbar color="white" flat>
			<v-btn icon light @click="gotoAdmin">
				<v-icon color="grey darken-2">arrow_back</v-icon>
			</v-btn>
			<v-toolbar-title class="grey--text text--darken-4">Register Computer</v-toolbar-title>
			</v-toolbar>
			<div style="padding:5%">
				<v-form v-model="valid" >
				<v-text-field
				label="Title"
				v-model="title"
				:rules="titleRules"
				:counter="40"
				required
				></v-text-field>
				<v-text-field
				label="Description"
				v-model="description"
				:rules="descriptionRules"
				required
				:counter="500"
				multi-line
				></v-text-field>
				<v-text-field
				label="Price"
				type="number"
				v-model="price"
				required
				></v-text-field>
				
				</v-form>
			</div>
			<v-container fluid grid-list-sm class="text-md-center">
			<v-layout row wrap >
				<v-flex s v-for="i in 1" :key="i">
					
				<img class="image" v-bind:src="''" alt="lorem" width="100%" height="100%">
					
				</v-flex>
				
			</v-layout>
				<p>{{result}}</p>
				<div>
              		<v-btn flat color="primary" @click="addComputer">add computer</v-btn>
            	</div>
			</v-container>
			
			<v-footer class="mt-5">

			
			</v-footer>
		</v-card>
		</v-flex>
	</v-layout>

			

	
	
	

	</div>
</template>

<script>
import ServiceRegisterComputer from '@/services/ServiceRegisterComputer'


  export default {
    data: () => ({
		dialog: false,
		result:'',
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v && v.length <= 40 || 'Title must be less than 40 characters',
	  	(v) => v && v.length >= 5 || 'Title is too short!'
	  ],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Description is required',
        (v) => v && v.length <= 500 || 'Description must be less than 25 characters',
		(v) => v && v.length >= 50 || 'Description is too short!'
		   ],
		price: ''
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          
        }
      },
      clear () {
		this.title = '';
		this.description = '';
		this.price = 0;
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
		  this.gotoAdmin();
	  }
	  },
	  gotoAdmin(){
        
        this.$router.push('/computeradmin');
      }



    }
  }
</script>
