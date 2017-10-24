const express = require('express');
const app = express();
const routerComputer = express.Router();

const modelComputer = require('../database/models/computer');



routerComputer.route('/add').post((request,response)=>{
    let computer = new modelComputer(request.body);

    computer.save()
        .then(computer => {
            response.status(200).json({'Computer': 'Computer added successfully','error':false});
        })
        .catch(err => {
            response.status(400).send(err);
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

routerComputer.route('/find/:id').get( (request,response)=>{
    modelComputer.findOne( {_id: request.params.id},(error,computer)=>{
        if (error)
        {
            response.json(error);
        }
        else
        {
            response.json(computer);
        }
    } );
} );

const messageUpdateComplete = 'Update Complete';
const messageUnableUpdate = 'Unable to update the database';

routerComputer.route('/update/:id').put((request,response)=>{
    let id = request.params.id;
    modelComputer.findByIdAndUpdate({_id: id},request.body,(error,computer)=>{
        if (error)
        {
            console.log(error);
            response.status(404).send();
        }
        else
        {
            if (!computer)
            {
                response.status(500).send();
            }
            else
            {
                response.status(200).json(messageUpdateComplete);
            }
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