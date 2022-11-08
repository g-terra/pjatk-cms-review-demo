const { verify } = require('hcaptcha')

module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        const secret = process.env.HCAPTCHA_SECRET_KEY
        const token = ctx.request.body.token

        if (!token) {
            return ctx.badRequest('Token not found')
        }

        try {
            let { success } = await verify(secret, token)

            if (success) {
                await next();
            } else {
                return ctx.badRequest('Failed captcha score')
            }
        } catch (error) {
            return ctx.throw(500, error)
        }
    }
}