const TelegramApi = require('node-telegram-bot-api')

// const token = PROCESS.env.botToken || ""
const token = "5190701014:AAERDdwygMCotCelfXERRppRd0GKEuLdHwg"

const bot = new TelegramApi(token, { polling: true })

let instructButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: "Утрений уход",
                    callback_data: "morning"
                },
                {
                    text: 'Вечерний уход',
                    callback_data: 'evening'
                }
            ]
        ]
    })
}

let buttonChangeUpdates = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Обновить',
                    callback_data: '1'
                },
                {
                    text: 'Не обновлять',
                    callback_data: '2'
                }
            ]
        ]
    })
}
bot.setMyCommands([
    {
        command: '/start',
        description: "Начальное приветсвие"
    },
    {
        command: '/info',
        description: 'Информация о пользователе'
    },
    {
        command: '/update',
        description: 'Состав персонального бота'
    },
    {
        command: '/instruction',
        description: 'Инструкция по использоваю'
    }
])

let update = false

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        if(text === '/start') {
            await bot.sendMessage(chatId, 'Добро пожаловать. Я ваш личный OhMy Ассистент. Я буду вам отправлять обноления вашего товара')
            await bot.sendMessage(chatId, 'Спасибо тебе, что выбираешь именно OhMy')
            return bot.sendMessage(chatId, `Ваш никнейм: ${msg.from.username}`)
        }
        if(text === "/info") {
           return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if(text === "/update") {
            if(update) {
                return bot.sendMessage(chatId, 'Ваш обновлённый состав бокса: Первое средство, Второе обновлённое средство', buttonChangeUpdates)
            } else {
                return bot.sendMessage(chatId, 'Ваш состав бокса: Первое средство, Второе средство, Третье средство', buttonChangeUpdates)
            }
        }
        if (text === "/instruction") {
            return bot.sendMessage(chatId, 'Выберите уход: ', instructButtons)
        }
        return bot.sendMessage(chatId, "Повторите ваш запрос или посмотрите на его правильность")
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === 'morning') {
            setTimeout(() => {
                bot.sendMessage(chatId,`
                **Первый этап -** просыпание и ****очищение кожи лица. Гель для умывания. \n
                Особенно важно зимой - завести супермягкое средство для умывания, чтобы оно не отмывало кожу до скрипа и не смывало жиров, которые нашей коже нужны. \n
                *Иногда, даже, если есть возможность, с утра дерматологи рекомендуют не умываться каким-то средством, потому что это сохранит полезные жиры, которые защищают кожу от зимних ветров и сухого воздуха в помещениях.* \n
                Для того чтобы этот барьер не нарушался во время остального процесса умывания - мы положили гель, который дополнительно увлажнит кожу. `)
            }, 1000)
            setTimeout(() => {
                bot.sendMessage(chatId, `
                Второй этап - подготовка кожи к нанесению крема [к увлажнению]. Используем тоник.  \n
                Для максимально эффективного увлажнения очень здорово работает наслаивание одних на другие.\n
                `)
            }, 1000)
            setTimeout(() => {
                bot.sendMessage(chatId, `
                Третий этап - увлажнение. Крем CeraVe.  \n
                Сверху на ещё слегка липкую (а она почти всегда будет слегка липкая) кожу нужно наносить крем. Крем мы выбрали CeraVe - он удобный по плотности для зимы ⇒ хорошо защищает и увлажняет кожу. \n
                Теперь можно использовать декоративную косметику💄\n
                И вперёд покорять сцену!
                `)
            }, 1000)
        } 
        if(data === 'evening') {
            setTimeout(() => {
                bot.sendMessage(chatId, `Первый этап - очищение кожи лица. Гель для умывания.
                В первую очередь смываем косметику и солцезащитный крем \n
                Базовый вариант очищения - один раз намылить поверхность лица и смыть всё прохладной водой. Пользоваться гелем для умывания можно и два раза подряд, если есть ощущение несвежести лица. Важный принцип зимой - умывание слегка прохладной водой
                `)
            }, 1000)
            setTimeout(() => {
                bot.sendMessage(chatId, `
                Второй этап - подготовка кожи к нанесению крема [к увлажнению]. Используем тоник. \n
                Для максимально эффективного увлажнения очень здорово работает наслаивание одних на другие. Работает это так: \n
                Сначала на влажную (это важно) кожу наносится сыворотка/лосьон/тонер/листовая маска/эссенция, которая главным образом состоит из водоудерживающих компонентов. Это "наполнит" кожу водой. На влажную кожу их нужно наносить потому, что раз они удерживают воду, эта вода откуда-то должна взяться. В противном случае они могут наоборот высушивать кожу, вытягивая воду из глубоких слоёв. \n

                `)
            }, 1000)
            setTimeout(() => {
                bot.sendMessage(chatId, `
                Сначала на влажную (это важно) кожу наносится сыворотка/лосьон/тонер/листовая маска/эссенция, которая главным образом состоит из водоудерживающих компонентов. Это "наполнит" кожу водой. На влажную кожу их нужно наносить потому, что раз они удерживают воду, эта вода откуда-то должна взяться. В противном случае они могут наоборот высушивать кожу, вытягивая воду из глубоких слоёв.
                `)
            }, 1000)
        }
        if( data === '1') {
            update = true
            bot.sendMessage(chatId, 'Ваш обновлённый состав бокса: Первое средство, Второе обновлённое средство', buttonChangeUpdates)
        } 
        if( data === '2') {
            update = false
            bot.sendMessage(chatId, 'Ваш состав бокса: Первое средство, Второе средство, Третье средство', buttonChangeUpdates)
        }
    })
    
}

start()