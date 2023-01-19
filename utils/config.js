const { default: axios } = require("axios");
const Twitter = require('twitter-lite')
// import Twitter from 'twitter-lite';

const getAccessToken = async () => {
  const requestTokenUrl = "https://api.twitter.com/oauth/request_token";
  const consumer_key = "CckNIvmxpaidXWd2omDf3AM4n";
  const consumer_key_secret =
    "qFqLLjsBxwLy3Zzt2lob4peSIezjtkUjOStDOQo8ZBZ3H4z2mZ";
//   try {
//     const resp = await axios.post(requestTokenUrl, {
//       header:{
// "Authorization": `OAuth oauth_consumer_key="${consumer_key}", oauth_nonce="$oauth_nonce", oauth_signature="oauth_signature", oauth_signature_method="HMAC-SHA1", oauth_timestamp="$timestamp", oauth_version="1.0"`
//       },
    
//     });
//     console.log(resp.data);
//   } catch (err) {
//     // Handle Error Here
//     console.log(err.request);
//     console.error(err);
//   }
const client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_key_secret
  });
  console.log(client.token);
  
  client
  .getRequestToken("http://localhost:3000")
  .then(res =>
    console.log({
      reqTkn: res.oauth_token,
      reqTknSecret: res.oauth_token_secret
    })
  )
  .catch(console.error);

  const response = await client.getBearerToken();
};

module.exports = {
  getAccessToken,
};
