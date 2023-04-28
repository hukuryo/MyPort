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
                  <router-link class="btn btn-sm btn-outline-secondary" to="/post/1">View</router-link>
                  <router-link class="btn btn-sm btn-outline-secondary" to="/edit/:id">Edit</router-link>
                </div>
                <small class="text-muted">作成日</small>
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
export default {
  name: 'PortView',
  data(){
    return {
      portsData: {}
    }
  },
  created(){
    this.getMessages()
  },
  methods: {
    getMessages() {  
      axios.get("http://localhost:3000/api/port/get")
        .then(response => {
          this.portsData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>
