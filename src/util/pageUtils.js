export default{
    registerTag(store,route){
        let temp = { meta: {} };
        temp.fullPath = route.fullPath;
        temp.meta.title = route.meta.title;
        console.log("pageUtils/registerTag===========>", temp);
        store.dispatch("tagTest/add_tag", temp);
    }
}