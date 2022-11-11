import { useRouter } from "next/router";
import { useEffect } from "react";
import postService from "../../src/services/post.services";

export default function Perm() {
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            if (router.query?.id) {
                postService.getById(router.query.id)
                    .then((res) => {
                        console.log("res" + res)
                        router.push(`/posts/${res.data.slug}`)
                        return null
                    })
                    .catch((error) => {
                        console.log(error)
                        router.push('/404')
                        return null
                    })
            } else {
                router.push('/404')
                return null
            }
        }
    }, [router])
}