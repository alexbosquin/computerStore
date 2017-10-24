<template>
<div>
        
          
  <v-layout row style="padding:5%" v-if="dataReady">
    
    <v-flex xs sm8 offset-sm2>
      
      <v-card>

         <v-card-media  v-bind:src="item.image" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn light icon color="white" @click="goback">
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              
            </v-card-title>
            <v-spacer></v-spacer>
          
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">chat_bubble</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.description}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              
              
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon color="indigo">attach_money</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Price (10% discount)</v-list-tile-title>
              <v-list-tile-sub-title>{{discount}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              
            </v-list-tile-action>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">credit_card</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Credit Card 1x</v-list-tile-title>
              <v-list-tile-sub-title>{{item.price}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action><v-icon color="indigo">credit_card</v-icon></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Credit Card</v-list-tile-title>
              <v-list-tile-sub-title>
                12x - {{credit}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
         
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>



</div>
</template>


<script>
import ServiceListComputer from '@/services/ServiceListComputer'

export default {
  data(){
  return{
    dataReady:false,
    item: {},

    discount:0,
    credit: 0,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  } 
  },
  methods:{
    goback(){
      this.$router.push('home');
    },
    async getComputer(id)
    {
        const response = await ServiceListComputer.listComputerByID(id);
        this.item = response.data;
        this.discount = this.calculatePrice_10percentDiscount(this.item.price);
        this.dataReady = true;
        console.log(this.dataReady);
    },
    calculatePrice_10percentDiscount(value){
      let result = parseFloat(value);
        result -= result * 0.10;
      return result;
    },
    calculatePrice_creditCard(value,time)
    {
      let valueCvt = parseFloat(value);
      
      let result = valueCvt * Math.pow( (1+0.02),time );

      this.credit = result.toFixed(2);
    }

    
  },
  mounted(){
 
      this.getComputer(this.$route.query.id);
      setTimeout(()=>{
        this.calculatePrice_creditCard(this.item.price,12);
      },200)
    
  }
}
</script>


<style lang="stylus">
  .media
    height: 100%
    margin: 0
</style>
