interface IResponse {
     success: boolean,
     message?: string,
     data: Object | null | any
 }
 
 export type ErrorResponse = IResponse & {
     error_code : number
 }
 
 export const CreateResponse = (data : IResponse['data'],message? : string,):IResponse => {
     return {
        data , message ,success : true
 }
 }