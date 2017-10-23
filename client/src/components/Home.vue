<template>

  <div>
    
    <v-carousel icon="adjust" >
		
      <v-carousel-item  class="images" v-for="(computer,i) in computers" v-bind:src="computer.images[0].src" :key="i"></v-carousel-item>
    </v-carousel>


      <v-layout row wrap>
        <v-flex xs4  offset-sm v-for="(computer,i) in computers" :key="i">
          <v-card style="margin:5%"  >
            <v-card-media
              class="white--text"
              height="200px"
              v-bind:src="computer.images[0].src"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline title" >{{computer.title}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
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
		computers: [],
		iterator: 0
      }
    },
    created: function(){
		this.fetchComputers();
    },
    methods:{

		async fetchComputers(){
			const response = await ServiceListComputer.listComputers();
			this.computers = response.data;
			this.iterator = this.objectLength(this.computers);
		},
		objectLength(obj){

			var counter = 0;

			for(let i in obj)
			{
			counter +=1;
			}
			return counter
		}

    }
  }
</script>

<style scoped>
.images {
  transform:scale(.8)
}
.images:hover{
  transform:scale(1)
}
.title {
	color:darkgrey;
}
</style>

