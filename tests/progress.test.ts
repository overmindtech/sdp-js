import { assert } from 'chai';
import { RequestProgress } from '../index';
import * as requests from './requests';
import * as responses from './responses';
import * as errors from './errors';

describe('RequestProgress', () => {
    describe('#processResponse()', () => {
        it('processes an initial WORKING response', () => {
            // Create the progress object
            var progress = new RequestProgress(requests.FIND);

            assert.strictEqual(progress.numWorking(), 0)

            // Process a WORKING response
            progress.processResponse(responses.WORKING);

            assert.strictEqual(progress.numWorking(), 1)
        });

        it('updates after a second WORKING response', () => {
            // Create the progress object
            var progress = new RequestProgress(requests.FIND);

            assert.strictEqual(progress.numWorking(), 0)

            // Process a WORKING response
            progress.processResponse(responses.WORKING);

            assert.strictEqual(progress.numWorking(), 1)

            progress.processResponse(responses.WORKING);

            // Should still be one since it was for the same context
            assert.strictEqual(progress.numWorking(), 1)
        });

        it('marks as done after a COMPLETE response', () => {
            // Create the progress object
            var progress = new RequestProgress(requests.FIND);

            progress.processResponse(responses.WORKING);

            assert.strictEqual(progress.numWorking(), 1)

            progress.processResponse(responses.COMPLETE)

            assert.strictEqual(progress.numWorking(), 0)
        });
        
    });

    describe("#processError()", () => {
        it('marks as failed if failed response', () => {
            var progress = new RequestProgress(requests.FIND);
            
            progress.processResponse(responses.WORKING);

            assert.strictEqual(progress.numWorking(), 1);
            assert.strictEqual(progress.numFailed(), 0);

            progress.processError(errors.NOTFOUND)

            assert.strictEqual(progress.numWorking(), 0);
            assert.strictEqual(progress.numFailed(), 1);
        });
    })

    describe("#waitForCompletion()", () => {
        it('should complete successfully', async () => {
            var progress = new RequestProgress(requests.FIND);
            
            progress.processResponse(responses.WORKING);
            progress.processResponse(responses.COMPLETE)

            var result = await progress.waitForCompletion();
            
            assert.strictEqual(result, "done")
            assert.strictEqual(progress.percentComplete(), 100)
        });

        it('should timeout successfully', async () => {
            var progress = new RequestProgress(requests.FIND);
            
            var result = await progress.waitForCompletion(100);

            progress.cancel()

            assert.strictEqual(result, "timeout")
        });

        it('should stall successfully', async () => {
            var progress = new RequestProgress(requests.FIND, 10);
            
            progress.processResponse(responses.WORKING);

            await new Promise(resolve => setTimeout(resolve, 150))

            assert.strictEqual(progress.numStalled(), 1)
        });
    })

});
