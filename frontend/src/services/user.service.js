import cms from "./cms.service"

const authenticate = async ({ email, password }) => {

    const response = await cms.provider.post(cms.endpoints.auth, {
        identifier: email,
        password
    })


    return response
}

const register = async ({ username, email, password, token }) => {


    const response = await cms.provider.post(cms.endpoints.register, {
        username,
        email,
        password,
        token
    });

    return response;



}


const info = async ({ token }) => {

    const search = {
        populate: "role"
    }

    const authHeader = {
        headers: {
            Authorization:
                `Bearer ${token}`,
        },
    }

    const response = await cms.provider.get(cms.endpoints.info, search, authHeader);

    return response;
}

const userService = {
    authenticate, register, info
}

export default userService