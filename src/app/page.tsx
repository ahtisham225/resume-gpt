import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
export default function Home() {
  const { userId } : { userId: string | null } = auth();
  const isAuth = !!userId;
  console.log(isAuth);

  return (
    <div className="m-screen min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">
              Customize CV
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flext mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg">
            Apply confidently with an AI-crafted resume tailored to the job description, maximizing your chances of success.
          </p>
          <div className="w-full mt-4">
            { isAuth ? (
              <FileUpload />
              ) : (
                <Link href="/sign-in">
                    <Button>
                      log in to Get Started
                      <LogIn className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
