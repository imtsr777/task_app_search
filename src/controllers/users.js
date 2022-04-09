import sequelize from "../utils/pg.js"
import UserModel from '../models/userModel.js'
import Adresses from "../models/adressModel.js"
import {QueryTypes} from 'sequelize'

class Users{

    async search (req,res){

        let fio_lst = []
        let position_lst = []
        let adress_lst = []

        let word = req.body.word
        word = word.split(" ")

        let sql_query = `
            select u.fio,u.position,a.adress_name  from users as u
            inner join adresses as a on u.adress_id=a.adress_id where
        `

        async function find_user(query_string){
            console.time()
            const [users] = await sequelize.query(query_string)
            console.timeEnd()
            return users
        }

        for(let keyword of word){
            fio_lst.push(`u.fio ilike '%${ keyword }%'`)
            position_lst.push(`u.position ilike '%${ keyword }%'`)
            adress_lst.push(`a.adress_name ilike '%${ keyword }%'`)
        }

        fio_lst = fio_lst.join(" or ")
        position_lst = position_lst.join(" or ")
        adress_lst = adress_lst.join(" or ")
        
        let my_query = sql_query+` (${fio_lst}) and (${position_lst}) and (${adress_lst})`
        
        let selected = await find_user(my_query)
        console.log(my_query)
        res.json(selected)
    }

    async add (req,res){
        try{
            const { fio,position,adress_id } = req.body
    
            await UserModel.create({
                fio,
                position,
                adress_id
            })

            res.json({message:"Succes"}).status(200)
        }

        catch(error){
            res.json({message:error.message}).status(400)
        }
    } 
}


export default Users




// select u.fio,u.position,a.adress_name  from users as u
//             inner join adresses as a on u.adress_id=a.adress_id where (a.adress_name
//             ilike '%ta%' and u.fio ilike '%bar% %ova%'
//             and u.position ilike '%tor%') or (a.adress_name
//                 ilike '%bot%' and u.fio ilike '%on% %ov%'
//                 and u.position ilike '%tem%');