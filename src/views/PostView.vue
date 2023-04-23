<template>
<div class="container">
<main>
    <div class="py-5 text-center">    
        <h2>ポートフォリオ保存ページ</h2>
        <p class="lead">作成したポートフォリオを保存する</p>
    </div>
    <div class="form-body">
        <div class="">
            <form class="needs-validation" novalidate="" action="http://localhost:3000/api/port/save" method="POST">
                <div class="row g-3">
                    <!-- PortName -->
                    <div class="col-12">
                        <label for="port-name" class="form-label">ポートフォリオの名前</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" id="PortName" name="PortName" placeholder="PortFolioName" v-model="PortName">                
                        </div>
                    </div>
                    <!-- PortUrl -->
                    <div class="col-12">
                        <label for="email" class="form-label">URL</label>
                        <input type="email" class="form-control" name="PortUrl" placeholder="SiteURL" v-model="PortUrl">
                    </div>
                    <!-- PortContent -->
                    <div class="col-12">
                        <label class="form-label">説明</label>
                        <textarea class="form-control" name="PortContent" placeholder="SiteExplanation" v-model="PortContent"></textarea>                
                    </div>
                </div>
                <hr class="my-4">
                <button class="w-100 btn btn-primary btn-lg" type="submit" @click="save">ポートフォリをクリップ</button>
            </form>
        </div>
    </div>
</main>
<button @click="reception">JSONデータをもらう</button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PortView',
    data() {
        return {
            PortName: "",
            PortUrl: "",
            PortContent: ""
        }
    },
    methods: {
        save(){
            this.$router.push('/');
        },
        reception(){
        axios.get("http://localhost:3000/api/port/get")
            .then(response => {
            console.log(response.data)
            })
            .catch(error => {
            console.log(error)
            })
        }
    }
}
</script>
<style scoped>
    .form-body{
        text-align: initial;
    }
</style>