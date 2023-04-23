<template>
<form action="http://localhost:3000/api/port/save" method="POST" >
    <input type="text" name="name">
    <input type="text" name="text">
    <button type="submit">送信</button>
</form>
<button @click="reception">JSONデータをもらう</button>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        reception(){
        axios.get("http://localhost:3000/api/port/get")
            .then(response => {
            console.log(response.data.length)
            })
            .catch(error => {
            console.log(error)
            })
        }
    }
}
</script>