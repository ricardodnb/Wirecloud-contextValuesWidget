This is just a simple widget that i developed to show current context values in a form of dials (that can be easily replaced) or in a simple form of text, choosing it using tabs.
This widget uses the Widget API from wirecloud, and in order for this API to work you need to connect this widget to NGSI Source using the Wirecloud wiring.

Installation steps:
1. Upload downloaded .zip to wirecloud in your resources section.
2. Add the widget to your workspace.
3. Add and configure NGSI Source operator to your wiring, in the Wiring section.
4. Also in the wiring section connect NGSI output to the Widget input.
5. If everything goes correctly NGSI Source Proxy should create a subscription with Orion Context Broker and your widget starts getting input everytime the values are updated.

Contacts: ricardogomesdnb@gmail.com / rjpgr@isep.ipp.pt
Developed for: Cister EnerGAware project.
http://www.cister.isep.ipp.pt/

Used http://bernii.github.io/gauge.js/ code. All rights in this go the respective author.

Input example:
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
    }];