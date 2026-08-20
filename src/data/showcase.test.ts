import { describe, expect, it } from 'vitest'
import { capabilities, demos, getDemo, getScenario, scenarios } from './showcase'

describe('showcase data', () => {
  it('contains the four narrative capabilities', () => {
    expect(capabilities).toHaveLength(4)
    expect(new Set(capabilities.map((item) => item.id)).size).toBe(4)
  })

  it('contains three audience scenarios and four demo prompts', () => {
    expect(scenarios).toHaveLength(3)
    expect(demos).toHaveLength(4)
  })

  it('falls back to the first item for an unknown id', () => {
    expect(getScenario('missing')).toEqual(scenarios[0])
    expect(getDemo('missing')).toEqual(demos[0])
  })

  it('keeps all demo result content local and structured', () => {
    expect(demos.every((demo) => demo.steps.length > 0)).toBe(true)
    expect(demos.every((demo) => demo.result.items.length > 0)).toBe(true)
  })
})
