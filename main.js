let data = {
    money: 0,
    shop_amount: [0,0,0,0,0,0],
    current_cursor: 0
}
let game = {
    shop: [
        //sec 1
        {
            name:"Stronger Fingers",
            desc_start:"Makes your fingers stronger. ",
            amount: 0.1,
            type: "money",
            base_price: 10
        },
        {
            name:"Faster Reflexes",
            desc_start:"Increase the speed at which you react. ",
            amount: 0.1,
            type: "speed",
            base_price: 1
        },
        {
            name:"Thumb Clicking",
            desc_start:"Allows you to click with your Thumb. ",
            amount: 0.15,
            type: "money",
            base_price: 1
        },
        //sec 2
        {
            name:"Double Handed",
            desc_start:"Alows you to use both of your hands to click. ",
            amount: 0.15,
            type: "speed",
            base_price: 1
        },
        {
            name:"Multi-click",
            desc_start:"Allows you to click multiple times instead of once. ",
            amount: 0.25,
            type: "speed",
            base_price: 1
        },
        {
            name:"Better Pointer Finger Clicking",
            desc_start:"Allows you to click with your Pointer Finger better. ",
            amount: 0.25,
            type: "money",
            base_price: 1
        },
        //sec 3
        {
            name:"Drag Click",
            desc_start:"Drag Click with your fingers better. ",
            amount: 0.35,
            type: "speed",
            base_price: 1
        },
        {
            name:"Golden Touch",
            desc_start:"Makes your clicks much more valuable with the Golden Touch. ",
            amount: 0.35,
            type: "money",
            base_price: 1
        },
        {
            name:"AutoClicker T1",
            desc_start:"Upgrade AutoClickerT1 to click faster than ever before. ",
            amount: 0.35,
            type: "speed",
            base_price: 1
        },
        //sec 4
        {
            name:"Thumb Clicking",
            desc_start:"Allows you to click with your Thumb better. ",
            amount: 0.50,
            type: "money",
            base_price: 1
        },
        {
            name:"Friend Richie",
            desc_start:"Bring in your friend Richie to click. His clicks are very rich. ",
            amount: 0.50,
            type: "money",
            base_price: 1
        },
        {
            name:"AutoClicker T2",
            desc_start:"Upgrade AutoClickerT2 to click faster than ever before. ",
            amount: 0.50,
            type: "speed",
            base_price: 1
        },
    ],
    cursor_mult: [1],
    mps: 0,
    cps: 1,
    fps: 60,
    mpc: 0,
    cursor_price: [75],
    cursor_display: ["Basic","Steel","Ruby","Jade","Glitch","Void","Smol","Sun","Not a "],
    cursor_id: ["Main","Steel","Ruby","Jade","Glitch","Void","Smol","Sun","Not"]
}
function updData () {
    if (data.shop_amount.length < game.shop.length) {
        for (let i = data.shop_amount.length-1; i < game.shop.length; i++) {
            if (!(data.shop_amount[i])) {
                data.shop_amount[i] = 0
            }
        }
    }
}
updData()
function short (n) {
    if (n == Infinity) {
        return n
    }
    if (n < 1000) {
        return n.toFixed(1)
    } else if (n > Math.pow(10, 303)) {
        return short(Math.floor(n/Math.pow(10, 301))/100)+" centillion"
    } else if (n > Math.pow(10, 130)) {
        return short(Math.floor(n/Math.pow(10, 128))/100)+" skewers number"
    } else if (n > Math.pow(10, 100)) {
        return short(Math.floor(n/Math.pow(10, 98))/100)+" googol"
    } else if (n < Math.pow(10, 100) && n > Math.pow(10, 99)-1) {
        return short(Math.floor(n/Math.pow(10, 98))/100)+" duotrigintillion"
    }
    // NUMBERS FROM https://faculty.math.illinois.edu/~castelln/prillion_revised_10-05.pdf
    const abbr = [" thousand"," million"," billion"," trillion"," quadrillion"," quintrillion"," sextillion"," septillion"," octillion"," nonillion"," decillion"," undecillion"," duodecillion"," tredecillion"," quattuordecillion"," sexdecillion"," septemdecillion"," octodecillion"," novemdecillion"," vigintillion"," unvigintillion"," duovigintillion"," trevigintillion"," quattuorvigintillion"," quinvigintillion"," sexvigintillion"," septvigintillion"," octovigintillion"," nonvigintillion"," trigintillion"," untrigintillion"," duotrigintillion"]
    let numm = 3
    while (n > Math.pow(10, numm)-1) {
        if (n > Math.pow(10, numm)-1) {
            numm += 3
        }
    }
    numm -= 3
    return (Math.floor(n/Math.pow(10, numm-2))/100)+abbr[(numm/3)-1]
}
function cursorClick () {
    data.money += game.mpc
}
document.querySelector("#cursor").addEventListener("click",function () {
    cursorClick()
})
function setupCursors () {
    for (let i = 1; i < game.shop.length; i++) {
        game.cursor_mult[i] = game.cursor_mult[i-1]*(i+1)
    }
}
setupCursors()
function setupDesc () {
    for (let i = 0; i < game.shop.length; i++) {
        game.shop[i].desc = `${game.shop[i].desc_start}Increases the ${game.shop[i].type == "money" ? "amount of money you make per" : "speed at which you"} click by +${game.shop[i].amount*100}% each.`
    }
}
setupDesc()
function getCurrentPrice (n) {
    return game.shop[n].base_price*Math.pow(1+(game.shop[n].amount*1.15),data.shop_amount[n])*game.cursor_mult[Math.floor(n/3)]
}
function shopBuy (n) {
    if (data.shop_amount[n] > 49 || false) {//data.money < getCurrentPrice(n)) {
        return
    }
    data.money -= 0//getCurrentPrice(n)
    data.shop_amount[n] += 1
}
function createShp () {
    for (let i = 0; i < game.shop.length; i++) {
        let c = document.createElement("div")
        c.classList.add("shopitem")
        c.id = `item${i}`
        document.querySelector("#shop").appendChild(c)
        let x = document.createElement("img")
        x.src = `assets/shop${i}.png`
        c.appendChild(x)
        x = document.createElement("h1")
        x.innerHTML = game.shop[i].name
        c.appendChild(x)
        x = document.createElement("p")
        x.innerHTML = game.shop[i].desc
        c.appendChild(x)
        x = document.createElement("button")
        x.innerHTML = "Buy (Loading...)"
        x.addEventListener("click",function () {shopBuy(i)})
        c.appendChild(x)
    }
}
createShp()
document.onkeydown = function (e) {
    if (e.key == " " || e.key == "Space") {
        cursorClick()
    }
}
function updShop () {
    for (let i = 0; i < game.shop.length; i++) {
        document.querySelector(`#item${i}`).querySelector("button").textContent = data.shop_amount[i] > 49 ? "MAXED" : `Buy $${short(getCurrentPrice(i))} (${data.shop_amount[i]})`
        document.querySelector(`#item${i}`).querySelector("button").style.backgroundImage = `linear-gradient(to right, rgb(32, 168, 98) ${data.shop_amount[i]*2}%, rgb(37, 120, 168) ${data.shop_amount[i]*2}%)`
    }
}
function updStats () {
    game.cps = 1
    for (let i = 0; i < game.shop.length; i++) {
        if (game.shop[i].type == "speed") {
            game.cps = game.cps*(1+game.shop[i].amount*data.shop_amount[i])
        }
    }
    game.mps = 1*game.cps
    for (let i = 0; i < game.shop.length; i++) {
        if (game.shop[i].type == "money") {
            game.mps = game.mps*(1+game.shop[i].amount*data.shop_amount[i])
        }
    }
    game.mpc = game.mps/game.cps
}
function setupPrices () {
    for (let i = 1; i < game.shop.length; i++) {
        game.shop[i].base_price = game.shop[i-1].base_price*(1+(game.shop[i-1].amount*60))
    }
}
setupPrices()
document.querySelector("#next").addEventListener("click",function () {
    if (1 == 1) {//data.mps >= game.cursor_price[data.current_cursor+1]) {
        let x = confirm("Are you sure that you would like to move to the next cursor?")
        if (!(x)) {
            return
        }
        let g = document.querySelector("#flashbang")
        g.style.scale = 1
        g.style.opacity = 1
        setTimeout(function () {
            data.money = 0
            data.shop_amount = []
            updData()
            data.current_cursor += 1
            g.style.opacity = 0
            upd()
            setTimeout(function () {
                g.style.scale = 0
            }, 3000)
        }, 3000)
    }
})
function setupCPrices () {
    for (let i = 1; i < game.cursor_mult.length; i++) {
        game.cursor_price[i] = game.cursor_price[i-1]*game.cursor_mult[i-1]*(game.shop[(i+1)*3-1] ? 1+game.shop[(i+1)*3-1].amount : 2)
    }
}
setupCPrices()
let ll = Date.now()
let tl = ll
function upd () {
    updStats()
    document.querySelector("#cursor").src = `assets/hand${game.cursor_id[data.current_cursor]}.png`
    document.querySelector("#cursor").style.translate = `-50% ${-50+Math.sin(Date.now()/750)*10}%`
    document.querySelector("#money").textContent = `$${short(data.money)}`
    document.title = `Idle Clicker 3 - $${short(data.money)}`
    document.querySelector("#mps").textContent = `mps: $${short(game.mps)}`
    document.querySelector("#cps").textContent = `cps: ${short(game.cps)}`
    document.querySelector("#mpc").textContent = `mpc: ${short(game.mpc)}`
    data.money += game.mps/game.fps
    updShop()
    tl = Date.now()
    game.fps = 1000/(tl-ll)
    ll = tl
    requestAnimationFrame(upd)
}
upd()