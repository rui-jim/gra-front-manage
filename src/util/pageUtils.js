export default{
    registerTag(store,route){
        let temp = { meta: {} };
        temp.fullPath = route.fullPath;
        temp.meta.title = route.meta.title;
        store.dispatch("tagTest/add_tag", temp);
    }
}