require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                            GatewayIntentBits.MessageContent,
                                    GatewayIntentBits.GuildMembers
                                        ]
                                        });

                                        client.once('ready', () => {
                                            console.log(`Bot online sebagai ${client.user.tag}`);
                                            });

                                            client.on('messageCreate', async (message) => {
                                                if (message.author.bot) return;
                                                    if (!message.guild) return;

                                                        // ==========================
                                                            // ✅ ROLE ID BOLEH KIRIM LINK
                                                                // ==========================
                                                                    const allowedRoleIds = [
                                                                            '1446852452212019283', // 🦊|Admin
                                                                                    '1460256240553689138'  // Bot Sup🤖
                                                                                        ];

                                                                                            const hasAllowedRole = message.member.roles.cache.some(role =>
                                                                                                    allowedRoleIds.includes(role.id)
                                                                                                        );

                                                                                                            if (hasAllowedRole) return;

                                                                                                                // ==========================
                                                                                                                    // ❌ AUTO DELETE LINK
                                                                                                                        // ==========================
                                                                                                                            const linkRegex = /(https?:\/\/|www\.)/i;

                                                                                                                                if (linkRegex.test(message.content)) {
                                                                                                                                        try {
                                                                                                                                                    await message.delete();

                                                                                                                                                                const warn = await message.channel.send(
                                                                                                                                                                                `${message.author}, link tidak diperbolehkan ❌`
                                                                                                                                                                                            );

                                                                                                                                                                                                        setTimeout(() => warn.delete().catch(() => {}), 5000);

                                                                                                                                                                                                                } catch (err) {
                                                                                                                                                                                                                            console.log('Gagal hapus pesan:', err.message);
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        client.login(process.env.TOKEN);