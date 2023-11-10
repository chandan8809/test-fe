import { apiGetCall, apiPostCall, apiPutCall, apiPatchCall, apiDeleteCall } from '../config/apiConfig';
import { GET_ALL_EXAM } from '../config/urlConfig'


class ExamService {
    constructor (apiGetCall, apiPostCall, apiPutCall, apiPatchCall, apiDeleteCall){
        // eslint-disable-next-line no-unused-expressions
        this.apiGetCall=apiGetCall,
        this.apiPostCall=apiPostCall,
        this.apiPutCall=apiPutCall,
        this.apiPatchCall=apiPatchCall,
        this.apiDeleteCall=apiDeleteCall
    } 

    getAllExam = async()=>{
        const response = await this.apiGetCall(GET_ALL_EXAM)
        return response
    }

    startExam = async({exam_id})=>{
        const response = await this.apiGetCall(`${GET_ALL_EXAM}/${exam_id}`)
        return response
    }


   
    
}

export default ExamService

export const examServiceObj = new ExamService(
    apiGetCall,
    apiPostCall,
    apiPutCall,
    apiPatchCall,
    apiDeleteCall
);