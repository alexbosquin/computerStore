<template>

  <div>
    
    <v-carousel icon="adjust" v-if="dataReady" >
      <v-carousel-item v-for="(computer,i) in computers" v-bind:src="computer.image" :key="i"></v-carousel-item>
    </v-carousel>


      <v-layout row wrap>
        <v-flex xs4  offset-sm v-for="(computer,i) in computers" :key="i">
          <v-card style="margin:5%" class="images"  >
            <v-card-media
              class="white--text"
              height="200px"
              v-bind:src="computer.image"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
               
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text">{{computer.title}}</span><br>
                <span>R$ {{computer.price}}</span><br>
               
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="green" style="margin-left:5%" @click="gotoShowComputer(computer._id)">explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    
  </div>

</template>

<script>
import ServiceListComputer from '@/services/ServiceListComputer'

  export default {
    data () {
      return {
        dataReady:false,
       computers: []
      }
    },
    created: function(){
		this.fetchComputers();
    },
    methods:{

		async fetchComputers(){
			const response = await ServiceListComputer.listComputers();
      this.computers = response.data;
      this.dataReady = true;
      console.log(this.dataReady);
		},
		gotoShowComputer(id)
		{
			this.$router.push('showcomputer?id='+id);
		}

    }
  }
</script>

<style scoped>
.images {
  transform:scale(.9)
}
.images:hover{
  transform:scale(1)
}
.title {
	color:darkgrey;
}
</style>

