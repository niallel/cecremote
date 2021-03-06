const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 80;

const monitor = require('./cec-settings');
const tv = require('./tv');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('CEC Remote'));

app.get('/tv/on', async (req, res) => {
    console.log('Turning TV on');
    const result = await tv.powerOn();
    res.send('TV turned on');
});

app.get('/tv/off', (req, res) => {
    console.log('Turning TV off');
    const result = tv.powerOff();
    res.send('TV turned off');
});

app.get('/tv/hdmi/:number', async (req, res) => {
    console.log(`TV set source requested to HDMI${req.params.number}`);
    await tv.powerOn();
    console.log('TV Turned  On');
    const result = tv.changeHdmi(req.params.number);
    if(result) {
        console.log(`TV source set to HDMI${req.params.number}`);
        res.send(`TV source set to HDMI${req.params.number}`);
    } else {
	console.log(`TV source set to HDMI uses a number of 1-9, not ${req.params.number}`);
        res.send(`TV source set to HDMI uses a number of 1-9, not ${req.params.number}`);
    }
});

app.get('/tv/powerstatus', async (req, res) => {
    const result = await tv.getPowerStatus();
    res.send('TV power status is ' + result.data.str );
});

app.post('/rawcommand', async (req, res) => {
    monitor.WriteRawMessage(req.body.raw);
    res.send('Raw message sent');
});

app.listen(port, () => console.log(`cecremote listening on port ${port}!`))
