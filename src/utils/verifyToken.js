import jwt_decode from 'jwt-decode';

const verifyToken = () => {
    let verified = false;
    const token = localStorage.getItem('smieci-token');
    if(!token) { return false }
    let decodedToken = jwt_decode(token);
    let current_time = new Date().getTime() / 1000;
    if (current_time > decodedToken.exp) { return false }
    else { verified = true }

    return verified;
};

export default verifyToken;
