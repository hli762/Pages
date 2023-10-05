export const getUserType = ()=>{
    if(localStorage.getItem('user')){
        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser);
        const userType = user.userType;
        return userType
    }else{
        return false
    }
    
}