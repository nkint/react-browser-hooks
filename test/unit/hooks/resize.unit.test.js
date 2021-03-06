import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

import { useResize } from '../../../src'
import * as constants from '../../../src/constants'

afterEach(cleanup)

describe('useResize', () => {
  describe('when rendered on the server', () => {
    beforeAll(() => {
      constants.IS_SERVER = true
    })

    afterAll(() => {
      constants.IS_SERVER = false
    })

    it('defaults to null, null', () => {
      let width, height

      renderHook(() => ({ width, height } = useResize()))

      expect(width).toBe(null)
      expect(height).toBe(null)
    })
  })

  it('sets initial state to window.inner* values', () => {
    let width, height

    window.innerWidth = 100
    window.innerHeight = 100

    renderHook(() => ({ width, height } = useResize()))

    expect(width).toBe(100)
    expect(height).toBe(100)
  })

  it('updates state on "resize"', () => {
    let width, height

    window.innerWidth = 100
    window.innerHeight = 100

    act(() => {
      renderHook(() => ({ width, height } = useResize()))
    })

    window.innerWidth = 200
    window.innerHeight = 200

    act(() => {
      fireEvent(
        window,
        new Event('resize', {
          bubbles: false,
          cancelable: false
        })
      )
    })

    expect(width).toBe(200)
    expect(height).toBe(200)
  })
})
