<template>
<main class="container">
    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0">Profile</h6>
        <div class="d-flex text-muted pt-3">
            <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">username</strong></p>
        </div>
        <div class="d-flex text-muted pt-3">
            <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">skill</strong></p>
        </div>
        <div class="d-flex text-muted pt-3">
        </div>
        <small class="d-block text-end mt-3">
        </small>
    </div>

    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0">MySite</h6>
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                </div>
                <span class="d-block">GitHub</span>
            </div>
        </div>    
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                </div>
                <span class="d-block">Qiita</span>
            </div>
        </div>    
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                </div>
                <span class="d-block">LAPRAS</span>
            </div>
        </div>    
    </div>
    <router-link class="btn btn-success" to="/editMyPage">プロフィール編集</router-link>
</main>
</template>

<script>
import axios from "axios";
const postUserName = JSON.parse(localStorage.getItem("vuex"))

export default {
    data(){
        return{
            username: "",
            skill: "",
            github: "",
            qiita: "",
            lapras: ""
        }
    },
    created(){
        this.getPortFolio()
    },
    methods: {
        getPortFolio() {  
            axios.get("http://localhost:3000/api/port/detail/get")
                .then(response => {
                    for(let i = 0; i <= response.data.length; i++){
                        const name = response.data[i].username;
                        if(postUserName.username === name){
                            const responseData = response.data[i]
                            this.username = responseData.username
                            this.skill = responseData.skill
                            this.github = responseData.github
                            this.qiita = responseData.qiita
                            this.lapras = responseData.lapras
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