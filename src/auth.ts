import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'password',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, _request) {
        if (credentials?.password == 'pxl2024!') { // Set the password here
          return { id: '0' };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: 'thisisasecret',
};