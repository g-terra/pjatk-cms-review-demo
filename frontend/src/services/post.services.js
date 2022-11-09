import cms from "./cms.service"

const getBySlug = async (slug, locale) => {

    const search = {
        locale: locale,
        populate: '*',
        filters: {
            slug: {
                $eq: slug
            }
        }
    }


    const response = await cms.provider.get(cms.endpoints.post, search)

    console.log("count?" + response.value.data.length)

    if (response.value.data.length > 0) {
        return response.value
    } else {
        throw new Error("Post not found")
    }
}

const postService = {
    getBySlug
}

export default postService