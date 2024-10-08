import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
