import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {LoginButton} from "@/components/auth/login-botton";

const font = Poppins({
    subsets : ["latin"],
    weight: ["600"]
})

export default function Home() {
  return (
      <main className="flex h-full flex-col items-center justify-center
                        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                        from-sky-400 to-blue-800">
          <div className="space-y-6 text-center">
              <h1 className={cn(
                  "text-6xl font-semibold text-white drop-shadow-mdh",
                  font.className
              )}>
                  🗓️ Calmendar
              </h1>
              <p className="text-white text-lg">
                  Your smart and reliable calendar assistant, making scheduling a breeze.
              </p>
          </div>
          <div>
              <LoginButton mode={"modal"} asChild>
                  <Button
                        className={"m-2"}
                      variant={"secondary"}
                          size={"lg"}>
                      Sign in
                  </Button>
              </LoginButton>
          </div>
      </main>
  );
}
