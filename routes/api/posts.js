var express = require('express')
const Post = require('../../models/Post')
const auth = require('../auth')
var router = express.Router()


// define the home page route
router.get('/:id',auth.required,async (req, res,next) => {
    const {id} = req.params
    const posts = await Post.find({postedBy: id})
  res.json(posts)
})

router.post('/',(req,res)=>{
    const newPost = new Post({
        postedBy: req.body.postedBy,
        postedOn: Date.now(),
        text: req.body.text
    })

    newPost.save().then(user=>{
        res.json(user)
    }).catch(err=>console.log(err))
})


module.exports = router