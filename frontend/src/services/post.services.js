import cms from "./cms.service"

const getBySlug = async (slug,locale) => {

    const search = {
        locale:locale,
        populate: '*',
        filters: {
            slug: {
                $eq: slug
            }
        }
    }


    const response = await cms.provider.get(cms.endpoints.post, search)

    return response.value

}

const postService = {
    getBySlug
}

export default postService