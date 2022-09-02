import { assert, expect } from 'chai';
import * as WS from 'ws';
import { Util } from '..';
import { GatewaySession } from '../gateway'
import { GatewayRequest, GatewayResponse } from '../gateway_pb';
import * as data from './sampledata';

type TestMessageHandler = (msg: GatewayRequest) => void

class TestServer {
    server: WS.Server<WS.WebSocket>;
    address: string
    
    _messageHandlers = new Array<TestMessageHandler>(0);
    
    _socket: WS.WebSocket | undefined
    
    constructor() {
        this.server = new WS.WebSocketServer({
            // Random port between 10000 and 65535
            port: Math.floor(Math.random() * (65535 - 10000 + 1) + 10000),
        });
        
        var address = this.server.address();
        
        if (typeof address == 'string') {
            this.address = address;
        } else {
            this.address = `ws://localhost:${address.port}`;
        }
        
        this.server.on("connection", (socket, request) => {
            if (typeof this._socket != 'undefined') {
                throw 'Socket already established. The test server only supports one socket at once'
            }
            
            this._socket = socket;
            // console.debug('SERVER: Recieved connection')
            
            socket.on('message', (data, isBinary) => {
                if (isBinary && 'buffer' in data) {
                    var handler = this._messageHandlers.pop();
                    
                    if (typeof handler == 'undefined') {
                        throw 'Recieved message but have no handlers'
                    } else {
                        const msg = GatewayRequest.deserializeBinary(data);
                        handler(msg);
                    }
                }
            })
        });
        
        // this.server.on('close', () => {
        //     console.debug('SERVER: Connection closed');
        // })
    }
    
    /**
    * Sends a message to the currently connected session. Throws an error if
    * there is no session connected
    * @param msg The message to send
    */
    send(msg: GatewayResponse) {
        if (typeof this._socket == 'undefined') {
            throw new Error('No socket defined. Please connect before using #send()')
        }
        
        var binary = msg.serializeBinary();

        if (this._socket.readyState != WS.OPEN) {
            throw new Error('Cannot send on non-open socket')
        }
    
        this._socket.send(binary, {
            binary: true,
        });
    }
    
    /**
    * Adds a message handler, these will be called in reverse order when
    * messages are recieved
    * @param handler The handler to be called
    * @returns The number of handler after the push
    */
    pushMessageHandler(handler: TestMessageHandler): number {
        return this._messageHandlers.push(handler);
    }
    
    /**
    * Closes the server
    */
    exit() {
        this.server.close((err) => {
            if (typeof err != 'undefined') {
                throw err;
            }
            
            // console.debug('SERVER: Shutting down');
        })
    }
}

describe('GatewaySession', () => {
    describe('connecting', () => {
        // TODO: Use some of the logic here:
        // https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
        // to create a test server that I can use
        
        it('should connect successfully', async () => {
            var server = new TestServer();
            var gs = new GatewaySession(server.address);
            
            await gs.ready
            
            assert.strictEqual(gs.state(), WS.OPEN);
            
            gs.close();
            server.exit();
        })
        
        it('should be able to send requests', async () => {
            var server = new TestServer();
            var gs = new GatewaySession(server.address);
            
            await gs.ready
            
            server.pushMessageHandler((msg) => {
                assert.strictEqual(msg.getRequest()?.getQuery(), "Dylan")
                gs.close();
                server.exit();
            })
            
            gs.sendRequest(data.gatewayRequest.itemRequest);
        })
    })
    
    describe('Processing inbound messages', async () => {

        var server = new TestServer();
        var gs = new GatewaySession(server.address);
        
        await gs.ready
        
        after(() => {
            gs.close();
            server.exit();
        })

        describe('Error', () => {
            it('should call the callback', (done) => {
                var response = Util.newGatewayResponse("some error")

                // Register the callbacks
                gs.on(GatewaySession.ErrorEvent, (error) => {
                    assert.strictEqual(error, "some error")
                    done();
                })

                server.send(response);
            })
        })
        describe('NewItem', () => {
            it('should call the callback', (done) => {
                var response = Util.newGatewayResponse(data.itemData.dylan)

                // Register the callbacks
                gs.on(GatewaySession.NewItemEvent, (item) => {
                    assert.strictEqual(item.getType(), data.item.dylan.getType())
                    done();
                })

                server.send(response);
            })
        })
        describe('NewEdge', () => {
            it('should call the callback', (done) => {
                var response = Util.newGatewayResponse(data.edgeData.basic)

                // Register the callbacks
                gs.on(GatewaySession.NewEdgeEvent, (edge) => {
                    assert.deepEqual(edge.getFrom(), data.edge.basic.getFrom());
                    assert.deepEqual(edge.getTo(), data.edge.basic.getTo());
                    done();
                })

                server.send(response);
            })
        })
        describe('NewItemRequestError', () => {
            it('should call the callback', (done) => {
                var response = Util.newGatewayResponse(data.errorData.NOCONTEXT)

                // Register the callbacks
                gs.on(GatewaySession.NewItemRequestErrorEvent, (error) => {
                    assert.strictEqual(error.getContext(), data.error.NOCONTEXT.getContext());
                    assert.strictEqual(error.getErrortype(), data.error.NOCONTEXT.getErrortype());
                    done();
                })

                server.send(response);
            })
        })
        describe('Status', () => {
            it('should call the callback', (done) => {
                var response = Util.newGatewayResponse(data.gatewayStatusData.working)

                // Register the callbacks
                gs.on(GatewaySession.StatusEvent, (status) => {
                    assert.strictEqual(status.getPostprocessingcomplete(), data.gatewayStatus.working.getPostprocessingcomplete());
                    assert.deepEqual(status.getSummary()?.toObject(), data.gatewayStatus.working.getSummary()?.toObject());
                    gs.removeAllListeners(GatewaySession.StatusEvent);
                    done();
                })

                server.send(response);
            })
            
            it('should update the status', (done) => {
                var working = Util.newGatewayResponse(data.gatewayStatusData.working)
                var doneResponse = Util.newGatewayResponse(data.gatewayStatusData.done)

                // Register the callbacks
                gs.on(GatewaySession.StatusEvent, () => {
                    assert.strictEqual(gs.status?.postprocessingcomplete, data.gatewayStatus.working.getPostprocessingcomplete());
                    assert.deepEqual(gs.status?.summary, data.gatewayStatus.working.getSummary()?.toObject());
                    gs.removeAllListeners(GatewaySession.StatusEvent);

                    // Add the second test
                    gs.on(GatewaySession.StatusEvent, () => {
                        assert.strictEqual(gs.status?.postprocessingcomplete, data.gatewayStatus.done.getPostprocessingcomplete());
                        assert.deepEqual(gs.status?.summary, data.gatewayStatus.done.getSummary()?.toObject());
                        gs.removeAllListeners(GatewaySession.StatusEvent);
                        done();
                    })

                    server.send(doneResponse);
                })

                server.send(working);
            })
        })
    })   
})
