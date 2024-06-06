const axios = require('axios');

const generateOAuthUrl = (oauthConfig) => {
    const authEndpoint = oauthConfig.authEndpoint;
    const clientId = oauthConfig.clientId;
    const redirectUri = encodeURIComponent(oauthConfig.redirectUri);
    const scope = encodeURIComponent(oauthConfig.scope);

    const oauthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    console.log('Generated OAuth URL:', oauthUrl); // Log the URL for debugging
    return oauthUrl;
};

const exchangeCodeForToken = async (code, oauthConfig) => {
    const tokenEndpoint = oauthConfig.tokenEndpoint;
    try {
        const response = await axios.post(tokenEndpoint, null, {
            params: {
                client_id: oauthConfig.clientId,
                client_secret: oauthConfig.clientSecret,
                redirect_uri: oauthConfig.redirectUri,
                code: code,
                grant_type: 'authorization_code'
            }
        });

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error exchanging code for token:', error.response.data);
        throw error;
    }
};

module.exports = { generateOAuthUrl, exchangeCodeForToken };
