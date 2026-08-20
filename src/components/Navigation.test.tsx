import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Navigation from './Navigation'

afterEach(cleanup)

describe('Navigation', () => {
  it('keeps the mobile navigation out of the tab order while closed', () => {
    render(<Navigation />)

    const mobileNavigation = document.querySelector('#mobile-navigation')
    expect(mobileNavigation).toBeInTheDocument()
    expect([...mobileNavigation!.querySelectorAll('a')].every((link) => link.tabIndex === -1)).toBe(true)

    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))
    expect(screen.getByRole('navigation', { name: '移动端主要导航' })).toBeInTheDocument()
    expect([...mobileNavigation!.querySelectorAll('a')].every((link) => link.tabIndex === 0)).toBe(true)
  })
})
