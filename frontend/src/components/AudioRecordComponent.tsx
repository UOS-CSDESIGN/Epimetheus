import { HiMicrophone } from "react-icons/hi";
import { ActionButtons } from "../styles/TaskInputComponent.styles"
import { useState } from  'react';

export default function AudioRecordComponent() {

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [media, setMedia] = useState<MediaRecorder | null>(null);
    const [onRec, setOnRec]  = useState<boolean>(true);
    const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
    const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null);
    const [audioUrl, setAudioUrl] = useState<any>(null);

    const onRecord = () => {
        console.log('onRecord');
        //audio decoding
        const audioCtx: AudioContext = new AudioContext();
        //js가 audio를 다루는 객체
        const analyser: ScriptProcessorNode = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);
        
        function makeSound(stream: MediaStream) {
            //audio source node 생성
            const source: MediaStreamAudioSourceNode = audioCtx.createMediaStreamSource(stream);
            setSource(source);
            //js, decoding을 위한 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
        //권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({audio: true})
            .then((stream: MediaStream) => {
                const mediaRecorder:MediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                setMedia(mediaRecorder);
                makeSound(stream);
                setStream(stream);
                analyser.onaudioprocess = (e: any) => {
                    
                    if(e.playbackTime === 10) {
                        stream.getAudioTracks().forEach(track => track.stop());
                        mediaRecorder.stop();

                        analyser?.disconnect();
                        audioCtx.createMediaStreamSource(stream).disconnect();

                        mediaRecorder.ondataavailable = (e: BlobEvent) => {
                            setAudioUrl(e.data);
                            setOnRec(true);
                        };
                    } else {
                        setOnRec(false);
                    }
                }
            });
    }
    const offRecAudio = () => {
        console.log('offRecAudio');
        if(media === null) return;
        //dataavailable 이벤트, Blob 형태로 녹음 데이터를 저장
        media.ondataavailable = (e: BlobEvent) => {
            setAudioUrl(e.data);
            setOnRec(true);
        }
        stream?.getAudioTracks().forEach(track => track.stop());
        //
        media.stop();
        //연결 해제
        analyser?.disconnect();
        source?.disconnect();
        if(audioUrl){
            console.log(URL.createObjectURL(audioUrl));
        }
        const sound = new File([audioUrl], 'sound.wav', {lastModified: new Date().getTime(), type: 'audio/wav'});
        console.log(sound);
    }

    return (
        <>
            <ActionButtons onClick={onRec ? onRecord : offRecAudio}>
                <HiMicrophone />
            </ActionButtons>
        </>
    );
}
