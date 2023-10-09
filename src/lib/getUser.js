export const getUser = () => {
    if (localStorage.getItem('user')) {
        const storedUser = localStorage.getItem('user')
        const user = JSON.parse(storedUser);
        const { userId, userType, userEmail, userName, } = user;
        return { userId, userType, userEmail, userName }
    } else {
        return false
    }

}



