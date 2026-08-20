import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react'
import DemoConsole from './DemoConsole'
import { demos } from '../data/showcase'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('DemoConsole', () => {
  it('starts without selecting a demo', () => {
    render(<DemoConsole />)

    expect(screen.getByText('等待选择')).toBeInTheDocument()
    expect(screen.getByText('从一个问题开始。')).toBeInTheDocument()
  })

  it('progresses from thinking to responding to complete', () => {
    vi.useFakeTimers()
    render(<DemoConsole />)

    fireEvent.click(screen.getByRole('button', { name: demos[0].prompt }))
    expect(screen.getByText('正在理解你的问题')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(800)
    })
    expect(screen.getByText('正在形成回应')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2600)
    })
    expect(screen.getByText(demos[0].result.title)).toBeInTheDocument()
  })

  it('clears an earlier response when another prompt is selected', () => {
    vi.useFakeTimers()
    render(<DemoConsole />)

    fireEvent.click(screen.getByRole('button', { name: demos[0].prompt }))
    act(() => {
      vi.advanceTimersByTime(800)
    })
    fireEvent.click(screen.getByRole('button', { name: demos[1].prompt }))
    act(() => {
      vi.advanceTimersByTime(3400)
    })

    expect(screen.getByText(demos[1].result.title)).toBeInTheDocument()
    expect(screen.queryByText(demos[0].result.title)).not.toBeInTheDocument()
  })
})
