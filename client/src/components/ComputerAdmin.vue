<template>

    <div>
      <h1>Items</h1>

        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <router-link :to="{ name: 'ComputerRegister' }" class="btn btn-primary">Add Computer</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Title</td>
                <td>Item Price</td>
                <td>Item Description</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items">
                    <td>{{ item._id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <button @click="actionDeleteComputer(item._id)">Remove</button>
                        <button >Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>

import ServiceListComputer from '@/services/ServiceListComputer'
import ServiceDeleteComputer from '@/services/ServiceDeleteComputer'
    export default {
        data(){
            return{
                items: [],
                result: ''
            }
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            async fetchItems()
            {
               const response = await ServiceListComputer.listComputers();
               this.items = response.data;
            },

            async actionDeleteComputer(id)
            {
                const response = await ServiceDeleteComputer.deleteComputer(id);
                this.fetchItems();
                //TODO: ADD beautiful card
                setTimeout(function() {
                    alert(response.data);
                }, 200);
            }
        }
    }

</script>