<template>
<div class="container">
    <main>
        <div class="py-5 text-center">
            <h3><i class="fa-regular fa-clipboard" style="margin-right: 5px;"></i>ポートフォリオ保存</h3>
        </div>
        <div class="form-body">
            <!-- PortUrl -->
            <form class="needs-validation" novalidate="" action="http://localhost:3000/api/port/save" method="POST">
                <div class="row g-3">
                <div class="col-12">
                    <label for="port-name" class="form-label"><i class="fa-solid fa-file-signature"></i>ポートフォリオの名前</label>
                    <div class="input-group has-validation">
                    <input type="text" class="form-control" id="PortName" name="PortName" placeholder="PortFolioName" v-model="PortName"/>
                    </div>
                </div>
                <!-- PortUrl -->
                <div class="col-12">
                    <label for="text" class="form-label"><i class="fa-solid fa-earth-americas"></i>URL</label>
                    <input type="text" class="form-control" name="PortUrl" placeholder="SiteURL" v-model="PortUrl"/>
                </div>
                <!-- PortContent -->
                <div class="col-12">
                    <label class="form-label"><i class="fa-solid fa-comment"></i>説明</label>
                    <textarea class="form-control" name="PortContent" placeholder="SiteExplanation" v-model="PortContent"></textarea>
                </div>
                </div>
                <hr class="my-4" />
                <button class="w-100 btn btn-primary btn-lg" type="submit" @click="save"><i class="fa-solid fa-bookmark"></i>ポートフォリオをクリップ</button>
            </form>
        </div>
    </main>
</div>
</template>

<script>
import axios from "axios";
const postUserId = JSON.parse(localStorage.getItem("vuex"))

export default {
    name: "PortView",
    data() {
        return {
            PortName: "",
            PortUrl: '',
            PortContent: '',
        };
    },
    methods: {
        save() {
            let portsContent = {
                id: Math.floor(Math.random() * 1000), // ランダムなIDを生成
                postUserId: postUserId,
                PortName: this.PortName,
                PortUrl: this.PortUrl,
                PortContent: this.PortContent,
            };
            axios.post("http://localhost:3000/api/port/save", portsContent)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    return error
                });
            this.$router.push("/");
            location.reload(true)
        },
    },
};
</script>

<style scoped>
.form-body {
    text-align: initial;
}
</style>