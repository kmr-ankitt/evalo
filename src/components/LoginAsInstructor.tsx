"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"

type Props = {
  className?: string
}

export default function LoginAsInstructor({ className }: Props) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/teacher')}
      className={className ?? "flex items-center gap-3 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 shadow-sm"}
    >
        <UserPlus className="w-5 h-5" />
        <div className="text-left">
          <div className="font-semibold">Login as Instructor</div>
          <div className="text-sm text-gray-200/80">Teacher dashboard & tools</div>
        </div>
    </button>
  )
}
