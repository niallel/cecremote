// Import Constants
const CEC = require('@senzil/cec-monitor').CEC;
const CECMonitor = require('@senzil/cec-monitor').CECMonitor;

// Get the monitor object
const monitor = require('./cec-settings');

// Utility functions
const pause = require('promise-pause-timeout');

module.exports = {
    powerOn,
    powerOff,
    getPowerStatus
}

function powerOn() {
    return (new Promise(async function(resolve, reject) {
        let status;
        do {
            status = await getPowerStatus();
            if(status.data.str !== "ON") {
                // console.log('turning on');
                monitor.WriteRawMessage('tx 10:04');
                await pause(2000);
            }
        } while(status && status.data.str !== "ON");
        resolve(status && status.data.str === "ON");
    }));
}

function powerOff() {
    monitor.WriteRawMessage('tx 10:36');
}
    
function getPowerStatus() {
    return (new Promise(function(resolve, reject) {

        monitor.SendCommand(CEC.LogicalAddress.RECORDINGDEVICE1, CEC.LogicalAddress.TV, CEC.Opcode.GIVE_DEVICE_POWER_STATUS, CECMonitor.EVENTS.REPORT_POWER_STATUS)
        .then(packet => {
            // console.log(packet)
            resolve(packet);
            //{
            //  "type": "TRAFFIC", "number": "82784", "flow": "IN", 
            //  "source": 1, "target": 4, "opcode": 144, "args": [0],
            //  "event": "REPORT_POWER_STATUS", 
            //  "data": {"val": 0, "str": "ON"}
            //}
        })
        .catch(e => {
            console.error(e);
            resolve(false);
            //Error: CEC monitor hasn't gotten response in some time (3000 ms) from 0
        });
    }));
}