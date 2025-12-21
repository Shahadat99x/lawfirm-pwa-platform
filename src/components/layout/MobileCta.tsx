"use client"

import { Phone, MessageSquare } from "lucide-react"

export default function MobileCta() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
            <a
                href="tel:+37012345678"
                className="flex flex-1 flex-col items-center justify-center border-r border-gray-100 hover:bg-gray-50 text-slate-900"
            >
                <Phone className="h-5 w-5 mb-0.5" />
                <span className="text-xs font-semibold">Call Us</span>
            </a>
            <a
                href="https://wa.me/37012345678"
                className="flex flex-1 flex-col items-center justify-center hover:bg-gray-50 text-green-600"
            >
                <MessageSquare className="h-5 w-5 mb-0.5" />
                <span className="text-xs font-semibold">WhatsApp</span>
            </a>
        </div>
    )
}
