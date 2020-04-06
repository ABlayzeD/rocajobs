//Action Types
export const SIGNINEMAIL = "SIGNINEMAIL";
export const SIGNINPHOTOURL = "SIGNINPHOTOURL";
export const SIGNINUID = "SIGNINUID";
export const SIGNINUSERNAME = "SIGNINUSERNAME";
export const SIGNOUT = "SIGNOUT";


//Action Creator
export function signInEmail (email){
   console.log(email);
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

export const signOut = () => ({
    type: SIGNOUT
});

