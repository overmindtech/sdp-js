import { assert } from 'chai';
import { RequestProgress } from '../progress';
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

        // it('marks as stalled if no response', () => {
        
        // });
        
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
        it('should complete successfully', () => {
            var progress = new RequestProgress(requests.FIND);
            
            var status = progress.waitForCompletion();
            progress.processResponse(responses.WORKING);
            progress.processResponse(responses.COMPLETE)

            status.then((result) => {
                assert.strictEqual(result, "done")
            })
        });

        it('should timeout successfully', () => {
            var progress = new RequestProgress(requests.FIND);
            
            var status = progress.waitForCompletion(100);

            status.then((result) => {
                assert.strictEqual(result, "timeout")
            })
        });

        it('should stall successfully', async () => {
            var progress = new RequestProgress(requests.FIND, 10);
            
            progress.processResponse(responses.WORKING);

            await new Promise(resolve => setTimeout(resolve, 150))

            assert.strictEqual(progress.numStalled(), 1)
        });
    })

});
