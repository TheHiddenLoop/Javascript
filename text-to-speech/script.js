const voiceSelect=document.getElementById('voiceSelect');
const textInput=document.getElementById('text');



function loadVoices(){
const voices = responsiveVoice.getVoices();
console.log(voices);
    voiceSelect.innerHTML='';
    voices.forEach(voice=>{
        const option=document.createElement('option');
        option.value=voice.name;
        option.textContent=`${voice.name}`
        voiceSelect.appendChild(option);
    })
}

function speakText(){
    const text=textInput.value.trim();
    const selectedVoice=voiceSelect.value;
    if(text){
        responsiveVoice.speak(text, selectedVoice)
    }
}

window.onload=()=>{
    loadVoices();
};