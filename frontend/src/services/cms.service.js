import strapiApi from "../helpers/strapi/strapi.api"

const endpoints = {
    auth: "/auth/local",
    register: "/auth/local/register",
    layout: "/layout",
    components:"/components",
    componentAttributes:"/component-attributes"
}

const provider = strapiApi

const cms = {
    provider, endpoints
}

export default cms