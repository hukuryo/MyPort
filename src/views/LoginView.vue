<template>
<div class="login-form text-center form-signin" >
    <h1 class="h3 mb-3 fw-normal"><i class="fas fa-sign-in-alt" style="margin-right: 5px;"></i>ログイン</h1>
    <UserForm  @clicked="login" :buttonText="buttonText"/>
    <router-link class="signin-link btn btn-success"  to="/signup">ユーザー登録</router-link>
</div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
import axios from 'axios'
export default {
data () {
    return {
        username: '',
        pass: '',
        buttonText: 'ログイン'
    }
},
components: {
    UserForm
},
methods: {
    // ログインする処理
    login (userContent) {
        try{
            // Node.jsで認証を行うために、APIリクエストと一緒に、入力された内容をNode.jsに投げる
            axios.post("http://localhost:3000/api/user/login", userContent)
            .then(response => {
                const setId = response.data.id
                if(response.status === 200){
                    this.$store.commit('setUsername', userContent.username);
                    this.$store.commit('setUserId', setId);
                    this.$router.push('/');
                }
            })
            .catch((error) => {
                window.alert('ユーザー名かパスワードが違います。')
                console.log(error)
            })
        }catch(e){
            console.log(e)
        }
    }
}
}
</script>

<style scoped>
.login-form {
    width: 70%;
    margin: auto;
    margin-top: 200px;
}
.signin-link{
    margin-top: 30px;
}
</style>