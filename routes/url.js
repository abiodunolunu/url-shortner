import express from 'express'
import validUrl from 'valid-url'
import shortId from 'shortid'
import Url from '../models/Url.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { longUrl } = req.body

    const baseUrl = req.protocol + '://' + req.get('host');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url')
    }

    const urlCode = shortId.generate()

    if (!validUrl.isUri(longUrl)) {
        return res.status(401).json('Invalid Long Url')
    }

    try {
        let url = await Url.findOne({ longUrl })
        if (url) {
            console.log(url)
            return res.json(url)
        } else {
            const shortUrl = `${baseUrl}/${urlCode}`
            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })
            await url.save()
            res.json({
                longUrl: url.longUrl,
                shortUrl: url.shortUrl
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error!")
    }
})


export default router