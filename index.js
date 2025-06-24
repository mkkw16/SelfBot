require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const http = require('http');

const client = new Client({
    checkUpdate: false
});

const CHANNEL_ID = '1370497316414427146'; // Replace with your channel ID
const commands = ["$wa", "$ma", "$ha", "$w", "$m", "$h", "$wg", "$mg", "$hg"];

// Get a random delay between 0 and 60 minutes
function getRandomDelayInHour() {
    const min = 0;                // 0 minutes
    const max = 60 * 60 * 1000;   // 60 minutes
    return Math.floor(Math.random() * max);
}

// Send a batch of 10 random commands
async function sendRandomCommandBatch() {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (channel) {
        for (let i = 0; i < 10; i++) {
            const randomCommand = commands[Math.floor(Math.random() * commands.length)];
            await channel.send(randomCommand);
            console.log(`Sent: ${randomCommand}`);
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay between messages
        }
        console.log(`Batch sent at ${new Date().toLocaleTimeString()}`);
    }
}

// Schedule the hourly batch with a random offset
function scheduleHourlyRandomBatch() {
    setInterval(async () => {
        const delay = getRandomDelayInHour();
        console.log(`Next batch will start in ${Math.floor(delay / 60000)} minutes`);

        setTimeout(() => {
            sendRandomCommandBatch();
        }, delay);
    }, 60 * 60 * 1000); // Every hour
}

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.username}`);
    scheduleHourlyRandomBatch(); // Start the hourly random scheduler
});

// Simple HTTP server to keep Render happy
<<<<<<< HEAD
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  // Jouw normale routes
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', err => console.error('Server Error:', err));

=======
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot is running!');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

>>>>>>> 456ccf59aae7154a48cdaf68f6efae2fe2a18f4e
client.login(process.env.TOKEN);
