import { assert } from 'chai';
import { RequestProgress } from '../index';
import * as data from './sampledata';

describe('RequestProgress', () => {
    describe('#processResponse()', () => {
        it('processes an initial WORKING response', () => {
            // Create the progress object
            var progress = new RequestProgress(data.request.FIND);

            assert.strictEqual(progress.numWorking(), 0)

            // Process a WORKING response
            progress.processResponse(data.response.WORKING);

            assert.strictEqual(progress.numWorking(), 1)
        });

        it('updates after a second WORKING response', () => {
            // Create the progress object
            var progress = new RequestProgress(data.request.FIND);

            assert.strictEqual(progress.numWorking(), 0)

            // Process a WORKING response
            progress.processResponse(data.response.WORKING);

            assert.strictEqual(progress.numWorking(), 1)

            progress.processResponse(data.response.WORKING);

            // Should still be one since it was for the same context
            assert.strictEqual(progress.numWorking(), 1)
        });

        it('marks as done after a COMPLETE response', () => {
            // Create the progress object
            var progress = new RequestProgress(data.request.FIND);

            progress.processResponse(data.response.WORKING);

            assert.strictEqual(progress.numWorking(), 1)

            progress.processResponse(data.response.COMPLETE)

            assert.strictEqual(progress.numWorking(), 0)
        });

        it('marks as failed if FAILED response', () => {
            var progress = new RequestProgress(data.request.FIND);
            
            progress.processResponse(data.response.WORKING);

            assert.strictEqual(progress.numWorking(), 1);
            assert.strictEqual(progress.numFailed(), 0);

            progress.processResponse(data.response.ERROR);

            assert.strictEqual(progress.numWorking(), 0);
            assert.strictEqual(progress.numFailed(), 1);
            assert.strictEqual(progress.allDone(), true);
        });

        it('marks as done after a CANCELLED response', () => {
            // Create the progress object
            var progress = new RequestProgress(data.request.FIND);

            progress.processResponse(data.response.WORKING);

            assert.strictEqual(progress.numWorking(), 1)

            progress.processResponse(data.response.CANCELLED)

            assert.strictEqual(progress.numWorking(), 0)
            assert.strictEqual(progress.numCancelled(), 1)
            assert.strictEqual(progress.allDone(), true);
        });
    });

    describe("#waitForCompletion()", () => {
        it('should complete successfully', async () => {
            var progress = new RequestProgress(data.request.FIND);
            
            progress.processResponse(data.response.WORKING);
            progress.processResponse(data.response.COMPLETE)

            var result = await progress.waitForCompletion();
            
            assert.strictEqual(result, "done")
            assert.strictEqual(progress.percentComplete(), 100)
        });

        it('should timeout successfully', async () => {
            var progress = new RequestProgress(data.request.FIND);
            
            var result = await progress.waitForCompletion(100);

            progress.cancel()

            assert.strictEqual(result, "timeout")
        });

        it('should stall successfully', async () => {
            var progress = new RequestProgress(data.request.FIND, 10);
            
            progress.processResponse(data.response.WORKING);

            await new Promise(resolve => setTimeout(resolve, 150))

            assert.strictEqual(progress.numStalled(), 1)
        });
    })

});
