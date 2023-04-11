// import my1 from "@/view/my/my1"
import Layout from "@/components/layout/index"



const treat={
    path:"/treat",
    name:"treat",
    meta:{title:"治疗内容"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"treatList",
            name:"treatList",
            meta:{title:"治疗操作"},
            component:()=>import("@/view/treat/treatList/index")
        },
        {
            path:"medicine",
            name:"medicine",
            meta:{title:"药物管理"},
            component:()=>import("@/view/treat/medicine/index")
        }
    
    ],
    
}

export default treat;