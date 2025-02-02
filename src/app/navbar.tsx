import * as React from 'react'
import Link from 'next/link'
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


function Navbar() {
  return (
    <nav className="bg-slate-100 border-slate-200 flex items-center justify-between border-b p-2">
      {/* <div className="flex items-center gap-2">
        <div>{metadata.title as string}</div>
      </div> */}
      <SignedIn>
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
      </SignedOut>
    </nav>
  )
}

export default Navbar