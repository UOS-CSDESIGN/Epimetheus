import { Client } from "@stomp/stompjs";

async function webRTCConfig(client: Client): Promise<RTCPeerConnection | null>{
    //check if client is null
    if (client === (null || undefined)) {
        console.log('client is null');
        return null;
    }
    let peerConnection: RTCPeerConnection | null = new RTCPeerConnection();

    //subscribe to signaling channel
    client.subscribe('/sub/offer', async message => {
        const data = JSON.parse(message.body);
        if (data.type === 'offer') {
            //handle incoming offer
            const offer = new RTCSessionDescription(data);
            peerConnection?.setRemoteDescription(offer);
            const answer = await peerConnection?.createAnswer();
            //setLocatDescription include ice gathering
            peerConnection?.setLocalDescription(answer);
            client?.publish({
                destination: '/pub/sdp/',
                body: JSON.stringify(answer),
            });
        }
        else{
            console.log('data.type is not offer');
        }
     }); 
     client.subscribe('/sub/answer', async message => {
        const data = JSON.parse(message.body);
        if(data.type==='answer'){
            const answer = new RTCSessionDescription(data);
            peerConnection?.setRemoteDescription(answer);
        } else{
            console.log('data.type is not answer');
        }
     });
     client.subscribe('/sub/candidate', async message => {
        const data = JSON.parse(message.body);
        if (data.type === 'icecandidate') {
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