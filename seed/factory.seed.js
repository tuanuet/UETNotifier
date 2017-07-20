/* eslint-env node */
import faker from 'faker';
import User from '../models/User';
import Student from '../models/Student';
import MainClass from '../models/MainClass';
import Faculty from '../models/Faculty';
import Lecturer from  '../models/Leturer';
import Department from '../models/Department';
import Async from 'async';
import mongoose from 'mongoose';

const seedMainClass = () => {
    for (let i=0;i<10;i++) {
        let cla = new MainClass({
            name: `Class ${i + 1}`
        })
        cla.save().then(() => {
            console.log('Create Class success');
        });
    }
}


const createUser = (role,idStart) => {
    let users = [];
    for(let i=idStart;i<idStart+100;i++){
        let user = new User({
            email : faker.internet.email(),
            password : '1',
            role
        });
        users.push(user);
    }
    return users;

}
const seedUser = (idStart,model) => {
    const users = createUser(model,idStart);
    const Model = mongoose.model(model);

    return User.create(users)
        .then((users) => {
            return users.map((user) => {
                return new Model({
                    _id:user._id,
                    name: faker.name.lastName(),
                    password: '1'
                });
            });
        })
        .then((res) => {
            return Model.create(res);
        });

};
const seed = () => {
    Async.waterfall([
        (cb) => {seedMainClass(); cb(null);} ,
        (cb) => {
            seedUser(0,'Student')
                .then(()=>{
                    console.log('Import Student Success')
                    cb(null);
                })
                .catch(err => cb(err));
        },
        (cb) => {
            seedUser(100,'Lecturer')
                .then(()=>{
                    console.log('Import Lecturer Success')
                    cb(null);
                })
                .catch(err => cb(err));
        },
        (cb) => {
            seedUser(200,'Department')
                .then(()=>{
                    console.log('Import Department Success')
                    cb(null);
                })
                .catch(err => cb(err));
        },
        (cb) => {
            seedUser(300,'Faculty')
                .then(()=>{
                    console.log('Import Faculty Success')
                    cb(null);
                })
                .catch(err => cb(err));
        },
    ],(err)=>{
        if (err) return console.error(err);
        console.log('import success');
    });

}

export default seed();