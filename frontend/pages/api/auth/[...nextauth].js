import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import userService from '../../../src/services/user.service';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },

      },
      async authorize(credentials, req) {
        try {
          const res = await userService.authenticate(
            {
              email: credentials.email,
              password: credentials.password,
            }
          )

          if (res?.error) { throw Error(res.error) }

          const { user, jwt } = res.value

          return ({ user, jwt })

        } catch (error) {
          throw new Error(error)
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/user/login',
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      session.id = token.id;
      session.jwt = token.jwt;

      return Promise.resolve(token);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.user = user.user
      }
      return Promise.resolve(token);
    },
  },

  debug: process.env.NODE_ENV === 'development',
});