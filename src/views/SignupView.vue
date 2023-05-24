<template>
  <div class="login-form text-center form-signin" >
    <h1 class="h3 mb-3 fw-normal"><i class="fas fa-user-plus" style="margin-right: 3px;"></i>ユーザー登録</h1>
    <form>
        <div class="form-floating">
            <input id="name" class="form-control" type="text" v-model="username"  @input="validateInput">
            <label for="floatingInput">ユーザー名</label>
        </div><br>
        <div class="form-floating">
            <input id="password" class="form-control" type="password" placeholder="Password" v-model="pass">
            <label for="floatingPassword">パスワード</label>
        </div>
        <div class="my-3 bg-body rounded">
            <div class="d-flex text-muted">
                <p class="mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">skill</strong></p>
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
        <div class="my-3 bg-body rounded shadow-sm">
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
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="signup">ユーザー登録</button>
    </form>
    <!-- <UserForm  @clicked="signup" :buttonText="buttonText"/> -->
    <router-link class="signin-link btn btn-success"  to="/login">ログイン</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      pass: '',
      skill: "",
      framework: "",
      github: "",
      qiita: "",
      lapras: ""
    }
  },
  methods: {
    // ユーザー情報を保存する処理
    // 引数のuserContentはAuthenticationFormファイルから$emitで入力された内容が渡されている。
    signup(){
      let userContent = {
        username: this.username,
        pass: this.pass,
        skill: this.skill,
        framework: this.framework,
        github: this.github,
        qiita: this.qiita,
        lapras: this.lapras
      }
      if(userContent.username === ""){
          window.alert('ユーザー名が入力されていません')
          return
      }
      if(userContent.pass === ""){
          window.alert('パスワードが入力されていません')
          return
      }
      // axiosを使ってNode.jsにAPIリクエストを送る
      axios.post('http://localhost:3000/api/user/registration', userContent)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
      });
      window.alert('ユーザー登録が完了しました。')
      this.$router.push('/login');
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