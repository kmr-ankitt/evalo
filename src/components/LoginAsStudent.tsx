"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"

type Props = {
  className?: string
}

export default function LoginAsStudent({ className }: Props) {
  const router = useRouter()

  return (
      <button
        onClick={() => router.push('/profile')}
        className={className ?? "flex items-center gap-3 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 shadow-sm"}
      >
        <User className="w-5 h-5" />
        <div className="text-left">
          <div className="font-semibold">Login as Student</div>
          <div className="text-sm text-gray-200/80">Open your profile & run code</div>
        </div>
      </button>
    
  )
}
