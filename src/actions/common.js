import { Auth } from 'aws-amplify';

const getHeaders = async () => {
    const session = await Auth.currentSession();
    const token = session.accessToken.jwtToken;
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export default getHeaders;
