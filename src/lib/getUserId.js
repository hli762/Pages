export const getUserId = ()=>{
    if(localStorage.getItem('user')){
        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser);
        const userId = user.userId;
        return userId
    }else{
        return false
    }
   
  
}