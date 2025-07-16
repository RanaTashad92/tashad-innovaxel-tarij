const express = require('express');
const router = express.Router();
const Url = require('../models/urls');
const validUrl = require('valid-url');

//Getting ALL short URL'S
router.get('/',async(req,res)=>{
    try{
const urls=await Url.find()
res.json(urls)
    }
    catch(err){
res.status(500).json({message: err.message})
    }
})
console.log("Fetching all stored URLs");

//Gettingg original URL by short code
router.get('/shorten/:shortCode', async(req, res) => {
try{
    const url = await Url.findOne({short_code:req.params.shortCode})
if(!url){
    return res.status(404).json({message: 'Url not found'})
}
res.status(200).json({url:url.original_url});
} catch(err) {
    res.status(500).json({message: err.message});
}
});


//Creating
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl || !validUrl.isWebUri(originalUrl)) {
        return res.status(400).json({ message: 'Invalid or missing URL' });
    }
    try {
        let short_code;
        do {
            short_code = Math.random().toString(36).substring(2, 8);
            var existing = await Url.findOne({ short_code });
        } while (existing);
        const url = new Url({
            original_url: originalUrl,
            short_code,
            cc: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            cc: 0
        });
        await url.save();
        res.status(201).json({
            id: url._id,
            url: url.original_url,
            shortCode: url.short_code,
            createdAt: url.created_at,
            updatedAt: url.updated_at
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Updating short url
router.patch('/shorten/:shortCode', async(req, res) => {
const {url} = req.body;
if (!url || !validUrl.isWebUri(url)) {
    return res.status(400).json({ message: 'Invalid or missing URL' }); 
}
try{
    const urlDoc = await Url.findOne({
        short_code: req.params.shortCode
    });
    if(!urlDoc) {
        return res.status(404).json({ message: 'Url not found' });
    }    
    urlDoc.original_url = url;
    urlDoc.updated_at = new Date().toISOString();
    await urlDoc.save();
    res.status(200).json({  
        id: urlDoc._id,
        url: urlDoc.original_url,
        shortCode: urlDoc.short_code,
        createdAt: urlDoc.created_at,
        updatedAt: urlDoc.updated_at
    });   
} catch(err) {
    res.status(500).json({ message: err.message });
}
});

//Deleting One Url  
router.delete('/shorten/:shortCode', async(req, res) => {
try{
    const result = await Url.deleteOne({short_code:req.params.shortCode});
    if(!result){
        return res.status(404).json({ message: 'Url not found' });  
    }
    res.status(200).json({ message: 'Url deleted successfully' });
} catch(err) {
    res.status(500).json({ message: err.message });

}
});


router.get('/shorten/:shortCode/stats', async (req, res) => {
    try {
        const urlDoc = await Url.findOne({ short_code: req.params.shortCode });
        if (!urlDoc) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        res.status(200).json({
            id: urlDoc._id.toString(),
            url: urlDoc.original_url,
            shortCode: urlDoc.short_code,
            createdAt: urlDoc.created_at,
            updatedAt: urlDoc.updated_at,
            accessCount: urlDoc.access_count
        });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;