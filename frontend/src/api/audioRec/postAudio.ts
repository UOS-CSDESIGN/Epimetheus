import { GetData } from "../GetData";

export default async function postAudio(audioFile: Blob): Promise<any> {

  let formData = new FormData();
  const audio = new File([audioFile], 'audio.wav', { type:"audio/wav"});
  formData.append('audio', audio);

  const response = await fetch(`${process.env.REACT_APP_audio_url}/audio`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  return data;
}