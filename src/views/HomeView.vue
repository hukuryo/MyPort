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
                  <button @click="openModal()" class="btn btn-sm btn-outline-secondary"><i class="fa-sharp fa-regular fa-file" style="margin-right: 2px;"></i>モーダルを表示</button>
                  <router-link :to="{ name: 'postEdit', params: { id: item.id }}" class="btn btn-sm btn-outline-secondary"><i class="fa-sharp fa-solid fa-file-pen" style="margin-right: 2px;"></i>Edit</router-link>
                </div>
              </div>
            </div>
          </div>
          <div id="modal">
          <div id="modal-content">
            <h2>{{ item.PortName }}</h2>
            <p>{{ item.PortContent  }}</p>
            <button @click="closeModal()">閉じる</button>
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
      errorMessage: "",
      modalVisible: false
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
    openModal() {
      const modal = document.getElementById("modal");
      // モーダルを表示する
      modal.style.display = "block";
    },
    closeModal() {
      // モーダル要素を取得
      const modal = document.getElementById("modal");
      // モーダルを非表示にする
      modal.style.display = "none";
    },
  },
};
</script>

<style scoped>
  .modal {
    display: none; /* 最初は非表示 */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4); /* 背景を半透明にする */
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  /* モーダルのスタイル */
    #modal {
      display: none; /* 最初は非表示にする */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* 半透明の背景色 */
      z-index: 9999;
    }
    
    #modal-content {
      background-color: #fff;
      width: 300px;
      height: 200px;
      margin: 100px auto;
      padding: 20px;
    }
</style>