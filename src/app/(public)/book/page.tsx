"use client"

import { useState, useEffect } from "react"
import Container from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Select } from "@/components/ui/Select"
import { Calendar, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function BookPage() {
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [takenSlots, setTakenSlots] = useState<string[]>([])
    const [loadingSlots, setLoadingSlots] = useState(false)

    // Form State
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Generate time slots (09:00 - 16:30, 30 min intervals)
    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
    ] // Skipped 12:00-13:00 for lunch? Or just standard. Added lunch break implicitly by removing 12:xx.

    useEffect(() => {
        if (!selectedDate) {
            setTakenSlots([])
            return
        }

        async function fetchAvailability() {
            setLoadingSlots(true)
            try {
                const res = await fetch(`/api/appointments/availability?date=${selectedDate}`)
                const data = await res.json()
                if (data.takenSlots) {
                    setTakenSlots(data.takenSlots)
                }
            } catch (err) {
                console.error("Failed to fetch slots", err)
            } finally {
                setLoadingSlots(false)
            }
        }

        fetchAvailability()
        setSelectedTime("") // Reset time when date changes
    }, [selectedDate])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!selectedDate || !selectedTime) {
            setError("Please select a date and time.")
            return
        }

        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const payload = {
            ...data,
            gdpr_consent: data.gdpr_consent === 'on',
            appointment_date: selectedDate,
            appointment_time: selectedTime,
        }

        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Something went wrong')
            }

            setIsSuccess(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unexpected error occurred.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Date constraints
    const today = new Date().toISOString().split('T')[0]
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30) // 30 days out
    const maxDateStr = maxDate.toISOString().split('T')[0]

    if (isSuccess) {
        return (
            <div className="bg-white py-24 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Request Received!</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We have received your appointment request for <strong>{selectedDate} at {selectedTime}</strong>.
                        </p>
                        <p className="mt-2 text-gray-600">
                            We will review it and send a confirmation email shortly.
                        </p>
                        <div className="mt-10">
                            <Button asChild onClick={() => window.location.reload()}>
                                <a href="/">Return Home</a>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">Book a Consultation</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Select a time that works for you.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left/Top: Date & Time Selection */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    1. Select Date
                                </h3>
                                <Input
                                    type="date"
                                    min={today}
                                    max={maxDateStr}
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-2">Weekdays only</p>
                            </div>

                            <div className={`bg-slate-50 p-6 rounded-xl border border-slate-100 ${!selectedDate ? 'opacity-50 pointer-events-none' : ''}`}>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    2. Select Time
                                </h3>

                                {loadingSlots ? (
                                    <div className="text-center py-4 text-gray-500">Checking availability...</div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {timeSlots.map(time => {
                                            const isTaken = takenSlots.includes(time)
                                            const isSelected = selectedTime === time
                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    disabled={isTaken}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`
                                                        px-2 py-2 text-sm rounded-md transition-all border
                                                        ${isSelected
                                                            ? 'bg-primary text-white border-primary shadow-md'
                                                            : isTaken
                                                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                                                        }
                                                    `}
                                                >
                                                    {time}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right/Bottom: Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white p-0 space-y-6">
                                {error && (
                                    <div className="p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-red-700">{error}</div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="full_name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2.5">
                                            <Input name="full_name" id="full_name" required autoComplete="name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2.5">
                                            <Input type="email" name="email" id="email" required autoComplete="email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Phone
                                        </label>
                                        <div className="mt-2.5">
                                            <Input type="tel" name="phone" id="phone" autoComplete="tel" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="practice_area_slug" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Topic <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2.5">
                                            <Select name="practice_area_slug" id="practice_area_slug" required defaultValue="">
                                                <option value="" disabled>Select a topic...</option>
                                                <option value="immigration">Immigration Law</option>
                                                <option value="business-setup">Business Setup</option>
                                                <option value="employment">Employment Law</option>
                                                <option value="other">Other Inquiry</option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Details (Optional)
                                    </label>
                                    <div className="mt-2.5">
                                        <Textarea name="message" id="message" rows={3} placeholder="Any specific questions?" />
                                    </div>
                                </div>

                                <div className="flex gap-x-3 items-start">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="gdpr_consent"
                                            name="gdpr_consent"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <label htmlFor="gdpr_consent" className="text-sm leading-6 text-gray-600">
                                        I agree to the privacy policy and consent to processing my data. <span className="text-red-500">*</span>
                                    </label>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full" size="lg" disabled={isLoading || !selectedDate || !selectedTime}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...
                                            </>
                                        ) : (
                                            "Confirm Booking"
                                        )}
                                    </Button>
                                    {!selectedTime && <p className="text-center text-sm text-gray-500 mt-2">Please select date and time first</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
