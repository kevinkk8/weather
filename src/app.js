const path = require("path")
const expr = require("express")
const hbs = require("hbs")
const geo = require("./utils/geocode")
const weater = require("./utils/weater")

const app = expr()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(expr.static(publicDirectoryPath))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('' , (req, res) => {
    res.render('index', {
        title : "Weather App" ,
        name : "KK" 
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title : "About Me" ,
        name : "KK" 
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        title : "Help Page" ,
        name : "KK" 
    })
})

app.get('/help/*', (req, res) => {
    res.render('err404', {
        title : "Help Page" ,
        message : "Help Article not found" ,
        name : "KK"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Must provide a search term'
        })
    }else{
        geo(req.query.address, (error, {langtitude, longtitude, location} = {}) => {
            if(error){
                return res.send(error)
            } 
            weater(langtitude, longtitude, (error, {temp}) => {
                if(error){
                    return res.send(error)
                } 

                return res.send({
                    forecast : location, temp ,
                    address : req.query.address
                })

            })
        })
    }
})

app.get('/*', (req, res) => {
    res.render('err404', {
        title : "Weather" ,
        message : "Page not found" ,
        name : "KK"
    })
})

app.listen(port, () => {
    console.log(port)
})