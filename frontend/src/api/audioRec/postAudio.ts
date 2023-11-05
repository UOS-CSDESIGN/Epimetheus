
export default async function postAudio(audioFile: File): Promise<Response> {
  const formData = new FormData();
  formData.append('audio', audioFile);
  
  return fetch(`${process.env.REACT_APP_audio_url}/audio`, {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
}