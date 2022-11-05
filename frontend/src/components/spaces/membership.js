import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { alertService } from "../../services/alert.service";
import userService from "../../services/user.service";

export default function MembershipArea({ children }) {
    const router = useRouter();

    const { data: session, status } = useSession()
    const [allow, setAllow] = useState()

    useEffect(() => {
        if (status === 'authenticated') {
            userService.info({ token: session.jwt })
                .then(res => {
                    setAllow(res.value.role.type === 'membership')
                })
        }
    }, [session])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        alertService.error("Must first sign in", { keepAfterRouteChange: true })
        router.push("/")
    }


    return allow ? (<div>{children} </div>) : <div><h1>Members only</h1> </div>



}
