"use client";



import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useTransition} from "react";
import {useSession} from "next-auth/react";

const SettingPage = () => {
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const onClick =() => {
        startTransition(() => {
            settings({
                name: "SomeThing different",
            })
                .then(() => {
                    update();
                });
        });
    }
  return (
      <Card className={"w-[600px]"}>
        <CardHeader>
            <p　className={"text-2xl font-semibold text-center"}>
                ⚙️ Settings
            </p>
        </CardHeader>
        <CardContent>
            <Button disabled={isPending} onClick={onClick}>
                Update name
            </Button>
        </CardContent>
      </Card>
  );
};

export default SettingPage;
