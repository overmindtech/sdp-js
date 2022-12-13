import WS from "jest-websocket-mock";
import { describe, expect, it, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { Util, GatewaySession } from '../../'
import * as data from './sampledata'

// create a WS instance
const TestServerAddress = 'ws://localhost:31274'
  
describe('GatewaySession', () => {
    describe('with a running server', () => {
        var server = new WS(TestServerAddress, {
            jsonProtocol: false,
        });

        afterAll(() => {
            server.close();
        })
    
        describe('connecting', () => {
            var gs = new GatewaySession(TestServerAddress);
            
            beforeAll(async () => {
                await gs.ready
            });

            afterAll(() => {
                gs.close();
            })

            it('connects successfully', async () => {
                expect(gs.state()).toBe(WebSocket.OPEN);
            })
    
            it('sends requests', async () => {
                gs.sendRequest(data.gatewayRequest.itemRequest);
    
                expect(await server.nextMessage).toEqual(data.gatewayRequest.itemRequest.serializeBinary());
            })
        })
    
        describe('Processing inbound messages', () => {
            var gs = new GatewaySession(TestServerAddress);
            
            beforeAll(async () => {
                await gs.ready
            });

            afterAll(() => {
                gs.close();
            })
    
            describe('Error', () => {
                it('should call the callback', (done) => {
                    var response = Util.newGatewayResponse("some error")
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.ErrorEvent, (event) => {
                        expect(event.detail).toEqual("some error")
                        done();
                    }, { once: true })
    
                    server.send(response.serializeBinary().buffer);
                })
            })
            describe('NewItem', () => {
                it('should call the callback', (done) => {
                    var response = Util.newGatewayResponse(data.itemData.dylan)
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.NewItemEvent, (event) => {
                        expect(event.detail.getType()).toEqual(data.item.dylan.getType())
                        done();
                    }, { once: true })
    
                    server.send(response.serializeBinary().buffer);
                })
            })
            describe('NewEdge', () => {
                it('should call the callback', (done) => {
                    var response = Util.newGatewayResponse(data.edgeData.basic)
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.NewEdgeEvent, (event) => {
                        expect(event.detail.getFrom()).toEqual(data.edge.basic.getFrom())
                        expect(event.detail.getTo()).toEqual(data.edge.basic.getTo())
                        done();
                    }, { once: true })
    
                    server.send(response.serializeBinary().buffer);
                })
            })
            describe('NewItemRequestError', () => {
                it('should call the callback', (done) => {
                    var response = Util.newGatewayResponse(data.errorData.NOSCOPE)
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.NewItemRequestErrorEvent, (event) => {
                        expect(event.detail.getScope()).toEqual(data.error.NOSCOPE.getScope());
                        expect(event.detail.getErrortype()).toEqual(data.error.NOSCOPE.getErrortype());
                        done();
                    }, { once: true })
    
                    server.send(response.serializeBinary().buffer);
                })
            })
            describe('Status', () => {
                it('should call the callback', (done) => {
                    var response = Util.newGatewayResponse(data.gatewayStatusData.working)
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.StatusEvent, (event) => {
                        expect(event.detail.getPostprocessingcomplete()).toEqual(data.gatewayStatus.working.getPostprocessingcomplete());
                        expect(event.detail.getSummary()?.toObject()).toEqual(data.gatewayStatus.working.getSummary()?.toObject());
                        done();
                    }, {once: true})
    
                    server.send(response.serializeBinary().buffer);
                })
                
                it('should update the status', (done) => {
                    var working = Util.newGatewayResponse(data.gatewayStatusData.working)
                    var doneResponse = Util.newGatewayResponse(data.gatewayStatusData.done)
    
                    // Register the callbacks
                    gs.addEventListener(GatewaySession.StatusEvent, () => {
                        expect(gs.status?.postprocessingcomplete).toEqual(data.gatewayStatus.working.getPostprocessingcomplete());
                        expect(gs.status?.summary).toEqual(data.gatewayStatus.working.getSummary()?.toObject());
    
                        // Add the second test
                        gs.addEventListener(GatewaySession.StatusEvent, () => {
                            expect(gs.status?.postprocessingcomplete).toEqual(data.gatewayStatus.done.getPostprocessingcomplete());
                            expect(gs.status?.summary).toEqual(data.gatewayStatus.done.getSummary()?.toObject());
                            done();
                        }, { once: true })
    
                        server.send(doneResponse.serializeBinary().buffer);
                    }, { once: true })
    
                    server.send(working.serializeBinary().buffer);
                })
            })
        })    
    })

    describe('handling disconnection', () => {
        var gs: GatewaySession;
        var server: WS;
        
        beforeEach(async () => {
            server = new WS(TestServerAddress, {
                jsonProtocol: false,
            });
            gs = new GatewaySession(TestServerAddress);
            await gs.ready
        }, );

        it('should trigger an event', async () => {
            expect(gs.state()).toBe(WebSocket.OPEN);

            var close = new Promise<CloseEvent>((resolve) => {
                gs.addEventListener(GatewaySession.CloseEvent, (event) => {
                    resolve(event.detail);
                })
            })

            var error = new Promise<void>((resolve) => {
                gs.addEventListener(GatewaySession.SocketErrorEvent, (event) => {
                    resolve();
                })
            })

            server.error();

            var ce = await close;

            expect(ce).toHaveProperty('reason');
            expect(ce).toHaveProperty('code');
            expect(ce).toHaveProperty('wasClean');

            await error;
        })

        it('should pass through error codes on bad close', async () => {
            expect(gs.state()).toBe(WebSocket.OPEN);

            var close = new Promise<CloseEvent>((resolve) => {
                gs.addEventListener(GatewaySession.CloseEvent, (event) => {
                    resolve(event.detail);
                })
            })
            
            server.error({
                code: 1011,
                reason: 'Internal Error',
                wasClean: false,
            });

            var ce = await close;

            expect(ce).toHaveProperty('reason');
            expect(ce).toHaveProperty('code');
            expect(ce).toHaveProperty('wasClean');
            expect(ce.code).toBe(1011);
            expect(ce.reason).toBe('Internal Error');
            expect(ce.wasClean).toBe(false);

        })

        it('should pass through error codes on clean close', async () => {
            expect(gs.state()).toBe(WebSocket.OPEN);

            var close = new Promise<CloseEvent>((resolve) => {
                gs.addEventListener(GatewaySession.CloseEvent, (event) => {
                    resolve(event.detail);
                })
            })


            server.close();

            var ce = await close;

            expect(ce).toHaveProperty('reason');
            expect(ce).toHaveProperty('code');
            expect(ce).toHaveProperty('wasClean');
            expect(ce.code).toBe(1000);
            expect(ce.reason).toBe('');
            expect(ce.wasClean).toBe(true);
        })
    })
})