import { apiGetCall, apiPostCall, apiPutCall, apiPatchCall, apiDeleteCall } from '../config/apiConfig';
import { LOGIN_URL,SIGNUP_URL } from '../config/urlConfig'


class AuthService {
    constructor (apiGetCall, apiPostCall, apiPutCall, apiPatchCall, apiDeleteCall){
        // eslint-disable-next-line no-unused-expressions
        this.apiGetCall=apiGetCall,
        this.apiPostCall=apiPostCall,
        this.apiPutCall=apiPutCall,
        this.apiPatchCall=apiPatchCall,
        this.apiDeleteCall=apiDeleteCall
    } 
    login = async(body)=>{
        const response = await this.apiPostCall(LOGIN_URL,body)
        return response
    }

    signup = async(body)=>{
        const response = await this.apiPostCall(SIGNUP_URL,body)
        return response
    }
    
}

export default AuthService

export const authServiceObj = new AuthService(
    apiGetCall,
    apiPostCall,
    apiPutCall,
    apiPatchCall,
    apiDeleteCall
);