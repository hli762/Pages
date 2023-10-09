export const getUser = () => {
    if (localStorage.getItem('user')) {
        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser);
        const { userId, userType, userEmail, userName, userPicture} = user;
        return { userId, userType, userEmail, userName, userPicture }
    } else {
        return false
    }

}



