import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <div className="flex justify-between">
      <p>hi, dev</p>
      <p>hi, dev</p>
      <LoginButton asChild>
        <Button>Sign in</Button>
      </LoginButton>
    </div>
  );
}
