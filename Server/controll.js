require('dotenv').config()
const {CONNECTION_STRING} = process.env 
const mountains = require('./seed')


const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:`postgres`,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

var mountainId = 7
var resortId = 7





module.exports = {
    createMtn:(req, res) => {

        let {mountainName} = req.body
        sequelize.query(`
        insert into want_to_go (want_name)
        values ('${mountainName}')`)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
        
    },

    createRes:(req, res) => {
        let {resortName} = req.body
        sequelize.query(`
        insert into want_to_go (want_name)
        values ('${resortName}')`)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },

    pushMount:(req, res) => {
        sequelize.query(`
        select *
        from Mountain`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    pushRes:(req, res) => {
        sequelize.query(`
        select *
        from Resort`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getMtn:(req, res) => {
        sequelize.query(`
        select *
        from Mountain`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getRes:(req,res) => {
        sequelize.query(`
        select *
        from Resort`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getWants:(req, res) => {
        sequelize.query(`
        select *
        from want_to_go;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    moveWants:(req, res) => {
        const { id, name } = req.params
        console.log(id, name)
        sequelize.query(`
        insert into have_been (have_been_id, have_name)
        values (${id}, '${name}');

        delete
        from want_to_go
        where want_id = ${id};

        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getHave:(req, res) => {
        sequelize.query(`
        select *
        from have_been`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}