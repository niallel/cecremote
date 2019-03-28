const express = require('express');
const app = express();
const port = 80;

const monitor = require('./cec-settings');
const tv = require('./tv');

app.get('/', (req, res) => res.send('CEC Remote'));

app.get('/tv/on', async (req, res) => {
    const result = await tv.powerOn();
    res.send('TV turned on');
});

app.get('/tv/off', (req, res) => {
    const result = tv.powerOff();
    res.send('TV turned off');
});

app.get('/tv/hdmi/:number', async (req, res) => {
    await tv.powerOn();
    const result = tv.changeHdmi(req.params.number);
    if(result) {
        res.send(`TV source set to HDMI${req.params.number}`);
    } else {
        res.send(`TV source set to HDMI uses a number of 1-9`);
    }
});

app.get('/tv/powerstatus', async (req, res) => {
    const result = await tv.getPowerStatus();
    res.send('TV power status is ' + result.data.str );
});

app.listen(port, () => console.log(`cecremote listening on port ${port}!`))