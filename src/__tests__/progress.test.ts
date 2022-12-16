/**
 * @jest-environment jsdom
 */

import { RequestProgress } from '../RequestProgress'
import * as data from './sampledata.helper'

describe('RequestProgress', () => {
  beforeAll(() => {
    jest.useFakeTimers({ advanceTimers: true })
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  describe('#processResponse()', () => {
    it('processes an initial WORKING response', () => {
      // Create the progress object
      const progress = new RequestProgress(data.request.LIST)

      expect(progress.numWorking()).toEqual(0)

      // Process a WORKING response
      progress.processResponse(data.response.WORKING)

      expect(progress.numWorking()).toEqual(1)
    })

    it('updates after a second WORKING response', () => {
      // Create the progress object
      const progress = new RequestProgress(data.request.LIST)

      expect(progress.numWorking()).toEqual(0)

      // Process a WORKING response
      progress.processResponse(data.response.WORKING)

      expect(progress.numWorking()).toEqual(1)

      progress.processResponse(data.response.WORKING)

      // Should still be one since it was for the same scope
      expect(progress.numWorking()).toEqual(1)
    })

    it('marks as done after a COMPLETE response', () => {
      // Create the progress object
      const progress = new RequestProgress(data.request.LIST)

      progress.processResponse(data.response.WORKING)

      expect(progress.numWorking()).toEqual(1)

      progress.processResponse(data.response.COMPLETE)

      expect(progress.numWorking()).toEqual(0)
    })

    it('marks as failed if FAILED response', () => {
      const progress = new RequestProgress(data.request.LIST)

      progress.processResponse(data.response.WORKING)

      expect(progress.numWorking()).toEqual(1)
      expect(progress.numFailed()).toEqual(0)

      progress.processResponse(data.response.ERROR)

      expect(progress.numWorking()).toEqual(0)
      expect(progress.numFailed()).toEqual(1)
      expect(progress.allDone()).toEqual(true)
    })

    it('marks as done after a CANCELLED response', () => {
      // Create the progress object
      const progress = new RequestProgress(data.request.LIST)

      progress.processResponse(data.response.WORKING)

      expect(progress.numWorking()).toEqual(1)

      progress.processResponse(data.response.CANCELLED)

      expect(progress.numWorking()).toEqual(0)
      expect(progress.numCancelled()).toEqual(1)
      expect(progress.allDone()).toEqual(true)
    })
  })

  describe('#waitForCompletion()', () => {
    it('should complete successfully', async () => {
      const progress = new RequestProgress(data.request.LIST)

      progress.processResponse(data.response.WORKING)
      progress.processResponse(data.response.COMPLETE)

      const result = await progress.waitForCompletion()

      expect(result).toEqual('done')
      expect(progress.percentComplete()).toEqual(100)
    })

    it('should timeout successfully', async () => {
      const progress = new RequestProgress(data.request.LIST)

      const result = await progress.waitForCompletion(100)

      progress.cancel()

      expect(result).toEqual('timeout')
    })

    it('should stall successfully', async () => {
      const progress = new RequestProgress(data.request.LIST, 10)

      progress.processResponse(data.response.WORKING)

      await new Promise((resolve) => setTimeout(resolve, 150))

      expect(progress.numStalled()).toEqual(1)
    })
  })
})
