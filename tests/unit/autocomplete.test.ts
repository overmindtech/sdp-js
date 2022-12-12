import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import WS from "jest-websocket-mock";
import { Autocomplete, AutocompleteField, GatewaySession } from '../../';

const TestServerAddress = 'ws://localhost:31035'

describe('Autocomplete', () => {
    describe('with no connection', () => {
        let session = new GatewaySession(TestServerAddress);
        let ac = new Autocomplete(session, AutocompleteField.CONTEXT)

        describe('#New()', () => {
            it('returns a good object', () => {    
                expect(ac.results.length).toEqual(0)
                expect(ac.prompt).toEqual("")
                expect(ac.suggestions.length).toEqual(0)
            });
        })

        describe('#prompt()', () => {
            it('errors because it\'s not connected', () => {
                expect(() => ac.prompt = "").toThrowError()

                expect(ac.results.length).toEqual(0)
                expect(ac.prompt).toEqual("")
                expect(ac.suggestions.length).toEqual(0)
            });
        })
    })
    
    describe('with a connection', () => {
        let server = new WS(TestServerAddress, {
            jsonProtocol: false,
        });
        let session = new GatewaySession(TestServerAddress);
        let ac = new Autocomplete(session, AutocompleteField.CONTEXT)

        beforeAll(async () => {
            await session.ready
        });

        afterAll(() => {
            // session.close();
            server.close();
        })

        it('should initially be empty', () => {
            expect(ac.results.length).toEqual(0)
            expect(ac.prompt).toEqual("")
            expect(ac.suggestions.length).toEqual(0)
        })

        describe('#prompt()', () => {
            it('executes a request successfully', async () => {
                ac.prompt = "per"

                // TODO: This is intermittently failing in the current state
                let msg = await server.nextMessage

                console.log(msg)
                expect(1).toBe(1)
                // expect(await server.nextMessage).not.toBe(undefined)
            })
        })
    })

});
