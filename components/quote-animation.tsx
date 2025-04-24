"use client"

import { useEffect, useRef } from "react"

interface QuoteAnimationProps {
  quote: string
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export function QuoteAnimation({ quote }: QuoteAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)

  // Create a pixel map for each character
  const PIXEL_MAP: Record<string, number[][]> = {
    A: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
    ],
    B: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
    ],
    C: [
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 1, 1, 1],
    ],
    D: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
    ],
    E: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    F: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    G: [
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
    ],
    H: [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
    ],
    I: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    J: [
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    K: [
      [1, 0, 0, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
      [1, 0, 1, 0],
      [1, 0, 0, 1],
    ],
    L: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    M: [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    N: [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 0, 1],
    ],
    O: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    P: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    Q: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1],
    ],
    R: [
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 0, 1, 0],
      [1, 0, 0, 1],
    ],
    S: [
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 1, 1, 0],
    ],
    T: [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    U: [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    V: [
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
    ],
    W: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1],
    ],
    X: [
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
    ],
    Y: [
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    Z: [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 1],
    ],
    "0": [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    "1": [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    "2": [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 1],
    ],
    "3": [
      [1, 1, 1, 0],
      [0, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 1, 1, 0],
    ],
    "4": [
      [0, 0, 1, 1],
      [0, 1, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 1],
    ],
    "5": [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 1, 1, 0],
    ],
    "6": [
      [0, 1, 1, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    "7": [
      [1, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    "8": [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    "9": [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    "!": [[1], [1], [1], [0], [1]],
    ".": [[0], [0], [0], [0], [1]],
    ",": [[0], [0], [0], [1], [1]],
    "'": [[1], [1], [0], [0], [0]],
    " ": [[0], [0], [0], [0], [0]],
  }

  // Add missing characters with a default pattern
  const getPixelMap = (char: string) => {
    const upperChar = char.toUpperCase()
    return (
      PIXEL_MAP[upperChar] || [
        [1, 1],
        [1, 1],
        [0, 0],
        [1, 1],
        [1, 1],
      ]
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const COLOR = "#FFFFFF"
    const HIT_COLOR = "#333333"
    const BACKGROUND_COLOR = "#000000"
    const BALL_COLOR = "#FFFFFF"
    const PADDLE_COLOR = "#FFFFFF"
    const LETTER_SPACING = 1
    const WORD_SPACING = 3

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame()
    }

    const initializeGame = () => {
      const scale = scaleRef.current
      const PIXEL_SIZE = 8 * scale // 2x bigger text (was 4 * scale)
      const BALL_SPEED = 6 * scale

      pixelsRef.current = []

      // Split the quote into words
      const words = quote.split(" ")

      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterWidth = getPixelMap(letter)[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }

      // Calculate the total width of all words
      const totalWidth = words.reduce((width, word, index) => {
        return width + calculateWordWidth(word, PIXEL_SIZE) + (index > 0 ? WORD_SPACING * PIXEL_SIZE : 0)
      }, 0)

      // Calculate the maximum number of characters that can fit on one line
      const maxLineWidth = canvas.width * 0.8

      // Break the quote into lines
      const lines: string[] = []
      let currentLine = ""
      let currentLineWidth = 0

      words.forEach((word) => {
        const wordWidth = calculateWordWidth(word, PIXEL_SIZE) + (currentLine ? WORD_SPACING * PIXEL_SIZE : 0)

        if (currentLineWidth + wordWidth <= maxLineWidth) {
          currentLine += (currentLine ? " " : "") + word
          currentLineWidth += wordWidth
        } else {
          lines.push(currentLine)
          currentLine = word
          currentLineWidth = calculateWordWidth(word, PIXEL_SIZE)
        }
      })

      if (currentLine) {
        lines.push(currentLine)
      }

      // Calculate the total height of all lines
      const lineHeight = 5 * PIXEL_SIZE
      const spaceBetweenLines = 2 * PIXEL_SIZE
      const totalTextHeight = lines.length * lineHeight + (lines.length - 1) * spaceBetweenLines

      let startY = (canvas.height - totalTextHeight) / 2

      lines.forEach((line) => {
        const lineWidth = line.split(" ").reduce((width, word, index) => {
          return width + calculateWordWidth(word, PIXEL_SIZE) + (index > 0 ? WORD_SPACING * PIXEL_SIZE : 0)
        }, 0)

        let startX = (canvas.width - lineWidth) / 2

        line.split(" ").forEach((word) => {
          word.split("").forEach((letter) => {
            const pixelMap = getPixelMap(letter)

            for (let i = 0; i < pixelMap.length; i++) {
              for (let j = 0; j < pixelMap[i].length; j++) {
                if (pixelMap[i][j]) {
                  const x = startX + j * PIXEL_SIZE
                  const y = startY + i * PIXEL_SIZE
                  pixelsRef.current.push({ x, y, size: PIXEL_SIZE, hit: false })
                }
              }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * PIXEL_SIZE
          })
          startX += WORD_SPACING * PIXEL_SIZE
        })

        startY += lineHeight + spaceBetweenLines
      })

      // Initialize ball position near the top right corner
      const ballStartX = canvas.width * 0.9
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: PIXEL_SIZE * 4, // Bigger ball (was PIXEL_SIZE * 3)
      }

      const paddleWidth = PIXEL_SIZE * 2 // Thicker paddles (was PIXEL_SIZE)
      const paddleLength = 50 * PIXEL_SIZE // Longer paddles (was 40 * PIXEL_SIZE)

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ]
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
          }
        }
      })

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      })

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })
    }

    const drawGame = () => {
      if (!ctx) return

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      ctx.fillStyle = BALL_COLOR
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = PADDLE_COLOR
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [quote])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" aria-label="Motivational quote animation" />
  )
}

