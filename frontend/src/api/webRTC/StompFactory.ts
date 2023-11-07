import { Client, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
/**
 * 
 * @param socketURI socket URI
 * @param brokerURI broker URI
 * @returns initalized stomp client(detail settings in stompConfig.ts)
 */
async function stompFactory(
    socketURI: string | undefined,
    brokerURI: string | undefined,
 ): Promise<Client | null> {

    let client: Client | null = null;
    //check if socketURI or brokerURI is undefined
    if (!socketURI || !brokerURI) {
        console.error('socketURI or brokerURI is undefined');
        return client;
    }
    //set up WebSocket and Stomp client
    client = new Client({
        webSocketFactory: () => new WebSocket(socketURI),
        brokerURL: brokerURI,
    });
    return client;
};
export default stompFactory;