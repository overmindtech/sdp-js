import { assert, expect } from 'chai';
import * as WS from 'ws';
import { GatewaySession } from '../gateway'
import { GatewayRequest, GatewayResponse } from '../gateway_pb';
import * as requests from './gateway_requets';

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
            throw 'No socket defined. Please connect before using #send()'
        }

        var binary = msg.serializeBinary();
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
        
            gs.sendRequest(requests.basicRequest);
        })
    })
})