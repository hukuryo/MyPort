<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="item in userPortsData" :key="item.id">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text"><i class="fa-solid fa-book" style="margin-right: 5px;"></i>{{ item.PortName }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <router-link :to="{ name: 'postDetail', params: { id: item.id }}" class="btn btn-sm btn-outline-secondary"><i class="fa-sharp fa-regular fa-file" style="margin-right: 2px;"></i>View</router-link>
                  <router-link :to="{ name: 'postEdit', params: { id: item.id }}" class="btn btn-sm btn-outline-secondary"><i class="fa-sharp fa-solid fa-file-pen" style="margin-right: 2px;"></i>Edit</router-link>
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

export default {
  name: "PortView",
  data() {
    return {
      userPortsData: [], // ログインしているユーザーの投稿データを保持する配列
      errorMessage: ""
    };
  },
  created() {
    this.getPortFolio();
  },
  methods: {
    getPortFolio() {
      const postUserLocalData = JSON.parse(localStorage.getItem("vuex"));
      axios.get("http://localhost:3000/api/port/get")
        .then((response) => {
          try {
            for(let i = 0; i < response.data.length; i++){
              if(postUserLocalData.id == response.data[i].postUserId.id){
                this.userPortsData.push(response.data[i])
              }
            }
          } catch (e) {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>