const express = require('express');
const app = express();
const routerComputer = express.Router();

const modelComputer = require('../database/models/computer');

const status = {success:200,invalid:400};
const messageAdded = 'computer added successfully';
const messageUnable = 'unable to save to database';

routerComputer.route('/add').post((request,response)=>{
    let computer = new modelComputer(request.body);

    computer.save()
    .then(item =>{
        response.status(status.success).json({messageAdded});
    })
    .catch(err => {
        response.status(status.invalid).send({messageUnable});
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