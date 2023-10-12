import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.Google_CLIENT_ID ?? "",
            clientSecret: process.env.Google_CLIENT_SECERET ?? ""
        })

    ],
})

export { handler as GET, handler as POST } 