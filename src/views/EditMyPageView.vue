<template>
<main class="container">
    <form class="needs-validation" novalidate="" >
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">プロフィール編集</h6>
            <div class="d-flex text-muted pt-3">
                <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">username</strong></p>
            </div>
            <input type="text" class="form-control" placeholder="username"/>
            <div class="d-flex text-muted pt-3">
                <p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-gray-dark">skill</strong></p>
            </div>
            <input type="text" class="form-control" placeholder="skill"/>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">MySite</h6>
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">GitHub</span>
                    </div>
                    <input type="text" class="form-control" placeholder="GitHub"/>
                </div>
            </div>    
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">Qiita</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Qiita"/>
                </div>
            </div>    
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between" style="margin-bottom: 5px;">
                        <span class="d-block">LAPRAS</span>
                    </div>
                    <input type="text" class="form-control" placeholder="LAPRAS"/>
                </div>
            </div>    
        </div>
    </form>
</main>
</template>