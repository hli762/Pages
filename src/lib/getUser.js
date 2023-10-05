export const getUser = ()=>{
    if(localStorage.getItem('user')){
        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser);
        const userId = user.userId;
        const userType = user.userType;
        return {userId,userType}
    }else{
        return false
    }
    
}



