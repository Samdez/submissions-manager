import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ModeToggle } from "./Dark-mode-toggle";

function NavBar() {
  return (
    <div className="hidden h-32 w-full items-center justify-end gap-8 border-b-2 p-8 lg:flex">
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
      <ModeToggle />
    </div>
  );
}

export default NavBar;
