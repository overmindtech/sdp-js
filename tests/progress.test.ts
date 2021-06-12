import { assert } from 'chai';
import { RequestProgress } from '../progress';
import * as requests from './requests';
import * as responses from './responses';

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

        // it('marks as failed if failed response', () => {
        
        // });

        // it('marks as stalled if no response', () => {
        
        // });
        
    });

});
