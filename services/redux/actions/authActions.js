//Action Types
export const SIGNINEMAIL = "SIGNINEMAIL";
export const SIGNINPHOTOURL = "SIGNINPHOTOURL";
export const SIGNINUID = "SIGNINUID";
export const SIGNINUSERNAME = "SIGNINUSERNAME";
export const SIGNOUT = "SIGNOUT";


//Action Creator
export function signInEmail (email){
   return{
      type: SIGNINEMAIL,
      email
   };
}
export function signInPhotoUrl(photourl){
   
   return{
      type: SIGNINPHOTOURL,
      photourl
   };
}
 export function signInUid(uid){
    return{
      type: SIGNINUID,
      uid
    }
 }
 export function signInUsername (username){
    return{
      type: SIGNINUSERNAME,
      username
    }
 }

export function signOut (){
    return{
       type: SIGNOUT,
      email: null,
      photourl: null,
      uid: null,
      username: null
    }
}

