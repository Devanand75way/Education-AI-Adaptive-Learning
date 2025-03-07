export interface IUser {
     email : string;
     username : string;
     password : string;
     role : string;
}

export interface IAuthResponse {
     accessToken : string;
     refreshToken : string;
}