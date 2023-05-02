<template>
    <div class="icon-container">
        <i v-for="(item,index) in iconList" :key="index" 
            @click="chooseIcon(item,index)"
            class="icon" :class="[item,chooseIndex == index?'active':'']"></i>
    </div>
</template>

<script>
import { DEFAULT_ICON_LIST } from "./icon"

export default {
    data(){
        return {
            iconList: DEFAULT_ICON_LIST,
            chooseIndex: -1 // 选中的索引
        }
    },
    methods: {
        chooseIcon(icon,index){
            this.chooseIndex = index
            this.$emit("chooseIcon",icon)
        }
    }
}
</script>

<style lang="scss" scoped>


.icon-container{
    width: 26em;
    height: 200px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    border: 1px solid #ccc;
    border-radius: 5px;
    border-bottom: none;
    border-right: none;

    .icon{
        font-size: 2em;
        // border: 1px solid #ccc;
        cursor: pointer;
        padding: 0.5em;
        border: 1px solid transparent;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        
    }
    .active{
        // border-color:red;
        // border: 1px solid rgb(64,158,255);
        border-color:  rgb(64,158,255) !important;
    }
}

</style>