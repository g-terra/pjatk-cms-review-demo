import strapiApi from "../helpers/strapi/strapi.api"

const endpoints = {
    auth: "/auth/local",
    register: "/auth/local/register",
    info: "/users/me",
    layout: "/layout",
    components:"/components",
    componentAttributes:"/component-attributes",
    landing:"/landing"
}

const provider = strapiApi

const cms = {
    provider, endpoints
}

export default cms