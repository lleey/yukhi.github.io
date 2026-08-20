import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ScenarioSwitcher from './ScenarioSwitcher'
import { scenarios } from '../data/showcase'

afterEach(cleanup)

describe('ScenarioSwitcher', () => {
  it('marks the first scenario as selected', () => {
    render(
      <ScenarioSwitcher
        activeScenarioId={scenarios[0].id}
        onScenarioChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('tab', { name: scenarios[0].label })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent(scenarios[0].title)
  })

  it('moves focus to the next tab with the right arrow key', () => {
    const onScenarioChange = vi.fn()
    render(
      <ScenarioSwitcher
        activeScenarioId={scenarios[0].id}
        onScenarioChange={onScenarioChange}
      />,
    )

    const firstTab = screen.getByRole('tab', { name: scenarios[0].label })
    firstTab.focus()
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' })

    expect(document.activeElement).toBe(screen.getByRole('tab', { name: scenarios[1].label }))
    expect(onScenarioChange).toHaveBeenCalledWith(scenarios[1].id)
  })

  it('requests a scenario change when a tab is clicked', () => {
    const onScenarioChange = vi.fn()
    render(
      <ScenarioSwitcher
        activeScenarioId={scenarios[0].id}
        onScenarioChange={onScenarioChange}
      />,
    )

    fireEvent.click(screen.getByRole('tab', { name: scenarios[1].label }))

    expect(onScenarioChange).toHaveBeenCalledWith(scenarios[1].id)
  })
})
