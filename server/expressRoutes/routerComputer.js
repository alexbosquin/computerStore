const express = require('express');
const app = express();
const routerComputer = express.Router();

const modelComputer = require('../database/models/computer');



routerComputer.route('/add').post((request,response)=>{
    let computer = new modelComputer(request.body);

    computer.save()
        .then(item => {
            response.status(200).json({'Computer': 'Computer added successfully','error':false});
        })
        .catch(err => {
            response.status(200).json({'Computer':"unable to save to database",'error':true});
        });
    
});


const messageErrorFinding = 'Error finding computers';

routerComputer.route('/').get((request,response) =>{
    modelComputer.find((error,computers)=>{
        if (error){
            console.log(messageErrorFinding);
        }
        else
        {
            response.json(computers);
        }
    });
});

const messageCantLoadDocument = 'Cound not load document';
const messageUpdateComplete = 'Update Complete';
const messageUnableUpdate = 'Unable to update the database';

routerComputer.route('update/:id').post((request,response)=>{
    modelComputer.findById(request.params.id,(error,computer)=>{
        if (!computer)
        {
            return next(new Error(messageCantLoadDocument));
        }
        else
        {
            computer.description = request.body.description;
            computer.price = request.body.price;
            computer.imageLink = request.body.imagelink;

            computer.save().then(computer => {
                response.json(messageUpdateComplete);
            })
            .catch((error => {
                response.status(status.invalid).send(messageUnableUpdate);
            }));
        }
    });
});

const messageSuccessRemoved = 'Successfully removed a computer from the list';

routerComputer.route('/delete/:id').get((request,response)=>{
    modelComputer.findByIdAndRemove( {_id: request.params.id},(error,computer)=>{
        if (error)
        {
            response.json(error);
        }
        else
        {
            response.json(messageSuccessRemoved);
        }
    } );
});

module.exports = routerComputer;