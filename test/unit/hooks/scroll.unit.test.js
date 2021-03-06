import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

import { useScroll } from '../../../src'
import * as constants from '../../../src/constants'

afterEach(cleanup)

describe('useScroll', () => {
  describe('when rendered on the server', () => {
    beforeAll(() => {
      constants.IS_SERVER = true
    })

    afterAll(() => {
      constants.IS_SERVER = false
    })

    it('defaults to 0, 0', () => {
      let top, left

      renderHook(() => ({ top, left } = useScroll()))

      expect(top).toBe(0)
      expect(left).toBe(0)
    })
  })

  it('sets initial state to window.scroll values', () => {
    let top, left

    window.pageXOffset = 0
    window.pageYOffset = 0

    renderHook(() => ({ top, left } = useScroll()))

    expect(top).toBe(0)
    expect(left).toBe(0)
  })

  it('updates state on "scroll" event', () => {
    let top, left

    window.pageXOffset = 0
    window.pageYOffset = 0

    act(() => {
      renderHook(() => ({ top, left } = useScroll()))
    })

    window.pageXOffset = 100
    window.pageYOffset = 100

    act(() => {
      fireEvent(
        window,
        new Event('scroll', {
          bubbles: false,
          cancelable: false
        })
      )
    })

    expect(top).toBe(100)
    expect(left).toBe(100)
  })
})
