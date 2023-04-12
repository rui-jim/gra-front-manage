
import Layout from "@/components/layout/index"



const sys={
    
    path:"/tool",
    name:"tool",
    meta:{title:"开发工具"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"storage",
            name:"storage",
            meta:{title:"存储管理"},
            component:()=>import("@/view/sys/storage/storage")
        }
    
    ],
    
}

export default sys;