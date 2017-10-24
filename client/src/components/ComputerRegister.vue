<template>
<div>
	
  <v-form v-model="valid" ref="form" lazy-validation style="padding:10%">
    <h4>Register Computer</h4>
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
			:counter="500"
			multi-line
      required
    ></v-text-field>
		<v-text-field
      label="Price"
			type="number"
      v-model="price"
      required
    ></v-text-field>
					<v-text-field
					label="ImageLink"
					type="text"
					v-model="image"
					:rules="imageRules"
					required>
					</v-text-field>
					
<p>{{serverResponse}}</p>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
			
  </v-form>
	</div>
</template>

<script>
import ServiceRegisterComputer from '@/services/ServiceRegisterComputer'
  export default {
    data: () => ({
      valid: false,
			image:'',
			imageCount: 1,
			price:0,
			serverResponse:'',
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => v && v.length <= 40 || 'Title must be less than 40 characters'
      ],
      description: '',
      descriptionRules: [
        (v) => !!v || 'Description is required',

        (v) => v && v.length <= 500 || 'Description must be less than 500 characters'
      ],
			image:'',
			imageRules:[
				(v) => !!v || 'Image link is required'
			],

    }),
    methods: {
      async submit () {
          this.checkFields();
        const response = await ServiceRegisterComputer.addComputer({
					title:this.title,
					description:this.description,
					price:this.price,
					image:this.image
				});
				
        this.serverResponse = response.data.Computer;

        if (response.data.error == false)
        {
          this.gotoAdmin();
        }
				
      },
      clear () {
        this.$refs.form.reset()
      },
      checkFields(){
        if (this.title == '' || this.description == '' || this.price == '' || this.image == '')
        {
          this.serverResponse = 'no any field can be empty';
          this.valid = false;
          return
        }
      },
      gotoAdmin(){
        this.$router.push('computeradmin');
      }
    }
  }
	
</script>