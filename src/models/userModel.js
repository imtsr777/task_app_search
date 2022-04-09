import { DataTypes } from 'sequelize'
import sequelize from '../utils/pg.js'


const Users = sequelize.define('Users',{

        user_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        fio: {
            type:DataTypes.STRING,
            unique:true
        },
        position:{
            type:DataTypes.STRING,
        },
        adress_id:{
            type:DataTypes.INTEGER
        }
    },
    {
        tableName:'users',
        timestamps: false,
        createdAt:false,
        updatedAt:false
    }
);

Users.sync()

export default Users


// { force: true }
// { alter: true }
