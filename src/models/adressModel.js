import { DataTypes } from 'sequelize'
import sequelize from '../utils/pg.js'

const Adresses = sequelize.define('Adress',{
     adress_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
     },
     adress_name:{
         type:DataTypes.STRING,
         validate:{
             len:[2,80]
         }
     }
},{
    tableName:"adresses",
    timestamps: false,
        createdAt:false,
        updatedAt:false
})

Adresses.sync()

export default Adresses