import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import SiteLogo from "@src/public/SiteLogo.png";

export default function Navbar() {
    return (
        <div className="bg-dark py-2.5">
            <div className="container px-6 flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center align-middle">
                    <MagnifyingGlassIcon className="block w-8 h-8 text-accent" />
                    <span className="pl-2 self-center text-2xl text-white font-semibold whitespace-nowrap">
                        Carbon Inspector
                    </span>
                </Link>
            </div>
        </div>
    );
}
