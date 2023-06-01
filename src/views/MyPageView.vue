<template>
<main class="container">
    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0"><i class="fa-solid fa-address-card"></i>プロフィール</h6>
        <div class="d-flex text-muted pt-3">
            <h5 class="pb-3 mb-0"><i class="fa-solid fa-face-smile"></i>ユーザー名</h5>
        </div>
        <p style="text-align: left;">{{ this.username }}</p>
        <div class="d-flex text-muted pt-3">
            <h5 class="pb-3 mb-0"><i class="fa-solid fa-pen"></i>スキル</h5>
        </div>
        <p style="text-align: left;">{{ this.skill }}</p>
        <div class="d-flex text-muted pt-3">
            <h5 class="pb-3 mb-0"><i class="fa-solid fa-globe"></i>フレームワーク</h5>
        </div>
        <p style="text-align: left;">{{ this.framework }}</p>
    </div>

    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0"><i class="fa-solid fa-sitemap"></i>自分のサイト</h6>
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                    <h5 class="d-block"><i class="fa-brands fa-github" style="margin-right: 3px;"></i>GitHub</h5>
                </div>
                <p style="text-align: left;">{{ this.github }}</p>
            </div>
        </div>    
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                    <h5 class="d-block"><i class="fa-solid fa-comment"></i>Qiita</h5>
                </div>
                <p style="text-align: left;">{{ this.qiita }}</p>
            </div>
        </div>    
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                    <h5 class="d-block" style="text-align: left;"><i class="fa-solid fa-shield-halved"></i>LAPRAS</h5>
                </div>
                <p style="text-align: left;">{{ this.lapras }}</p>
            </div>
        </div>    
        <div class="d-flex text-muted pt-3">
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                    <h5 class="d-block" style="text-align: left;"><i class="fa-brands fa-twitter" style="margin-right: 3px;"></i>twitter</h5>
                </div>
                <p style="text-align: left;">{{ this.twitter }}</p>
            </div>
        </div>    
    </div>
    <router-link class="btn btn-success" to="/editMyPage"><i class="fa-solid fa-pen-to-square"></i>プロフィール編集</router-link>
</main>
</template>

<script>
import axios from "axios";
const postUserName = JSON.parse(localStorage.getItem("vuex"))

export default {
    data(){
        return{
            username: postUserName.username,
            skill: "",
            framework: "",
            github: "",
            qiita: "",
            lapras: "",
            twitter: ""
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
                        if(postUserName.username == name){
                            const responseData = response.data[i]
                            this.skill = responseData.skill
                            this.framework = responseData.framework
                            this.github = responseData.github
                            this.qiita = responseData.qiita
                            this.lapras = responseData.lapras,
                            this.twitter = responseData.twitter
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