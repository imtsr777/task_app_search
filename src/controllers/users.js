import sequelize from "../utils/pg.js"
import UserModel from '../models/userModel.js'
import Adresses from "../models/adressModel.js"
import perm from 'array-permutation-simple'
import {QueryTypes} from 'sequelize'

class Users{

    async search (req,res){

        let allQuery = []

        let word = req.body.word
        word = word.split(" ")
        word = perm(word)

        let sql_query = `
            select u.fio,u.position,a.adress_name  from users as u
            inner join adresses as a on u.adress_id=a.adress_id where
        `

        async function find_user(query_string){
            
            const [users] = await sequelize.query(query_string)

            return users
        }


        for(let arr of word){
    
            let [name="",sname="",adress="",position=""] = arr
            
            let my_query = `(a.adress_name
            ilike '%${adress}%' and u.fio ilike '%${name}% %${sname}%'
            and u.position ilike '%${position}%')`
            allQuery.push(my_query)                                
        }

        allQuery = allQuery.join(" or ")
        sql_query = sql_query+allQuery

        let newuser = await find_user(sql_query)

        res.json(newuser)
    }
}


export default Users




// select u.fio,u.position,a.adress_name  from users as u
//             inner join adresses as a on u.adress_id=a.adress_id where (a.adress_name
//             ilike '%ta%' and u.fio ilike '%bar% %ova%'
//             and u.position ilike '%tor%') or (a.adress_name
//                 ilike '%bot%' and u.fio ilike '%on% %ov%'
//                 and u.position ilike '%tem%');