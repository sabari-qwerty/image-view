import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.Google_SECERET ?? ""
        })

    ],
    secret: process.env.NEXT_PUBLIC_SECRET ?? ""

})

export { handler as GET, handler as POST } 