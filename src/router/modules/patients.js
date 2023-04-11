import Layout from "@/components/layout/index"

const patient = {
    path:"/patients",
    name:"patients",
    meta:{title:"病人管理"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"patientList",
            name:"patientList",
            meta:{title:"病人列表"},
            component:()=>import("@/view/patient/patientList/index")
        }
    ]

}

export default patient