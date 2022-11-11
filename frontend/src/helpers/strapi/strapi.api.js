import axios from "axios";
import QueryString from "qs";

const cmsProxy = "http://localhost:1337/api"

const get = async (resource, search , headers) => {

    try {
        const query = QueryString.stringify(search);

        const params = decodeURI(query)
        const url = `${cmsProxy}${resource}?${params}`
        console.log(`GET request sent to : ${url}`);
        const response = await axios.get(url, headers)
        let data = await response.data

        return {
            status: 200,
            value: data
        }
    } catch (error) {
        return {
            status: error.response.status,
            error: error.response.data.error
        }
    }
}

const post = async (resource, payload) => {

    try {
        const url = `${cmsProxy}${resource}`
        console.log(`GET request sent to : ${url}`);
        const response = await axios.post(url, payload)
        return {
            status: 200,
            value: await response.data
        }
    } catch (error) {
        console.log(error);

        return {
            status: error.response.status,
            error: error.response.data.error
        }

    }
}

const strapiApi = {
    get, post
}
export default strapiApi