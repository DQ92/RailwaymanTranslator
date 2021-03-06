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

  // Function to 'load JSON' data
function load() {
	list = JSON.stringify(data);
    list = JSON.parse(list);
}


function populateVoiceList() {
	
	$.getJSON("dict.json", function(json) {
    	 list = json;
    	 // console.log(json); // Logs your array
	});

	load()

  voices = synth.getVoices();
  var selectedIndex = 0;
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name == 'Google UK English Female')
    {
    
    }
    else if(voices[i].name == 'Google UK English Male')
    {
    	// selectedIndex = i;
    }
	else if(voices[i].name == 'Daniel')
    {
    	selectedIndex = i;	
    }
  }
  voice = voices[selectedIndex];


	for(i = 0; i < list.length ; i++) {
		buildRow(list[i], i)
	}
// });
}

function buildRow(elem, i) {
	var table = document.getElementById("table");
	var row = table.insertRow(i);
    $('#addr'+i).html("<th scope='row'>"+(elem.word)+"</th><td>"+(elem.translate)+"</td></td></th>");
	$('#table').append('<tr onclick="myFunction('+i+')" id="addr'+(i)+'"></tr>'); 
}

function myFunction(idx) {
	var word = list[idx].word;
    speakWord(word);
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
    	synth.cancel()
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    
    utterThis.voice = voice;
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
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






