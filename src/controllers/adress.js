import AdressModel from '../models/adressModel.js'

class Adress {

    async add(req,res){
        try{
            const { adress_name } = req.body
            await AdressModel.create({
                adress_name
            })
            res.json({message:"Succes"}).status(200)
        }
        catch(error){
            res.json({message:error.message}).status(400)
        }
    }
}

export default Adress