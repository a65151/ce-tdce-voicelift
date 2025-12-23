import xapi from 'xapi';

/*
November 2025
Finn Sandholm /TDCE
Voicelift fra Cisco Mic Pro til Shure MXN5-C
Shure er tilkoblet via AES67, NetGear AV switch. DHCP fra codec i 169
*/


let voicelift_gain = -15;

// listen for user widget inputs
xapi.Event.UserInterface.Extensions.Widget.Action.on(event => {
    if (event.WidgetId === 'voicelift_mode' && event.Type === 'changed') {
        switch (event.Value){
          case 'on':
            xapi.Config.Audio.Output.Ethernet[2].Mode.set('On'); 
            console.log('voicelift_mode:On');
            break;
          case 'off':
            xapi.Config.Audio.Output.Ethernet[2].Mode.set('Off'); 
            console.log('voicelift_mode:Off');
            break;
        }
      }
    else if (event.WidgetId === 'voicelift_increase' && event.Type === 'clicked' ) {  
      if (voicelift_gain < -10){
        voicelift_gain = (voicelift_gain + 1);
        xapi.Config.Audio.Output.Ethernet[2].Level.set(voicelift_gain); 
        console.log('voicelift_gain:',voicelift_gain);
        }
      }
    else if (event.WidgetId === 'voicelift_decrease' && event.Type === 'clicked' ) {  
      if (voicelift_gain > -20){
      voicelift_gain = (voicelift_gain - 1);
      xapi.Config.Audio.Output.Ethernet[2].Level.set(voicelift_gain); 
      console.log('voicelift_gain:',voicelift_gain);
      }
    }
});
