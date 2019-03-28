const express = require('express');
const app = express();
const port = 80;

const monitor = require('./cec-settings');
const tv = require('./tv');

app.get('/', (req, res) => res.send('CEC Remote'));

app.get('/on', async (req, res) => {
    const result = await tv.powerOn();
    res.send('TV turned on');
});

app.get('/off', (req, res) => {
    const result = tv.powerOff();
    res.send('TV turned off');
});

app.get('/hdmi1', async (req, res) => {
    const result = await tv.powerOn();
    monitor.WriteRawMessage('tx 4F:82:10:00');
    res.send('TV source set to HDMI1');
});

app.get('/hdmi2', async (req, res) => {
    const result = await tv.powerOn();
    monitor.WriteRawMessage('tx 4F:82:20:00');
    res.send('TV source set to HDMI2');
});

app.get('/hdmi3', async (req, res) => {
    const result = await tv.powerOn();
    monitor.WriteRawMessage('tx 4F:82:30:00');
    res.send('TV source set to HDMI3');
});

app.get('/hdmi4', async (req, res) => {
    const result = await tv.powerOn();
    monitor.WriteRawMessage('tx 4F:82:40:00');
    res.send('TV source set to HDMI4');
});

app.get('/tvpowerstatus', async (req, res) => {
    const result = await tv.getPowerStatus();
    res.send('TV power status is ' + result.data.str );
});

app.listen(port, () => console.log(`cecremote listening on port ${port}!`))