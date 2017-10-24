<template>
<div id="app">
  <v-app id="inspire">
    <v-card>
      <v-card-title>
        Computer Management

        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search by title"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item._id }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">
            <v-btn flat icon color="gray" @click="computerImage=props.item.image,dialog=true">
					<v-icon>remove_red_eye</v-icon>
					</v-btn>
          </td>
          <td class="text-xs-right">

	        <v-btn flat icon color="gray" @click="actionEditComputer(props.item)">
					<v-icon>edit</v-icon>
					</v-btn>
					<v-btn flat icon color="gray" @click="actionDeleteComputer(props.item._id)">
					<v-icon>delete</v-icon>
					</v-btn>
				</td>
        
        </template>
     
        <template slot="pageText" scope="{ pageStart, pageStop }">
	<v-btn flat icon color="gray" @click="gotoRegister">
					<v-icon>add</v-icon>
					</v-btn>
          From {{ pageStart }} to {{ pageStop }}

        </template>
                    
      </v-data-table>
    </v-card>
  

  <!--    IMAGE WINDOW    -->

   <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent >
      <v-card>
        <v-card-title class="headline">Images</v-card-title>
         <v-container fluid grid-list-sm>
          <v-layout row wrap >
              <img class="image"  v-bind:src="computerImage" alt="lorem" width="100%" height="100%">
          </v-layout>
        </v-container>
        
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
      

  <!-- PRDUCT EDIT -->

    <v-layout row justify-center>
        <v-dialog v-model="dialogUpdate" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Computer</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Title" required v-model='editTitle'></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Description" multi-line required v-model='editDescription'></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Price" type="number" v-model='editPrice' required></v-text-field>
                  </v-flex>
                </v-layout>
                  <v-flex xs12 >
                    <v-text-field label="Link to Image" required v-model='editImageLink'></v-text-field>
                  </v-flex>
                    <v-container fluid grid-list-sm>
                      <v-layout row wrap >
                          <img class="image"  v-bind:src="editImageLink" alt="ImageNotLoaded" width="100%" height="100%">
                      </v-layout>
                  </v-container>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialogUpdate = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="updateComputer">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>



</v-app>
</div>
</template>

<script>
import ServiceListComputer from '@/services/ServiceListComputer'
import ServiceDeleteComputer from '@/services/ServiceDeleteComputer'
import ServiceUpdateComputer from '@/services/ServiceUpdateComputer'
  export default {
    data () {
      return {
        dialog: false,
        dialogUpdate: false,
        computerImage: '',
        selectedComputer: [],
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Product title',
            align: 'left',
            value: 'title'
          },
          { text: 'ID', value: '_id' },
          { text: 'Description', value: 'description' },
          { text: 'Price (R$)', value: 'price' },
          { text: 'Images', value: 'image' },
        ],
        items: [],
        editTitle:'',
        editDescription:'',
        editPrice:0,
        editImageLink:''
      }
    },
    created: function(){
      this.fetchItems();
    },
    methods: {
      gotoRegister(){
        
        this.$router.push('/computerregister');
      },
      async fetchItems()
            {
               const response = await ServiceListComputer.listComputers();
               this.items = response.data;
               console.log(response.data);
            },

            async actionDeleteComputer(id)
            {
                const response = await ServiceDeleteComputer.deleteComputer(id);
                this.fetchItems();
            },

            actionEditComputer(computer)
            {
                this.selectedComputer = computer;
                this.editTitle = computer.title;
                this.editDescription = computer.description;
                this.editPrice = computer.price;
                this.editImageLink = computer.image;
                this.dialogUpdate = true;
                //this.$router.push('/computerregister?id='+id);
            },
            async updateComputer()
            {
              console.log(this.selectedComputer._id);
              const response = await ServiceUpdateComputer.updateComputer(this.selectedComputer._id,{
                title:this.editTitle,
                description:this.editDescription,
                price:this.editPrice,
                image:this.editImageLink
              });

              if (response.status == 200)
              {
                this.dialogUpdate = false;
                this.fetchItems();
              }
            }
    }
  }
</script>