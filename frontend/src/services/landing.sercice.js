import cms from "./cms.service"

const get = async (locale) => {


    const search = {
        locale: locale,
        populate: {
            latest: {
                populate: {
                    content: {
                        fields: [
                            "title",
                            "description",
                            "image_text",
                            "slug"
                        ],
                        populate: {
                            image: {
                                populate: '*'
                            }
                        }
                    }
                }
            },
            featured: {
                populate: {
                    content: {
                        fields: [
                            "title",
                            "description",
                            "image_text",
                            "slug"
                        ]
                    }
                }
            },
        }
    }

    const response = await cms.provider.get(cms.endpoints.landing, search)

    return response.value

}

const landingService = {
    get
}

export default landingService