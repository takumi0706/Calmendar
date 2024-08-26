import {Card} from "@/components/ui/card";
import {CardWrapper} from "@/components/auth/card-wrapper";

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel={"Welcome back!"}
            backButtonLabel={"Don't have an account?"}
            backButtonHref={"/auth/register"}
            showSocial
        >
            Login form!
        </CardWrapper>
    );
}
