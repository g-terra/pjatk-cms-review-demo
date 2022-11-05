import strapiApi from "../helpers/strapi/strapi.api"

const endpoints = {
    auth: "/auth/local",
    register: "/auth/local/register",
    info: "/users/me",
    layout: "/layout",
    components:"/components",
    componentAttributes:"/component-attributes",
    landing:"/landing",
    filePaths:"/file-paths",
    userAvailableFiles:"/user-available-files",
    locales:"/i18n/locales",
    post:"/posts"
}

const provider = strapiApi

const cms = {
    provider, endpoints
}

export default cms