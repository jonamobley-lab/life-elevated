'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-indigo-700">Life. Elevated</div>
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  )
}