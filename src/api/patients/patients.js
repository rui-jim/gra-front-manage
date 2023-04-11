
import request from "@/util/request"

export function getPatientList(){
    return request({
        url:`/patients/getPatientList`,
        method:"get"
    })
}