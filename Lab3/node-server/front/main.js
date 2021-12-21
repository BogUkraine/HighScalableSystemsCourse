const canvas = document.getElementById('map')

ctx = canvas.getContext("2d")

ctx.beginPath()

const draw = () => {
    fetch('http:localhost:3000/postcodes/borders')
    .then(async (responseP) => {
        const borders = await responseP.json()
        console.log(borders)
        fetch('http:localhost:3000/orders/random')
        .then(async (response) => {
            const order = (await response.json()).order[0]
            
            order.movement.sort((a, b) => b.distance - a.distance).forEach((item, index, self) => {
                const x = Math.round(((borders.maxX - item.Lon) * canvas.width) / (borders.maxX - borders.minX))
                const y = Math.round(canvas.height - (((borders.maxY - item.Lat) * canvas.height)/ (borders.maxY - borders.minY)))
                
                if (index%3 === 0) {
                    console.log('x: ', x, ' y: ', y)
                    if (index === 0) { //start
                        ctx.fillRect(x-15,y-15,30,30)
                        ctx.moveTo(x, y)
                    } else if (index === self.length - 1) { //finish
                        ctx.fillRect(x-25,y-25,50,50)
                        ctx.lineTo(x, y)
                        ctx.stroke()
                    } else {
                        ctx.fillRect(x-5,y-5,10,10)
                        ctx.lineTo(x, y)
                    }

                    ctx.fillText(`Time: ${new Date(item.timestamp).getTime() - new Date(self[0].timestamp).getTime()}`, x, y-10)
                    ctx.fillText(`Distance: ${item.distance}`, x, y+20)
                }
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

draw()