import cms from "./cms.service"

const get = async (locale, token) => {

    let search = {
        locale: locale,
        populate: {
            header: {
                populate: '*'
            },
            footer: {
                populate: {
                    social: {
                        populate: {
                            icon_light: {
                                fields: ['formats'],
                            },
                            icon_dark: {
                                fields: ['formats'],
                            }
                        }
                    },
                    pages: {
                        fields:['title','path']
                    }
                }, 
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

const getAvailableLocales = async()=>{

    const response = await cms.provider.get(cms.endpoints.locales)
    if (response.status !== 200) return response

    return response.value.map(l=>l.code)

}

const layoutService = {
    get, getComponentLocale: getCoreComponentLocale , getAvailableLocales
}

export default layoutService