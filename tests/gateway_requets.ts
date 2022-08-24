import { Util } from '..';

export const basicRequest = Util.newGatewayRequest({
    context: 'test',
    linkDepth: 10,
    method: 'GET',
    query: 'Dylan',
    itemSubject: 'return.item.foo',
    responseSubject: 'return.response.foo',
    errorSubject: 'return error.foo',
    type: 'person',
    UUID: 'a520d67f-0b2a-4852-87d2-d02bbc74ad89',
}, 100);