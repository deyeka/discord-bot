// BARIS PERTAMA: load .env
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// MASUKKAN ID ROLE ADMIN
const ADMIN_ROLE_IDS = [
    "1446852452212019283",
    "1460256240553689138"
];

// Saat bot siap
client.once('ready', () => {
    console.log(`Bot online sebagai ${client.user.tag}`);
});

// Event pesan masuk
client.on('messageCreate', async message => {
    if (message.author.bot) return; // abaikan bot lain

    // Reply ping
    if (message.content.toLowerCase() === 'ping') {
        message.reply('pong');
    }

    // Auto delete link
    const linkRegex = /(https?:\/\/[^\s]+)/gi;
    if (linkRegex.test(message.content)) {
        // Cek apakah user memiliki role admin
        const memberRoles = message.member.roles.cache.map(r => r.id);
        const isAdmin = memberRoles.some(r => ADMIN_ROLE_IDS.includes(r));

        if (!isAdmin) {
            try {
                await message.delete();
                // Opsional: kirim pesan peringatan
                message.channel.send(`${message.author}, link tidak diperbolehkan!`).then(msg => {
                    setTimeout(() => msg.delete(), 5000); // hapus pesan peringatan 5 detik
                });
            } catch (err) {
                console.log('Gagal hapus pesan:', err.message);
            }
        }
    }
});

// LOGIN BOT
client.login(process.env.TOKEN);