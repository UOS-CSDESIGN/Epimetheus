import { Client } from "@stomp/stompjs"
/**
 * 
 * @param client initialized stomp client
 */
function stompConfig(client: Client): void {
    //check if client is null
    if (client === (null || undefined)) {
        console.log('client is null');
    }
    //stomp initialization
    else {
        console.log('clienet is not null');
        console.log('client', client);
        //set heartbeat and reconnect delay
        client.reconnectDelay = 5000;
        client.heartbeatIncoming = 1000;
        client.heartbeatOutgoing = 1000;
        //not subscribed
        client.onUnhandledMessage = message => {
            console.log('Unhandled message', message);
        };

        client.connectHeaders = {};
        client.debug = () => {};
        client.onConnect = res => {
            console.log('Connected to the broker', res);
        };
        client.onDisconnect = res => {
            console.log('Disconnected from the broker', res);
        };
        client.onStompError = err => {
            console.error('Stomp error', err);
        };
        client.onWebSocketError = err => {
            console.error('WebSocket error', err);
        };
        client.onWebSocketClose = () => {
            console.log('WebSocket closed');
        };
        if(client.connected === false){
            client.activate();
        } else {
            console.log('client is already connected');
        }
    } 
}
export default stompConfig;