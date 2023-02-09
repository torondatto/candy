const fetch = require("node-fetch")

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
        })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
}

module.exports ={
    name: 'quote',
    category: 'fun',
    aliases: ['inspire'],
    description: 'Famous Quote',
    usage: '!inspire',
    run: (client, message,  args) => {
        getQuote().then(quote => message.channel.send(quote))
    }
}