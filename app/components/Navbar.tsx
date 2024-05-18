import { ModeToggle } from "./dark-mode-toggle";

function NavBar() {
  return (
    <div className="hidden h-32 w-full items-center justify-end border-b-2 p-8 lg:flex">
      <ModeToggle />
    </div>
  );
}

export default NavBar;
