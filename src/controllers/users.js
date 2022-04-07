import sequelize from "../utils/pg.js"
import UserModel from '../models/userModel.js'
import Adresses from "../models/adressModel.js"
import perm from 'array-permutation-simple'
import {QueryTypes} from 'sequelize'

class Users{

    async search (req,res){

        let word = req.body.word
        word = word.split(" ")
        word = perm(word)
        
        let allUsers = []
        let combUser = []

        async function find_user(name,sname,adress,position){
            const [users] = await sequelize.query(`

            select u.fio,u.position,a.adress_name  from users as u
            inner join adresses as a on u.adress_id=a.adress_id where a.adress_name
            ilike '%${adress}%' and u.fio ilike '%${name}% %${sname}%'
            and u.position ilike '%${position}%'

        `)

            return users
        }


        for(let arr of word){
            let [name="",sname="",adress="",position=""] = arr
            let [users] = await find_user(name,sname,adress,position)
            
            if(users){
                if(!combUser.includes(users.fio)){
                    allUsers.push(users)
                    combUser.push(users.fio)
                }
            }
        }

        res.json(allUsers)
    }
}


export default Users




