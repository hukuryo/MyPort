<template>
<!-- <div class="container">
    <main>
        <div class="py-5 text-center">
            <h2>ポートフォリオ詳細</h2>
        </div>
        <div class="form-body">
            <form class="needs-validation" novalidate="">
                <div class="row g-3">
                    <div class="col-12">
                        <label for="username" class="form-label"><strong>ポートフォリオ名</strong></label>
                        <div class="input-group has-validation">
                            {{ this.PortName }}
                        </div>
                    </div>
                    <div class="col-12">
                        <label class="form-label"><strong>URL</strong></label><br>
                        {{ this.PortUrl }}
                    </div>
                    <div class="col-12">
                        <label class="form-label"><strong>説明</strong></label><br>
                        {{ this.PortContent }}
                    </div>
                </div>
            </form>
        </div>
        <router-link class="btn btn-success" to="/">戻る</router-link>
    </main>
</div> -->
<div class="col-lg-8 mx-auto p-3 py-md-5">
    <span class="d-flex align-items-center pb-3 mb-5 border-bottom">ポートフォリオ詳細</span>
    <main>
        <div class="container py-4">
            <div class="p-5 mb-4 bg-light rounded-3">
                <div class="container-fluid py-5 ">
                    <h5 class="fw-bold">説明</h5>
                    <p class="col-md-8 fs-4">{{ this.PortContent }}</p>
                </div>
            </div>

            <div class="row align-items-md-stretch">
                <div class="col-md-6">
                    <div class="h-100 p-5 bg-light border rounded-3">
                        <h5 class="fw-bold">URL</h5>
                        <p>{{ this.PortUrl }}</p>
                    </div>
                </div>
            <div class="col-md-6">
                <div class="h-100 p-5 bg-light border rounded-3">
                    <h5 class="fw-bold">ポートフォリオ名</h5>
                    <p>{{ this.PortName }}</p>
                </div>
            </div>
        </div>
    </div>
</main>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            PortName: "",
            PortUrl: "",
            PortContent: "",
            errorMessage: ""
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
    }
}
</script>

<style scoped>
    .form-body{
        text-align: initial;
    }
</style>