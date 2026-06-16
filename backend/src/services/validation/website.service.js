import axios from "axios";
async function websiteReachable(hostname){
    try{
       const response = await axios.get(
      `https://${hostname}`,
      {
        timeout: 15000,
        maxRedirects: 5,
        validateStatus: () => true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137 Safari/537.36"
        }
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