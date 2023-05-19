<template>
<div class="container">
<main>
    <div class="py-5 text-center">    
        <h2>ポートフォリオ編集</h2>
        <p class="lead">作成したポートフォリオを編集</p>
    </div>
    <div class="form-body">
        <div class="">
            <form class="needs-validation" novalidate="" action="http://localhost:3000/api/port/edit" method="PUT">
                <div class="row g-3">
                    <div class="col-12">
                        <label for="PortName" class="form-label">ポートフォリオの名前</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" id="PortName" placeholder="PortName" v-model="PortName">  
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="PortUrl" class="form-label">URL</label>
                        <input type="PortUrl" class="form-control" id="PortUrl" placeholder="PortUrl" v-model="PortUrl">
                    </div>
                    <div class="col-12">
                        <label class="form-label">説明</label>
                        <textarea class="form-control" placeholder="PortContent" v-model="PortContent"></textarea>                
                    </div>
                </div>
                <hr class="my-4">
                <button class="w-100 btn btn-primary btn-lg" type="submit" @click="portEdit">編集</button>
            </form>
        </div>
    </div>
</main>

</div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            PortName: "",
            PortUrl: "",
            PortContent: "",
        }
    },
    created() {
        this.getPortContent()
    },
    methods: {
        getPortContent(){
            const id = parseInt(this.$route.params.id);
            axios.get("http://localhost:3000/api/port/get")
                .then(response => {
                    for(let port_i = 0; port_i <= response.data.length; port_i++){
                        if(id === response.data[port_i].id){
                            this.PortName = response.data[port_i].PortName;
                            this.PortUrl = response.data[port_i].PortUrl;
                            this.PortContent = response.data[port_i].PortContent;
                            break
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        portEdit(){
            const id = parseInt(this.$route.params.id);
            let portsContent = {
                id: id,
                PortName: this.PortName,
                PortUrl: this.PortUrl,
                PortContent: this.PortContent,
            };
            axios.put('http://localhost:3000/api/port/edit', portsContent)
            .then((response) => {
                    console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
    .form-body{
        text-align: initial;
    }
</style>