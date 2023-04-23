
import Layout from "@/components/layout/index"



const func = {
    path:"/func",
    name:"func",
    meta:{title:"功能管理"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"user/manage",
            name:"userManage",
            meta:{title:"用户管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        },
        {
            path:"role/manage",
            name:"roleManage",
            meta:{title:"角色管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        },
        {
            path:"router/manage",
            name:"路由管理",
            meta:{title:"路由管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        },
        {
            path:"receip/catefory",
            name:"菜谱分类管理",
            meta:{title:"菜谱分类管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        },
        {
            path:"recipe/manage",
            name:"recipeManage",
            meta:{title:"菜谱管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        },
        {
            path:"comment/manage",
            name:"commentManage",
            meta:{title:"评论管理"},
            component:()=>import("@/view/func/receipCatefory/receipCatefory")
        }
    
    ]
}

export default func;