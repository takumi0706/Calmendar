"use client";

import {useRouter} from "next/navigation";

interface SettingsButtonProps {
    children: React.ReactNode;
}

export const SettingsButton = ({
 children
}: SettingsButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/settings");
    };

    return (
        <span onClick={onClick} className={"cursor-pointer"}>
            {children}
        </span>
    );
};
