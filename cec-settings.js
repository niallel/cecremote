const CEC = require('@senzil/cec-monitor').CEC;
const CECMonitor = require('@senzil/cec-monitor').CECMonitor;

//All config options are optionals
const monitor = new CECMonitor('Please wait...', {
  com_port: 'RPI',            //set com port to use (see cec-client -l)
  debug: false,           // enable/disabled debug events from cec-client
  hdmiport: 2,            // set inital hdmi port
  processManaged: false,  // set/unset handlers to avoid unclear process exit.
  recorder: true,         //enable cec-client as recorder device
  player: false,          //enable cec-client as player device
  tuner: false,           //enable cec-client as tuner device
  audio: false,           //enable cec-client as audio system device
  autorestart: true,      //enable autrestart cec-client to avoid some wierd conditions
  no_serial: {            //controls if the monitor restart cec-client when that stop after the usb was unplugged
    reconnect: true,       //enable reconnection attempts when usb is unplugged
    wait_time: 30,          //in seconds - time to do the attempt
    trigger_stop: false     //false to avoid trigger stop event
  },
  cache: {
    enable: false,  //treats the state like a cache, and enable _EXPIREDCACHE event.
    autorefresh: false, //enable the cache refresh (currently only power status), and enable _UPDATEDCACHE event.
    timeout: 30  //value greater than 0 (in seconds) enable cache invalidation timeout and request new values if autorefresh is enabled
  },         
  command_timeout: 3,       //An value greater than 0 (in secconds) meaning the timeout time for SendCommand function
  user_control_hold_interval: 1000 //An value greater than 0 (in miliseconds) meaning the interval for emit the special _USERCONTROLHOLD event
});

module.exports = monitor;