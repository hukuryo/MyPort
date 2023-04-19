<template>
    <main class="form-signin">
        <form>
            <h1 class="h3 mb-3 fw-normal">Login</h1>
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">USERNAME</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">PASSWORD</label>
            </div>
            <button class="w-100 btn btn-lg btn-success" type="submit">Sign in</button>
        </form>
    </main>
</template>
<style scoped>
    .form-signin{
        margin-top: 30px;
    }
</style>