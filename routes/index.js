import express from 'express'
import Url from '../models/Url.js'
const router = express.Router()


router.get('/:short', async (req, res) => {

    const short = req.params.short
    const url = await Url.findOne({ urlCode: short })

    console.log(short)
    if (url) {
        res.redirect(url.longUrl)
    } else {
        if (short == "favicon.ico") {
            return res.redirect('/')
        }
        res.redirect('/')
    }
})


export default router