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
    tableName:'users'
});

Users.sync({ alter: true })

export default Users


// { force: true }
// { alter: true }
