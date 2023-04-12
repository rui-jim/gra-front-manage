
import Layout from "@/components/layout/index"



const func = {
    path:"/func",
    name:"func",
    meta:{title:"功能管理"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"receip/catefory",
            name:"菜谱分类管理",
            meta:{title:"菜谱分类管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        }
    
    ]
}

export default func;