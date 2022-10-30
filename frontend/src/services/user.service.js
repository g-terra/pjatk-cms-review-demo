import cms from "./cms.service"

const authenticate = async ({ email, password }) => {

    const response = await cms.provider.post(cms.endpoints.auth,{
        identifier:email,
        password
    })

    return response
}

const register = async ({ username, email, password }) => {

    const response = await cms.provider.post(cms.endpoints.register, {
        username,
        email,
        password,
    });


    console.log(response);

    return response;
}

const userService ={
    authenticate, register
}

export default userService