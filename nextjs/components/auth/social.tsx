"use client";

import {Button} from "@/components/ui/button";

import { signIn } from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {useSearchParams} from "next/navigation";

export const Social = () => {
    const serchParames = useSearchParams();
    const callbackUrl = serchParames.get("callbackUrl");

    const onClick = (provider:"google" | "github") =>{
        signIn(provider,{
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    }

    return (
        <div className={"flex items-center w-full gap-x-2"}>
            <Button
                size={"lg"}
                className={"w-full"}
                variant={"outline"}
                onClick={() => onClick("google")}
            >
                <FcGoogle className={"h-5 w-5"} />
            </Button>
            <Button
                size={"lg"}
                className={"w-full"}
                variant={"outline"}
                onClick={() => onClick("github")}
            >
                <FaGithub className={"h-5 w-5"} />
            </Button>
        </div>
    );
};