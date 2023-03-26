/**
 * call API
 * endpoint we want to invoke to fetch a random user: https://random-data-api.com/api/v2/
 * Site: https://random-data-api.com/documentation
 * Use of axios (npm install axios)
 * Site: https://axios-http.com/
*/

import axios from "axios";

const getRandomUser = async () => {
    const response = await axios.get("https://random-data-api.com/api/v2/users?size=2&is_xml=true",{
        headers:{},
        params:{
            size:1
        }
    })
    return response;
}

export {getRandomUser};