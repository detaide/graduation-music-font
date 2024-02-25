<script setup>
    import router from "@/router/index.js";

    function jump2(path)
    {
        router.push({
            path: path,
        });
    }

</script>
<template >
    <div class="iconList">
        <div class="active" @click="jump2('/dailyRecommand')">
            <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinrituijian"></use>
      </svg> -->
            <i class="iconfont icon-jinrituijian"></i>
            <p>每日推荐</p>
        </div>
        <div class="active">
            <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gongju"></use>
      </svg> -->
            <i class="iconfont icon-gongju"></i>
            <p>私人漫游</p>
        </div>
        <div class="active">
            <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofanggedan"></use>
      </svg> -->
            <i class="iconfont icon-yinle1"></i>
            <p>歌单</p>
        </div>
        <div class="active" @click="jump2('/dailyRank')">
            <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg> -->
            <i class="iconfont icon-paihangbang"></i>
            <p>排行榜</p>
        </div>
        <div class="active">
            <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhishiku2"></use>
      </svg> -->
            <i class="iconfont icon-zhishiku2"></i>
            <p>有声书</p>
        </div>
    </div>
</template>
<style scoped>
.iconList {
    /* height共1.5rem */
    width: 100%;
    height: 1.60rem;
    /* background-color: #fff; */
    background-color: #242323;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.iconList div {
    width: 20%;
    height: 100%;
    text-align: center;
}

.iconList p {
    color: #fff;
    font-size: 0.28rem;
    font-weight: bold;
    text-align: center;
}

.iconList i {
    font-size: 0.7rem;
    color: red;
}
</style>