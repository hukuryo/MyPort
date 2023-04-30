<template>
<div class="container">
<main>
    <div class="py-5 text-center">    
        <h2>ポートフォリオ編集</h2>
        <p class="lead">作成したポートフォリオを編集</p>
    </div>
    <div class="form-body">
        <div class="">
            <form class="needs-validation" novalidate="">
            <div class="row g-3">
                <div class="col-12">
                    <label for="PortFolioName" class="form-label">ポートフォリオの名前</label>
                    <div class="input-group has-validation">
                        <input type="text" class="form-control" id="PortFolioName" placeholder="PortFolioName" v-model="PortFolioName">  
                    </div>
                </div>

                <div class="col-12">
                    <label for="SiteUrl" class="form-label">URL</label>
                    <input type="SiteUrl" class="form-control" id="SiteUrl" placeholder="SiteURL" v-model="SiteURL">
                </div>
                <div class="col-12">
                    <label class="form-label">説明</label>
                    <textarea class="form-control" placeholder="SiteExplanation" v-model="SiteExplanation"></textarea>                
                </div>

                <!-- <div class="col-md-5">
                    <label for="country" class="form-label">使用言語</label>
                    <select class="form-select" id="country" required="">
                        <option value="">言語</option>
                        <option>JavaScript</option>
                    </select>
                </div>
                <div class="col-md-5">
                    <label for="country" class="form-label">フレームワーク等</label>
                    <select class="form-select" id="country" required="">
                        <option value="">言語</option>
                        <option>Vue.js</option>
                    </select>
                </div> -->
            </div>
            <hr class="my-4">
            <button class="w-100 btn btn-primary btn-lg" type="submit">編集</button>
            </form>
        </div>
    </div>
</main>

</div>
</template>
<script>
export default {
    data() {
        return {
            PortFolioName: "",
            SiteURL: "",
            SiteExplanation: "",
        }
    }
}
</script>
<style scoped>
    .form-body{
        text-align: initial;
    }
</style>