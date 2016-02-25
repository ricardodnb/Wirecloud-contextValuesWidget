/*  This Widget uses gauge.js to show dials, credits to: http://bernii.github.io/gauge.js/
    Gathers the data from the Widget API of Wirecloud and shows it in dials, and text.
*/

//Hardcoded dial options, the same for every dial
var opts = {
    lines: 12, // The number of lines to draw
    angle: 0, // The length of each line
    lineWidth: 0.44, // The line thickness
    pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#555' // Fill color
    },
    limitMax: 'false', // If true, the pointer will not go past the end of the gauge
    colorStart: '#1f92d1', // Colors
    colorStop: '#1f92d1', // just experiment with them
    strokeColor: '#E0E0E0', // to see which ones work best for you
    generateGradient: true
};

//DUMMY DATAAAAAAAAAAAAAAAAAAAAAAAA TO TEST OUTSIDE OF WIRECLOUD, NGSI Source sends this type of data to Widget API input
var data = [{
        "id": "EA #002",
        "type": "Home",
        "signals": [{
            "value": "918.6",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2221",
            "magnitude": "Volume"
        }, {
            "value": "624.741",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2222",
            "magnitude": "Active Energy"
        }]
    },
    {
        "id": "EA #017",
        "type": "Home",
        "signals": [{
            "value": "2.547",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2374",
            "magnitude": "Active Energy"
        }]
    }, {
        "id": "EA #019",
        "type": "Home",
        "signals": [{
            "value": "2.504",
            "type": "number",
            "modDate": "2016-02-10T10:46:00.000Z",
            "signalId": "2394",
            "magnitude": "Active Energy"
        }, {
            "value": "26.363",
            "type": "number",
            "modDate": "2016-02-10T10:46:00.000Z",
            "signalId": "2395",
            "magnitude": "Volume"
        }]
    }, {
        "id": "EA #005",
        "type": "Home",
        "signals": [{
            "value": "1551",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2188",
            "magnitude": "Volume"
        }, {
            "value": "718.098",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2189",
            "magnitude": "Active Energy"
        }]
    }, {
        "id": "EA #003",
        "type": "Home",
        "signals": [{
            "value": "1059.1",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2231",
            "magnitude": "Volume"
        }, {
            "value": "211.54",
            "type": "number",
            "modDate": "2016-02-10T10:45:00.000Z",
            "signalId": "2232",
            "magnitude": "Active Energy"
        }]
    }];


//For development purpouses
for (var i = 0; i < data.length; i++) {
    renderDials(data[i]);
    renderTextInfo(data[i]);
}

/*
var energyValue = 0;

var energyDial = document.getElementById('energyDial'); // your canvas element
var energyGauge = new Gauge(energyDial).setOptions(opts); // create sexy gauge!
energyGauge.maxValue = 5000; // set max gauge value
energyGauge.animationSpeed = 32; // set animation speed (32 is default value)
energyGauge.setTextField(document.getElementById("energy-textfield"));
energyGauge.set(energyValue); // set actual value*/


//Register callback for use with a NGSI Browser, Wirecloud Widget API
MashupPlatform.wiring.registerCallback("textinput", function (data) {
    var json = JSON.parse(data);
    renderDials(json);
    renderTextInfo(json);
});

function renderDials(json) {
    try {
        var homeId = json.id;

        var nSignals = json.signals.length;

        if (document.getElementById(homeId) !== null) {
            $('#' + homeId).empty();
            var homeDiv = $('#' + homeId);
        } else {
            var homeDiv = $('<div id="' + homeId + 'd" class="homeSquare col-md-12"></div>');
        }

        var header = $("<h3></h3>").append("Home: " + homeId);
        homeDiv.append(header);

        for (var i = 0; i < nSignals; i++) {

            var magnitude = json.signals[i].magnitude;
            var value = json.signals[i].value;
            var dialDiv = $('<div class="dialDiv col-xs-6"></div>');
            var canvas = document.createElement("canvas");
            var textField = document.createElement("div");

            if (magnitude == "Volume") {
                var unit = document.createTextNode("Signal: " + magnitude);
            } else {
                var unit = document.createTextNode("Signal: " + magnitude);
            }

            var gauge = new Gauge(canvas).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 20000; // set max gauge value
            gauge.animationSpeed = 32; // set animation speed (32 is default value)
            gauge.setTextField(textField);
            gauge.set(parseFloat(value));
            dialDiv.append(canvas);
            dialDiv.append(textField);
            dialDiv.append(unit);
            homeDiv.append(dialDiv);

        }

        $('#default-info').empty();
        $('#dials').append(homeDiv);

    } catch (err) {
        $('#default-info').empty();
        var textInfo = $('<h4></h4>').append(err);
        $('#default-info').append(textInfo);
        console.log(err);
    }
}

function renderTextInfo(json) {
    try {
        var homeId = json.id;
        var nSignals = json.signals.length;

        if (document.getElementById(homeId) !== null) {
            $('#' + homeId).empty();
            var homeDiv = $('#' + homeId);
        } else {
            var homeDiv = $('<div id="' + homeId + 't" class="homeSquare col-md-12"></div>');
        }


        var header = $("<h3></h3>").append("Home: " + homeId);
        homeDiv.append(header);

        for (var i = 0; i < nSignals; i++) {
            var magnitude = json.signals[i].magnitude;
            var value = json.signals[i].value;
            var boldValue = $("<b></b>").append(value);
            var infoParagraph = $('<h4></h4>').append("Current reading: ");
            infoParagraph.append(boldValue);
            infoParagraph.append(" -- " + magnitude);

            homeDiv.append(infoParagraph);
        }

        $('#default-info').empty();
        $('#text').append(homeDiv);

    } catch (err) {
        $('#default-info').empty();
        var textInfo = $('<h4></h4>').append(err);
        $('#default-info').append(textInfo);
        console.log(err);
    }
}