data = [
{"id":"1", "word":"train", "translate":"pociąg","description":""}, 
{"id":"2", "word":"cable railway", "translate":"kolej linowa", "description":"" }, 
{"id":"3", "word":"car, carriage", "translate":"wagon", "description":""}, 
{"id":"4", "word":"cable railway", "translate":"kolej linowa", "description":""}, 
{"id":"5", "word":"compartment", "translate":"przedział", "description":""}, 
{"id":"6", "word":"departure", "translate":"odjazd", "description":""}, 
{"id":"7", "word":"low voltage", "translate":"niskie napięcie","description":""},
{"id":"8", "word":"engine", "translate":"lokomotywa","description":""},
{"id":"9", "word":"engine driver", "translate":"maszynista","description":""},
{"id":"10", "word":"freight train", "translate":"pociąg towarowy","description":""},
{"id":"11", "word":"rail network", "translate":"sieć kolejowa","description":""},
{"id":"12", "word":"railway", "translate":"kolej","description":""},
{"id":"13", "word":"railway engine", "translate":"lokomotywa","description":""},
{"id":"14", "word":"railwayman", "translate":"kolejarz","description":""},
{"id":"15", "word":"return ticket", "translate":"bilet powrotny","description":""},
{"id":"16", "word":"rolling stock", "translate":"tabor","description":""},
{"id":"17", "word":"single ticket", "translate":"bilet w jedną stronę","description":""},
{"id":"18", "word":"slow train", "translate":"pociąg osobowy","description":""},
{"id":"19", "word":"ticket inspector", "translate":"konduktor","description":""},
{"id":"20", "word":"timetable", "translate":"rozkład jazdy","description":""},
{"id":"21", "word":"track", "translate":"tor","description":""},
{"id":"22", "word":"waiting-room", "translate":"poczekalnia","description":""}
];


var synth = window.speechSynthesis;

var muteBtn = document.querySelector('#mute');
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
var list = [];
var voice = {};


function load() {
	list = JSON.stringify(data);
    list = JSON.parse(list);
    printInfo("Wszystkich słówek: " + list.length + "<br>");
}
load();
populateVoiceList();


function populateVoiceList() {
    alert("TEst");

    if(voices.length > 1) {
        return;
    }
    voices = synth.getVoices();
    if(voices.length < 1) {
        printInfo("Błąd! Brak speakerów!<br>");
        return;
    }
    var selectedIndex = 0;
    var voiceDanielIndex = 0;
    for(i = 0; i < voices.length ; i++) {
        if(voices[i].name == 'Google UK English Male') {
            selectedIndex = i;
            break;
        } else if(voices[i].name == 'Daniel') {
        	voiceDanielIndex = i;	
        }
    }
    if(selectedIndex == 0) {
        selectedIndex = voiceDanielIndex;
    }
    printInfo("Będzie czytał: " + voices[selectedIndex].name) + " <br>";
    voice = voices[selectedIndex];

    for(i = 0; i < list.length ; i++) {
        buildRow(list[i], i);
    }
}

function buildRow(elem, i) {
    $('#table').append('<tr onclick=myFunction('+i+') id=addr'+(i)+'><th scope=row>' +(elem.word)+ '</th><td>'+(elem.translate)+'</td></th></tr>');
}

function myFunction(idx) {
    if(voices.length < 1) {
        populateVoiceList();
    }
	var word = list[idx].word;
    speakWord(word);
}

function printInfo(info) {
    $('#alert-info').append(info);
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speakWord(word) {
	if(!muteBtn.checked) {
    	return;
    }
	if (synth.speaking) {
    	synth.cancel()
        console.error('speechSynthesis.speaking');
    }
    var utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = voice;
	utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}






