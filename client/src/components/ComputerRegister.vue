<template>
	<div>
		<h4 class="text-md-center">Center align on medium viewport sizes</h4>
              <v-form v-model="valid" style="padding:10%">
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
				<p>{{result}}</p>
			</v-form>

	</div>
</template>

<script>
import ServiceRegisterComputer from '@/services/ServiceRegisterComputer'


  export default {
    data: () => ({
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
	  }
  	}
    }
  }
</script>
