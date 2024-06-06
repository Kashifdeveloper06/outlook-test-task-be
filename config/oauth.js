// OAuth configuration for Outlook
// const oauthConfig = {
//     clientId: 'd3b60a35-92b9-4114-8895-6380b78d247b',
//     clientSecret: '0a96d047-4d47-4aa4-9426-722c08547652',
//     redirectUri: 'http://localhost:3000/oauth/callback', // Change this to your callback URL
// };

const oauthConfig = {
    clientId: 'd3b60a35-92b9-4114-8895-6380b78d247b',
    clientSecret: '0a96d047-4d47-4aa4-9426-722c08547652',
    redirectUri: 'http://localhost:3000/oauth/callback',
    scope: 'openid profile email User.Read Mail.Read',
    authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
};

module.exports = oauthConfig;



