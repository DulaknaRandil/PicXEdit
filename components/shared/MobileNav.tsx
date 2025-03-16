"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-4 border-purple-100 bg-white px-4 shadow-sm md:px-6 lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="AISaaS Logo"
          width={160}
          height={32}
          className="h-auto w-[140px] md:w-[160px]"
          priority
        />
      </Link>

      <nav className="flex items-center gap-3">
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                  userButtonPopoverCard: "shadow-xl"
                }
              }}
            />
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="rounded-lg p-2 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Open navigation menu"
                >
                  <Image 
                    src="/assets/icons/menu.svg" 
                    alt="Menu"
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                </button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-[280px]  sm:w-[320px]">
                <div className="flex h-full flex-col gap-3">
                  <div className="border-b border-purple-50 pb-3">
                    <Image
                      src="/assets/images/logo-text.svg"
                      alt="AISaaS Logo"
                      width={140}
                      height={28}
                      className="h-auto w-[120px]  mt-2"
                      
                    />
                  </div>

                  <ul className="flex flex-1 flex-col gap-1.5">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.route
                      return (
                        <li key={link.route}>
                          <Link
                            href={link.route}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ",
                              "hover:bg-purple-50 focus:outline-none  ",
                              isActive 
                                ? "bg-purple-gradient text-white " 
                                : "text-gray-700"
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <Image
                              src={link.icon}
                              alt=""
                              width={20}
                              height={20}
                              className={cn(
                                "h-5 w-5",
                                isActive ? "brightness-200" : "text-gray-500"
                              )}
                            />
                            <span className="text-sm font-medium">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </SignedIn>

        <SignedOut>
          <Button 
            asChild
            className="bg-purple-600 px-5 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Link href="/sign-in">
              Get Started
            </Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav