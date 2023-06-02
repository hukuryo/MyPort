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
<header class="d-flex align-items-center pb-3 mb-5 border-bottom">
    <span class="fs-4">ポートフォリオ詳細</span>
</header>

<main>

    <div class="row g-5">
    <div class="col-md-6">
        <h2></h2>
        <p>Ready to beyond the starter template? Check out these open source projects that you can quickly duplicate to a new GitHub repository.</p>
        <ul class="icon-list">
        <li><a href="https://github.com/twbs/bootstrap-npm-starter" rel="noopener" target="_blank">Bootstrap npm starter</a></li>
        <li class="text-muted">Bootstrap Parcel starter (coming soon!)</li>
        </ul>
    </div>

    <div class="col-md-6">
        <h2>ポートフォリオ</h2>
        <ul class="icon-list">
        <li><a href="/docs/5.0/getting-started/introduction/">Bootstrap quick start guide</a></li>
        <li><a href="/docs/5.0/getting-started/webpack/">Bootstrap Webpack guide</a></li>
        <li><a href="/docs/5.0/getting-started/parcel/">Bootstrap Parcel guide</a></li>
        <li><a href="/docs/5.0/getting-started/build-tools/">Contributing to Bootstrap</a></li>
        </ul>
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