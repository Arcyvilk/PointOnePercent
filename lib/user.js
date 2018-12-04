const KEY = require('../config').KEY; 
const fs = require('fs')
const _path = require('path')
const _ = require('lodash')
const cache = require('./cache/cache')

// router.post('/user/create/:username/:hash', user.create)
// router.post('/user/profilechange/:avatar/:description', user.profilechange)
// router.post('/admin/ban', user.ban)
// router.post('/admin/blog/add', user.addBlog)
// router.post('/admin/blog/edit', user.editBlog)
// router.post('/admin/blog/delete', user.deleteBlog)

class UserLogic {
    create(req, res) {     
        if (cache.users.hasOwnProperty(req.params.username))
            return res.status(202).send('This username is already taken.')
        const pathUsers = "./api/users.json"
        cache.users[req.params.username] = {
            password: req.params.hash,
            privilege: 'user',
            banned: false,
            avatar: null,
            description: null
        }
        fs.writeFile(pathUsers, JSON.stringify(cache.users), err => {
            if (err)
                return res.status(500).send(err)
            res.status(200).send("Created")
        })
    }

    list(req, res) {
        const path = './api/users.json'
        fs.readFile(path, (err, data) => {
            if (err)
                return res.status(500).send("Error")
            res.status(200).send(data)
        })
    }

    blog(req, res) {
        const path = './api/blog.json'
        fs.readFile(path, (err, data) => {
            if (err)
                return res.status(500).send("Error")
            res.status(200).send(data)
        })
    }

    ban(req, res) { 
        const pathUsers = "./api/users.json"
        cache.users[req.params.username].banned = !cache.users[req.params.username].banned
        fs.writeFile(pathUsers, JSON.stringify(cache.users), err => {
            if (err)
                return res.status(500).send(err)
            res.status(200).send(`User ${req.params.username} ${ cache.users[req.params.username].banned ? "banned" : "unbanned" }.`)
        })
    }

    profilechange(req, res) { 
        const pathUsers = "./api/users.json"

        cache.users[req.params.username].avatar = req.body.avatar
        cache.users[req.params.username].description = req.body.description
        
        fs.writeFile(pathUsers, JSON.stringify(cache.users), err => {
            if (err)
                return res.status(500).send(err)
            res.status(200).send("Profile changed!")
        })
    }
    
    addBlog(req, res) { 
        const pathBlog = "./api/blog.json"

        cache.blog.push(req.body)
        fs.writeFile(pathBlog, JSON.stringify(cache.blog), err => {
            if (err)
                return res.status(500).send(err)
            res.status(200).send("Blog post added!")
        })
    }
    
    editBlog(req, res) { 
        const pathBlog = "./api/blog.json"
        res.status(200).send("OK")
    }
    
    deleteBlog(req, res) { 
        const pathBlog = "./api/blog.json"
        res.status(200).send("OK")
    }
}

module.exports = new UserLogic()