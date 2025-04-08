"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { GithubIcon } from 'lucide-react'
import Logo from '@/assets/images/zeoapi.svg'
import { usePathname, useRouter } from 'next/navigation'
import { MobileDrawer } from './mobile-drawer-menu'

export const navList = [
  { title: "Home", href: "/" },
  { title: "Guide", href: "/guide" },
  // { title: "License", href: "/license" },
  { title: "Changelog", href: "/changelog" },
]

const NavBar = React.memo(() => {
  const router = useRouter();
  const pathname = usePathname() // Get the current path

  return (
    <div className='sticky top-0 z-50 bg-background flex flex-col'>
      <div className='py-4 px-4 lg:px-8 border-b flex items-center justify-between'>
        
        {/* Logo and Label */}
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Image
              src={Logo}
              className='aspect-square'
              alt='ZeoAPI Logo'
              priority
              width={26}
              height={26}
            />
            <Label className='text-sm'>ZEOAPI</Label>
          </div>
        </div>

        {/* Navigation Links and Buttons */}
        <div className='flex items-center gap-4'>
          {/* Desktop Navigation Links */}
          <div className='md:flex items-center gap-8 hidden'>
            {navList.map(({ title, href }, index) => {
              const isActive = pathname === href // Check if the current path matches the nav item's href
              return (
                <Link
                  key={index}
                  href={href}
                  className={`text-sm transition-all ease-in-out duration-300 ${
                    isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                  }`}
                >
                  {title}
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <span className='h-6 border-r md:block hidden'></span>
          <div className='md:hidden'>
          <MobileDrawer/>

          </div>
          {/* Action Buttons */}
          <div className='items-center gap-3 md:flex hidden'>
            <Button onClick={() => {router.push("/custom-response")}} variant='outline' className='hover:text-primary text-sm'>
              Custom Response
            </Button>
            <ThemeToggle />
            <a
              href="https://github.com/akashhkrishh/zeo-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size='icon' variant='outline' className='hover:text-primary'>
                <GithubIcon />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})

// Fixing the display name warning
NavBar.displayName = "NavBar";

export default NavBar;
