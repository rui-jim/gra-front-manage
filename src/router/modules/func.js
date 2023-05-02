
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
            component:()=>import("@/view/func/userManage/userManage")
        },
        {
            path:"role/manage",
            name:"roleManage",
            meta:{title:"角色管理"},
            component:()=>import("@/view/func/roleManage/roleManage")
        },
        {
            path:"router/manage",
            name:"componentManage",
            meta:{title:"菜单管理"},
            component:()=>import("@/view/func/componentManage/componentManage")
        },
        {
            path:"receip/category",
            name:"recipeCategory",
            meta:{title:"分类管理"},
            component:()=>import("@/view/func/recipeCategory/recipeCategory")
        },
        {
            path:"recipe/manage",
            name:"recipeManage",
            meta:{title:"菜谱管理"},
            component:()=>import("@/view/func/recipeManage/recipeManage")
        },
        {
            path:"comment/manage",
            name:"commentManage",
            meta:{title:"评论管理"},
            component:()=>import("@/view/func/commentManage/commentManage")
        }
    
    ]
}

export default func;