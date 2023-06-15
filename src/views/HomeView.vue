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
          <div class="modal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ item.PortName }}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>{{ item.PortContent }}</p>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal()">Close</button>
                </div>
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
      var modal = document.querySelector(".modal");
      var modalContent = document.querySelector(".modal-dialog");
      modal.style.display = "block";
      // アニメーションクラスを追加してフェードインさせる
      modalContent.classList.add("fadeIn");
    },
    closeModal() {
      var modal = document.querySelector(".modal");
      var modalContent = document.querySelector(".modal-dialog");
      // アニメーションクラスを削除して非表示にする
      modalContent.classList.remove("fadeIn");
      setTimeout(function() {
        modal.style.display = "none";
      }, 300); // アニメーション時間と同じ時間を設定
    }
  },
};
</script>

<style scoped>
  .modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  width: 300px;
  height: 200px;
  margin: 100px auto;
  padding: 20px;
  opacity: 0;
  transform: translateY(-50px);
  animation-name: modalFadeIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes modalFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>