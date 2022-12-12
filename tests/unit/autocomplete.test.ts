import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import WS from "jest-websocket-mock";
import { Autocomplete, AutocompleteField, GatewaySession, GatewayRequest } from '../../';

const TestServerAddress = 'ws://localhost:31035'

describe('Autocomplete', () => {
    describe('with a connection', () => {
        let server: WS;
        let session: GatewaySession
        let ac: Autocomplete

        beforeEach(async () => {
            server = new WS(TestServerAddress, {
                jsonProtocol: false,
            });
            session = new GatewaySession(TestServerAddress);
            
            await session.ready

            ac = new Autocomplete(session, AutocompleteField.CONTEXT)
        });

        afterEach(() => {
            session.close();
            server.close();
        })

        it('should initially be empty', () => {
            expect(ac.results.length).toEqual(0)
            expect(ac.prompt).toEqual("")
            expect(ac.suggestions.length).toEqual(0)
        })

        describe('#prompt()', () => {
            it('executes a request when the prompt changes', async () => {
                ac.prompt = "per"

                let msg = await server.nextMessage

                expect(async () => await server.nextMessage).not.toThrowError()
            })

            it('handles prompt changes', async () => {
                ac.prompt = "per"

                // Send just the new request
                let msg = await server.nextMessage

                expect(msg).not.toBeUndefined()
                if (msg instanceof Uint8Array) {
                    let req = GatewayRequest.deserializeBinary(msg)

                    expect(req.getRequest()?.getType()).toEqual('overmind-context')
                    expect(req.getRequest()?.getQuery()).toEqual(ac.prompt)
                    expect(req.getRequest()?.getContext()).toEqual('global')
                } else {
                    // Is there a better way to fail here?
                    expect(false).toBeTruthy()
                }
                ac.prompt = "pers"

                // The cancellation
                msg = await server.nextMessage
                expect(msg).not.toBeUndefined()

                if (msg instanceof Uint8Array) {
                    let req = GatewayRequest.deserializeBinary(msg)

                    expect(req.getCancel()?.getUuid_asB64().length).not.toEqual('')
                } else {
                    // Is there a better way to fail here?
                    expect(false).toBeTruthy()
                }

                // The new request
                msg = await server.nextMessage
                expect(msg).not.toBeUndefined()
                if (msg instanceof Uint8Array) {
                    let req = GatewayRequest.deserializeBinary(msg)

                    expect(req.getRequest()?.getType()).toEqual('overmind-context')
                    expect(req.getRequest()?.getQuery()).toEqual(ac.prompt)
                    expect(req.getRequest()?.getContext()).toEqual('global')
                } else {
                    // Is there a better way to fail here?
                    expect(false).toBeTruthy()
                }
            })
        })
    })

});
