import { useSelector } from "react-redux"
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRequiresAuth = () => {
    const authSelector = useSelector((state) => state.auth)

    const router = useRouter()

    useEffect(() => {
        if(authSelector.id) {
            router.push("/")
        }
    }, [authSelector.id])
}