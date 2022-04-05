const anchoringContr    = require('../controllers/anchorController')

module.exports = app => {
    
    app.get('/', (req,res) => {
        res.render('pages/index')
    })

    app.post('/', anchoringContr.fileAnchoring)
}