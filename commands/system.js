const os = require('os');
const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime,formatp, prefix, Config,  } = require('../lib')

    //---------------------------------------------------------------------------

cmd({

            pattern: "save",

            category: "owner",

            desc: "Adds a note on db.",

            filename: __filename

        },

        async(Void, citel, text,{ isCreator }) => {

            if (!isCreator) return citel.reply(tlang().owner)

            if (!text) return citel.reply("*Please give me the word to save* ❗")

            await addnote(text)

            return citel.reply(`*Successfully saved to notepad* ✅`)

        }

    )



    //---------------------------------------------------------------------------

cmd({

            pattern: "qr",

            category: "owner",

            filename: __filename,

            desc: "Sends CitelsVoid Qr code to scan and get your session id."

        },

        async(Void, citel, text) => {

            if (text) {

                let h = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`)

                await Void.sendMessage(citel.chat, { image: h })

                return

            }


            let buttonMessaged = {

                image: { url: 'https://replit.com/@pasindusehan2/PasinduLk-Md?v=1/' },

                caption: `*Scan Qr within 15 seconds*\n\n*Dark-Zizuko QR CODE* 👤\n\n\n*MADE BY ZIZUKO* ✅`,

                footer: ` Dark-Zizuko SESSION-ID`,

                headerType: 4,


            }

            await Void.sendMessage(citel.chat, buttonMessaged, {

                quoted: citel,

            });

            await sleep(20 * 1000)

            return citel.reply('Your session is over now.')

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "unban",

            alias: ["unban"],

            category: "misc",

            react: "🙂",

            filename: __filename,

            desc: "Unbans banned user (from using bot)."

        },

        async(Void, citel, text,{ isCreator }) => {

            if (!isCreator) return citel.reply("This command is onlt for my Owner")

            try {

                let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;

                if (!users) return citel.reply("Please mention any user.❌")

                let pushnamer = Void.getName(users);

                sck1.findOne({ id: users }).then(async(usr) => {

                    if (!usr) {

                        console.log(usr.ban)

                        return citel.reply(`${pushnamer} is unbanned.`)

                    } else {

                        console.log(usr.ban)

                        if (usr.ban !== "true") return citel.reply(`${usr.name} is already unbanned.`)

                        await sck1.updateOne({ id: users }, { ban: "false" })

                        return citel.reply(`${usr.name} Successful Unbanned ✅`)

                    }

                })

            } catch {

                return citel.reply("Please mention any user.❌")

            }

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "url",

            alias: ["link"],

            category: "misc",

            react: "🙋‍♂️",

            filename: __filename,

            desc: "image to url."

        },

        async(Void, citel, text) => {

            if (!citel.quoted) return citel.reply(`Pls mention me any image/video and type ${prefix + command} to upload my ${tlang().greet}`);

            let mime = citel.quoted.mtype

            let media = await Void.downloadAndSaveMediaMessage(citel.quoted);

            if (/image/.test(mime)) {

                let anu = await TelegraPh(media);

                return citel.reply(`Here is url of your uploaded Media on Telegraph.\n\n` + util.format(anu));

            } else if (!/image/.test(mime)) {

                let anu = await TelegraPh(media);

                await fs.unlinkSync(media);

                return citel.reply(`Here is url of your uploaded Media on Telegraph.\n\n` + util.format(anu));

            }

            await fs.unlinkSync(media);

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "trt",

            category: "misc",

            filename: __filename,

            desc: "Translate\'s given text in desird language."

        },

        async(Void, citel, text) => {

            const translatte = require("translatte");

            if (!citel.quoted) return citel.reply("*Please reply to any message.*");

            if (!citel.quoted) return citel.reply(`Please mention or give tex.`);

            let textt = citel.quoted.text;

            whole = await translatte(textt, {

                from: text[1] || "auto",

                to: text.split(" ")[0] || "si",

            });

            if ("text" in whole) {

                return await citel.reply("*Translated In to 📑:* " + " ```" + (text.split(" ")[0] || "Auto To Sinhala") + "```\n" + " *From Language 🔎:* " + " ```" + (text[1] || "Auto Detect") + "```\n" + "*Result:* " + " ```" + whole.text + "```");

            }

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "shell",

            category: "owner",

            filename: __filename,

            desc: "Runs command in Heroku(server) shell."

        },

        async(Void, citel, text,{ isCreator }) => {

            if (!isCreator) return citel.reply(tlang().owner)

            const { exec } = require("child_process")

            exec(text, (err, stdout) => {

                if (err) return citel.reply(`----${tlang().title}----\n\n` + err)

                if (stdout) {

                    return citel.reply(`----${tlang().title}----\n\n` + stdout)

                }

            })

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "eval",

            category: "owner",

            filename: __filename,

            desc: "Runs js code on node server."

        },

        async(Void, citel, text,{ isCreator }) => {

            if (!isCreator) return

            try {

                let resultTest = eval('const a = async()=>{\n' + text + '\n}\na()');

                if (typeof resultTest === "object")

                    citel.reply(JSON.stringify(resultTest));

                else citel.reply(resultTest.toString());

            } catch (err) {

                return  citel.reply(err.toString());

            }

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "dnote",

            category: "owner",

            filename: __filename,

            desc: "Deletes note from db."

        },

        async(Void, citel, text,{ isCreator }) => {

            const { tlang } = require('../lib/scraper')

            if (!isCreator) return citel.reply(tlang().owner)

            await delnote(text.split(" ")[0])

             return citel.reply(`*Id: ${text.split(" ")[0]}\'s note has been deleted* ✅.`)

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "dallnote",

            category: "owner",

            filename: __filename,

            desc: "Deletes all notes from db."

        },

        async(Void, citel, text, isCreator) => {

            const { tlang } = require('../lib/scraper')

            if (!isCreator) return citel.reply(tlang().owner)

            await delallnote()

             return citel.reply(`*All notes deleted* ✅`)

        }

    )

    //---------------------------------------------------------------------------

cmd({

            pattern: "ban",

            alias: ["ban"],

            category: "owner",

            react: "🚫",

            filename: __filename,

            desc: "Bans user from using bot."

        },

        async(Void, citel, text,{ isCreator}) => {

            if (!isCreator) return citel.reply(tlang().owner)

            try {

                let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;

                if (!users) return citel.reply(`❌ Please mention any user ${tlang().greet}.`)

                let pushnamer = Void.getName(users);

                sck1.findOne({ id: users }).then(async(usr) => {

                    if (!usr) {

                        await new sck1({ id: users, ban: "true" }).save()

                        return citel.reply(`_Banned ${usr.name} from Using Commands._`)

                    } else {

                        if (usr.ban == "true") return citel.reply(`${pushnamer} is already Banned from Using Commands`)

                        await sck1.updateOne({ id: users }, { ban: "true" })

                        return citel.reply(`_Successfully Banned ${usr.name} from Using Commands._`)

                    }

                })

            } catch (e) {

                console.log(e)

                return citel.reply("Please mention any user.❌ ")

            }

        }

    )

    //---------------------------------------------------------------------------

cmd({
            pattern: "alive",
            category: "general",
            filename: __filename,
            desc: "is bot alive??"
        },
        async(Void, citel, text, isAdmins) => {
            let alivemessage = Config.ALIVE_MESSAGE || `*A bot developed by Pasindu Sehan*`
            const alivtxt = `
*Hello, ${citel.pushName},*
_This is  ${tlang().title}._
${alivemessage}

*Version:-* _0.0.6_
*Uptime:-* _${runtime(process.uptime())}_
*Owner:-* _${Config.ownername}_
*Branch:-* _${Config.BRANCH}_

_Type ${prefix}menu for my command list._

_Powered by Pasindu Sehan_
`;
            let aliveMessage = {
                image: {
                    url: await botpic(),
                },
                caption: alivtxt,
                footer: tlang().footer,
                headerType: 4,
            };
             return Void.sendMessage(citel.chat, aliveMessage, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------

cmd({

        pattern: "get",

        category: "owner",

        filename: __filename,

        desc: "Shows list of all notes."

    },

    async(Void, citel, text,{ isCreator }) => {

        const { tlang } = require('../lib')

        if (!isCreator) return citel.reply(tlang().owner)

        const note_store = new Array()

        let leadtext = `🗒️ׄ 𝗦𝗔𝗩𝗘𝗗 𝗡𝗢𝗧𝗘𝗦:-\n\n`

        leadtext += await allnotes()

        return citel.reply(leadtext)

    }

)

   //---------------------------------------------------------------------------


cmd({

            pattern: "system",

            alias: ["SYSTEM"],

            category: "general",

            react: "🦾",

            filename: __filename,

            desc: "system status??"

        },

        async(Void, citel, text, isAdmins) => {

        if(os.hostname().length == 12 ) hostname = 'replit'

else if(os.hostname().length == 36) hostname = 'heroku'

else hostname = os.hostname()

            const alivtxt = `
            
 *⏰RunTime:-* ${runtime(process.uptime())}

 *🙋‍♂️Usage:-* ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}

 *👤Deploy:-* ${hostname}

 *👼Owner:-* BLACK_SYBER-ZIZUKO

 *🤔Version:-* 3${prefix}0${prefix}0

★彡[𝚉𝙸𝚉𝚄𝙺𝙾-𝙼𝙳 ,2023°°°彡★
`;
            let thumbimage = Config.THUMB_IMAGE || `https://telegra.ph/file/55f1d0b60d084bd0729fb.jpg`

            let aliveMessage = {

                image: {

                    url: `${thumbimage}`,

                },

                caption: alivtxt,

                footer: tlang().footer,

                headerType: 4,

            };

             return Void.sendMessage(citel.chat, aliveMessage, {

                quoted: citel,

            });

        }

    )
