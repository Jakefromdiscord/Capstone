require('dotenv').config()
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize')


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false 
        }
    }
})

module.exports = {
    seed: (req, res) =>{
        sequelize.query(`
        create table Mountain (
            mountain_id serial primary key,
            mountain_name varchar(30)
        );
        
        create table Resort (
            resort_id serial primary key,
            resort_name varchar(30)
        );

        create table want_to_go (
            want_id serial primary key,
            want_name varchar(30)
        );

        create table have_been (
            have_been_id serial primary key,
            have_name varchar(30)
        );
        
        insert into Mountain (mountain_id, mountain_name)
        values (1, 'wasatch');
        
        insert into Resort (resort_id, resort_name)
        values (1, 'snowbasin')`)
        .then(() => {
            console.log('db seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}