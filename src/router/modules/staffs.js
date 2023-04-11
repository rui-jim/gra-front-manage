// import my1 from "@/view/my/my1"
import Layout from "@/components/layout/index"



const staffs={
    path:"/staffs",
    name:"staffs",
    meta:{title:"职工管理"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"emps",
            name:"emps",
            meta:{title:"员工管理"},
            component:()=>import("@/view/staffs/emps/index")
        },
        {
            path:"title",
            name:"title",
            meta:{title:"职位管理"},
            component:()=>import("@/view/staffs/title/index")
        },
        {
            path:"accounts",
            name:"accounts",
            meta:{title:"账号管理"},
            component:()=>import("@/view/staffs/accounts/index")
        }
    
    ],
    
}

export default staffs;