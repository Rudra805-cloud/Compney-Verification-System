import axios from "axios";
async function websiteReachable(hostname){
    try{
       const response = await axios.get(
      `https://${hostname}`,
      {
        timeout: 10000,
        maxRedirects: 5,
        validateStatus: () => true
      }
    );

    return {
      exists: response.status < 500,
      statusCode: response.status
    };
    }
    catch(error){
        return {
        exists: false,
      statusCode: null
    }
}
}
export default websiteReachable;