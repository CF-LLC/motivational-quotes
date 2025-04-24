"use client"

import { useEffect, useRef } from "react"

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string
}

export function BackgroundBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ballsRef = useRef<Ball[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initBalls()
    }

    // Generate random neon colors
    const getNeonColor = () => {
      const neonColors = [
        "#FF00FF", // Magenta
        "#00FFFF", // Cyan
        "#FF0099", // Pink
        "#00FF00", // Green
        "#FFF700", // Yellow
        "#FF3300", // Orange
        "#9D00FF", // Purple
        "#00FF99", // Mint
      ]
      return neonColors[Math.floor(Math.random() * neonColors.length)]
    }

    // Initialize balls
    const initBalls = () => {
      const ballCount = Math.max(5, Math.floor((canvas.width * canvas.height) / 100000))
      ballsRef.current = []

      for (let i = 0; i < ballCount; i++) {
        const radius = Math.random() * 20 + 10
        ballsRef.current.push({
          x: Math.random() * (canvas.width - radius * 2) + radius,
          y: Math.random() * (canvas.height - radius * 2) + radius,
          dx: (Math.random() - 0.5) * 4,
          dy: (Math.random() - 0.5) * 4,
          radius,
          color: getNeonColor(),
        })
      }
    }

    // Update ball positions
    const updateBalls = () => {
      ballsRef.current.forEach((ball) => {
        ball.x += ball.dx
        ball.y += ball.dy

        // Bounce off walls
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.dx = -ball.dx
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.dy = -ball.dy
        }
      })
    }

    // Draw balls
    const drawBalls = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ballsRef.current.forEach((ball) => {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = ball.color
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = ball.color
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    // Animation loop
    const animate = () => {
      updateBalls()
      drawBalls()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}

