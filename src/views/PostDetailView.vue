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
                        <label for="username" class="form-label">ポートフォリオの名前</label>
                        <div class="input-group has-validation">
                            Facebook
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="email" class="form-label">URL</label><br>
                        https://google.com
                    </div>
                    <div class="col-12">
                        <label class="form-label">説明</label><br>
                        ポートフォリオの説明
                    </div>
                    <div class="col-md-5">
                        <label for="country" class="form-label">使用言語</label><br>
                        使用言語表示
                    </div>
                    <div class="col-md-5">
                        <label for="country" class="form-label">フレームワーク等</label><br>
                        フレームワーク等表示
                    </div>
                </div>
            </form>
        </div>
    </main>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .form-body{
        text-align: initial;
    }
</style>