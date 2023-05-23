<template>
<div class="container">
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