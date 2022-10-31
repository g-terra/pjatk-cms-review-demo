import cms from "./cms.service"

const get = async (locale, token) => {

    let search = {
        locale: locale,
        populate: {
            header: {
                populate: '*'
            }
        }
    }

    let authHeader = {}

    if (token) {
        authHeader = {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    }


    const response = await cms.provider.get(cms.endpoints.layout, search, authHeader)

    return response.value

}

const getCoreComponentLocale = async (locale) => {
    let search = {
        populate: {
            component_attributes: {
                filters: {
                    locale: {
                        $eq: locale
                    }
                },
            }
        }
    }

    const response = await cms.provider.get(cms.endpoints.components, search)

    if (response.status !== 200) return response

    return response.value.data.reduce(function (map, obj) {
        map[obj.key] = obj.component_attributes[0].display_text;
        return map;
    }, {});

}

const layoutService = {
    get, getComponentLocale: getCoreComponentLocale
}

export default layoutService