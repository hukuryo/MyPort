<template>
<main class="container">
    <form class="needs-validation" novalidate="" >
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">プロフィール編集</h6>
            <div class="d-flex text-muted pt-3">
                <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">username</strong></p>
            </div>
            <input type="text" class="form-control" placeholder="username" v-model="username"/>
            <div class="d-flex text-muted pt-3">
                <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">skill</strong></p>
            </div>
            <select class="form-select" aria-label="Default select example" style="width: 30%;" v-model="skill">
                <option>HTML</option>
                <option>CSS</option>
                <option>JavaScript</option>
                <option>Java</option>
                <option>Ruby</option>
                <option>Go</option>
                <option>Rust</option>
                <option>C##</option>
            </select><br>
            <select class="form-select" aria-label="Default select example" style="width: 30%;" v-model="framework">
                <option>React</option>
                <option>Vue.js</option>
                <option>Angular</option>
                <option>Rails</option>
                <option>SpringBoot</option>
                <option>JSF</option>
                <option>.NET</option>
            </select>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">MySite</h6>
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">GitHub</span>
                    </div>
                    <input type="text" class="form-control" placeholder="GitHub" v-model="github"/>
                </div>
            </div>    
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">Qiita</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Qiita" v-model="qiita"/>
                </div>
            </div>    
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">LAPRAS</span>
                    </div>
                    <input type="text" class="form-control" placeholder="LAPRAS" v-model="lapras"/>
                </div>
            </div>    
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">Twitter</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Twitter" v-model="twitter"/>
                </div>
            </div>    
        </div>
        <button class="w-100 btn btn-primary btn-lg" type="submit" @click="profileSave">プロフィールを保存</button>
    </form>
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
                            this.lapras = responseData.lapras
                            this.twitter = responseData.twitter
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editPortFolio(){
            const postUserId = JSON.parse(localStorage.getItem("vuex"))
            const id = postUserId.id
            let portsContent = {
                id: id,
                PortName: this.PortName,
                PortUrl: this.PortUrl,
                PortContent: this.PortContent,
            };
            axios.put('http://localhost:3000/api/port/edit', portsContent)
                .then((response) => {
                        console.log(response);
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        console.error(error);
                });
        }
    }
}
</script>