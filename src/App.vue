<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li ><router-link class="nav-link  text-secondary" v-if="$store.getters.loggedIn" to="/"><i class="fa-solid fa-bookmark"></i>MyPortFolio</router-link></li>
          <li ><router-link class="nav-link  text-secondary" v-if="$store.getters.loggedIn" to="/myPage"><i class="fa-solid fa-user"></i>MyPage</router-link></li>
          <li ><router-link class="nav-link  text-secondary" v-if="$store.getters.loggedIn" to="/post"><i class="fa-regular fa-clipboard" style="margin-right: 5px;"></i>Post</router-link></li>
        </ul>
        <div class="text-end">          
          <button type="button" @click="logout()" v-if="$store.getters.loggedIn" class="btn btn-danger"><i class="fa-solid fa-right-from-bracket"></i>ログアウト</button>
        </div>
      </div>
    </div>
  </header>
  <router-view/>
</template>

<script>
export default {
  methods: {
    logout () {
        const confirm = window.confirm("ログアウトしてもよろしいですか？")
        if(confirm){
          this.$store.commit('setUserId', null)
          this.$store.commit('setUsername', null)
          // ログアウト時に画面のキャッシュを消すため、リロードする。
          location.reload()
          if (this.$route.meta.requiresAuth) {
            this.$router.push({
              path: '/login',
            })
          }
        }else{
          return
        }
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

a{
  text-decoration: none;
}

ul{
  list-style: none;
}

li{
  list-style: none;
}
.fa-solid{
  margin-right: 3px;
}

</style>
