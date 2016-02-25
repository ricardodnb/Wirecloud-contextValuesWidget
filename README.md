# Wirecloud Current Context Values Widget
This is just a simple widget that i developed to show current context values in a form of dials that can be replaced or in a form of text.  
This widget uses the Widget API from wirecloud, and in order for this API to work you need to connect this widget to NGSI Source using the Wirecloud wiring.  

Installation steps:  
1. Upload downloaded .zip to wirecloud in your resources section.\n
2. Add the widget to your workspace.\n
3. Add and configure NGSI Source operator to your wiring, in the Wiring section.\n
4. Also in the wiring section connect NGSI output to the Widget input.\n
5. If everything goes correctly NGSI Source Proxy should create a subscription with Orion Context Broker and your widget starts getting input everytime the values are updated.\n  

Contacts: ricardogomesdnb@gmail.com / rjpgr@isep.ipp.pt  
Developed for: Cister EnerGAware project.  
http://www.cister.isep.ipp.pt/
