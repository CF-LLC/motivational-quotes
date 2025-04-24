"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QuoteAnimation } from "@/components/quote-animation"
import { BackgroundBalls } from "@/components/background-balls"

export default function Home() {
  const [step, setStep] = useState<"form" | "quote">("form")
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [quote, setQuote] = useState("")

  const generateQuote = () => {
    if (!name || !goal) return

    const quotes = [
      `${name}, your journey to ${goal} begins with a single step. Keep moving forward!`,
      `The path to ${goal} may be challenging, but ${name}, you have the strength to overcome!`,
      `${name}, believe in yourself and ${goal} will become your reality!`,
      `Every day ${name} takes action is a day closer to achieving ${goal}!`,
      `${name}, your determination will turn ${goal} from a dream into your legacy!`,
      `The fire within ${name} burns brighter than any obstacle on the path to ${goal}!`,
      `${name}, success in ${goal} isn't about perfection, it's about persistence!`,
      `When ${name} refuses to give up, ${goal} becomes inevitable!`,
    ]

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    setStep("quote")
  }

  const handleReset = () => {
    setStep("form")
    setQuote("")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      {step === "form" ? (
        <>
          <BackgroundBalls />
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">Motivational Quote Generator</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Answer two questions to receive your personalized motivational quote
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  What's your name?
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-gray-200">
                  What's your biggest goal right now?
                </Label>
                <Input
                  id="goal"
                  placeholder="e.g., running a marathon, learning to code"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                onClick={generateQuote}
                disabled={!name || !goal}
              >
                Generate My Quote
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col">
          <QuoteAnimation quote={quote} />
          <div className="fixed bottom-8 left-0 right-0 flex justify-center z-10">
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-black text-white border-white hover:bg-gray-800"
            >
              Create Another Quote
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}
