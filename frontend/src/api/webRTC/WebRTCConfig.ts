import { Client } from "@stomp/stompjs";

async function webRTCConfig(client: Client): Promise<RTCPeerConnection | null>{
    //check if client is null
    if (client === (null || undefined)) {
        console.log('client is null');
        return null;
    }
    let peerConnection: RTCPeerConnection | null = new RTCPeerConnection();

    //subscribe to signaling channel
    client.subscribe('/signaling', async message => {
        const data = JSON.parse(message.body);
        if (data.type === 'offer') {
            //handle incoming offer
            const offer = new RTCSessionDescription(data);
            peerConnection?.setRemoteDescription(offer);
            const answer = await peerConnection?.createAnswer();
            peerConnection?.setLocalDescription(answer);
            client?.publish({
                destination: '/signaling',
                body: JSON.stringify(answer),
            });
        } else if (data.type === 'answer') {
            //handle incoming answer
            const answer = new RTCSessionDescription(data);
            peerConnection?.setRemoteDescription(answer);
        } else if (data.type === 'icecandidate') {
            //handle incoming ICE candidate
            const candidate = new RTCIceCandidate(data.candidate);
            peerConnection?.addIceCandidate(candidate);
        }
    });
    ///set up ICE candidates
    peerConnection.addEventListener('icecandidate', data => {
        if (data.candidate) {
            client?.publish({
                destination: '/signaling',
                body: JSON.stringify({
                    type: 'candidate',
                    candidate: data.candidate,
                }),
            });
        }
    });

    //set up signaling handlers
    peerConnection.addEventListener('negotiationneeded', async () => {
        const offer = await peerConnection?.createOffer();
        peerConnection?.setLocalDescription(offer);
        client?.publish({
            destination: '/signaling',
            body: JSON.stringify(offer),
        });
    });

    return peerConnection;
}
export default webRTCConfig;