<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="item in portsData" :key="item.id">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text">{{ item.PortName }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <router-link :to= "{name: 'postDetail', params: {id: item.id}}" class="btn btn-sm btn-outline-secondary" >View</router-link>
                  <router-link :to= "{name: 'postEdit', params: {id: item.id}}" class="btn btn-sm btn-outline-secondary" >Edit</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const postUserLocalId = JSON.parse(localStorage.getItem("vuex"))

export default {
  name: 'PortView',
  data(){
    return {
      portsData: {}
    }
  },
  created(){
    this.getPortFolio()
  },
  methods: {
    getPortFolio() {  
      axios.get("http://localhost:3000/api/port/get")
        .then(response => {
          console.log(response.data[0].postUserId)
          for(let i = 0; i <= response.data.length; i++){
            if(postUserLocalId.id === response.data[i].postUserId){
              this.portsData = response.data
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>
