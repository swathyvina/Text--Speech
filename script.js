
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const voiceSelect = document.getElementById('voiceSelect');
    const speakButton = document.getElementById('speakButton');
    const textarea = document.querySelector('textarea');
    let voices = [];

    // Function to populate the voice options in the select dropdown
    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';

        voices.forEach((voice, i) => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    // Trigger populateVoiceList function when the voices are loaded or changed
    populateVoiceList();
    window.speechSynthesis.onvoiceschanged = populateVoiceList;

    // Function to speak the text
    function speak() {
        if (textarea.value.trim() !== '') {
            const utterance = new SpeechSynthesisUtterance(textarea.value);
            const selectedVoice = voices[voiceSelect.value];
            utterance.voice = selectedVoice;

            window.speechSynthesis.speak(utterance);
        }
    }

    // Event listener for the speak button
    speakButton.addEventListener('click', speak);
});
