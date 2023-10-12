import SockJS from 'sockjs-client';
import StompJs, { CompatClient, messageCallbackType } from '@stomp/stompjs';
import { useEffect, useRef, useState } from "react";

export interface offerType{
    type: string;
    sdp: string | undefined;
};

function useWebRTCHook () {

    const peerConnection = useRef<RTCPeerConnection>();
    const client = useRef<CompatClient>();
    const socket = useRef<SockJS>();
    
    useEffect(()=>{
        //config of SockJS and Stomp
        socket.current = new SockJS("ws://");
        client.current=StompJs.Stomp.over(socket);
        client.current.connectHeaders = {};
        client.current.brokerURL = "";
        client.current.debug = () =>{};
        client.current.reconnectDelay = 5000;
        client.current.heartbeat = {
            incoming: 1000,
            outgoing: 1000,
        };
        client.current.onConnect = () => {};
        client.current.onDisconnect = () =>{};
        client.current.onStompError = () =>{};
        client.current.onWebSocketError = () =>{};
        client.current.onWebSocketClose =()=>{};
        client.current.onreceive = (message) => {};

        //send form
        //client.send(
        //  destination: string, 
        //  headers:{[key:string]:any;},
        //  body:string,
        //)
        peerConnection.current = new RTCPeerConnection;
        
        return () =>{
            console.log("clean up the WebSocket");
            client.current?.disconnect();
            socket.current?.close();
        }
    }, []);
    //set media track
    const setTrack = (streams: MediaStream[]) =>{
        streams.forEach((stream)=>{
            stream
                .getTracks()
                .forEach((track)=> peerConnection.current?.addTrack(track,stream))
        })
    }
    //change local description(associated with the connection)
    //it include media format and connection
    const setLocalOffer = async () => {
        //make offer that my status description
        const offer = await peerConnection.current?.createOffer();
        //set my status according to offer
        peerConnection.current?.setLocalDescription(offer);
        //send offer
        client.current?.send('',{type:"OFFER"}, offer?.sdp);
    }
    //change remote description(asssociated with the connection)
    //it include media format and connection
    const setRemoteOffer = async (offer: RTCSessionDescriptionInit) => {
        //set remoteDescription for init candition 
        peerConnection.current?.setRemoteDescription(offer);
        //create answer for offer about remote peer
        const answer = await peerConnection.current?.createAnswer();

        peerConnection.current?.setLocalDescription(answer);

        client.current?.send('',{type:"ANSWER"},offer.sdp);
    };
    const setAnswer = async(answer: RTCSessionDescriptionInit) => {
        peerConnection.current?.setRemoteDescription(answer);
    }
    //Ice candidate를 등록
    const setIceCandidate = () => {
        const offer = peerConnection.current?.addEventListener("icecandidate", (data)=>{
            const candi ={
                candidate: data.candidate
            };
            socket.current?.send(JSON.stringify(candi));
        });
        client.current?.subscribe("",(response:any)=>{
            if(response.candidate){
                peerConnection.current?.addIceCandidate(response.candidate);
            }
        });
    };

    const setRemoteStream = (remoteAudio: HTMLAudioElement | null) => {
        peerConnection.current?.addEventListener('track', async(data)=>{
            if(data.track.kind === "audio") {
                if(!remoteAudio) return;
                remoteAudio.srcObject = data.streams[0];
            }
        })
    } 

    return{
        socket, 
        setTrack,
        setLocalOffer,
        setRemoteOffer,
        setAnswer,
        setIceCandidate,
        setRemoteStream,
    };
}

export default useWebRTCHook;