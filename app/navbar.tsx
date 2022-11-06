import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SiteLogo from "@src/public/SiteLogo.png";

export default function Navbar() {
    return (
        <div className="bg-dark py-2.5">
            <div className="container px-6 flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center align-middle">
                    <Image
                        className="h-8 w-8"
                        src={SiteLogo}
                        alt="Carbon Inspector"
                        priority
                    />
                    <span className="pl-2 self-center text-xl text-white font-semibold whitespace-nowrap">
                        Carbon Inspector
                    </span>
                </Link>

                <div className="block w-auto">
                    <Link
                        href="/app"
                        className="block py-3 px-4 bg-accent rounded text-white"
                        aria-current="page"
                    >
                        Launch App
                    </Link>
                </div>
            </div>
        </div>
    );
}
