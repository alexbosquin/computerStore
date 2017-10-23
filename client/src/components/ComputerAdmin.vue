<template>
<div id="app">
  <v-app id="inspire">
    <v-card>
      <v-card-title>
        Computer Management
                 		  <v-btn flat color="gray" @click="gotoRegister">ADD COMPUTER</v-btn>
       
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
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
            <v-btn flat icon color="gray" @click="computerImages=props.item.images,dialog=true">
					<v-icon>remove_red_eye</v-icon>
					</v-btn>
          </td>
          <td class="text-xs-right">
					<v-btn flat icon color="gray" @click="computerSelected=props.item,dialogUpdate=true">
					<v-icon>edit</v-icon>
					</v-btn>

					<v-btn flat icon color="gray" @click="actionDeleteComputer(props.item._id)">
					<v-icon>delete</v-icon>
					</v-btn>
				</td>
        
        </template>
     
        <template slot="pageText" scope="{ pageStart, pageStop }">

          From {{ pageStart }} to {{ pageStop }}

        </template>
                    
      </v-data-table>


    </v-card>
  

  

   <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent >
      <v-card>
        <v-card-title class="headline">Images</v-card-title>
         <v-container fluid grid-list-sm>
          <v-layout row wrap >
            <v-flex  v-for="(image, i) in computerImages" :key="i">
              <img class="image"  v-bind:src="image.src" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


<v-layout row justify-center >
    <v-dialog v-model="dialogUpdate" persistent >
      <v-card>
        <v-card-title class="headline">Images</v-card-title>
         <v-container fluid grid-list-sm>
          <v-layout row wrap >
            <v-flex  v-for="(image, i) in computerImages" :key="i">
              <img class="image"  v-bind:src="image.src" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">close</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">edit</v-btn>
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
import ComputerRegister from '@/components/ComputerRegister.vue'
  export default {
    data () {
      return {
        dialog: false,
        dialogUpdate: false,
        computerImages: [],
        computerSelected: [],
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
        items: []
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

            actionEditComputer(id)
            {
                //this.$router.params = 'test';
                //console.log(this.$router.params);
                this.$router.push('/computeredit?id='+id);
            }
    }
  }
</script>