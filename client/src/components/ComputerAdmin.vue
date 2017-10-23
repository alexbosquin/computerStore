<template>
<div id="app">
  <v-app id="inspire">
    <v-card>
      <v-card-title>
        Computer Management
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
					<v-btn flat icon color="gray" @click="actionEditComputer(props.item._id)">
					<v-icon>edit</v-icon>
					</v-btn>

					<v-btn flat icon color="gray" @click="actionDeleteComputer(props.item._id)">
					<v-icon>delete</v-icon>
					</v-btn>
				</td>
        
        </template>
     
        <template slot="pageText" scope="{ pageStart, pageStop }">
         		  <v-btn flat color="gray" @click="gotoRegister">ADD COMPUTER</v-btn>
        
          From {{ pageStart }} to {{ pageStop }}

        </template>
                    
      </v-data-table>


    </v-card>
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