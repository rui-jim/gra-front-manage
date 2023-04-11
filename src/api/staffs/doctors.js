
import request from "@/util/request"


export function queryDoctorsInfo(){
    return request({
        url:`/doctors/list`,
        method:"get"
    })
}

export function addDoctorsInfo(doctors){
    console.log("input doctors ",doctors);
    return request({
        url:`/doctors/add`,
        method:"post",
        data:doctors
    })
}
