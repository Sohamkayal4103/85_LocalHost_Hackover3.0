const Organizer = require('../models/organizer');
const asyncHandler = require('express-async-handler');

const addOrganizer = asyncHandler(async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const {name,email,image,contact,identityProof,isVerified} = req.body;
    const organizerExist = await Organizer.findOne({email});
    if(organizerExist){
        res.status(400);
        throw new Error('Organizer already exists');
    }
    const organizer = await Organizer.create({
        name,
        email,
        image,
        contact,
        identityProof,
        isVerified
    })
    if(organizer){
        res.status(201).json({
            _id: organizer._id,
            name: organizer.name,
            email: organizer.email,
            image: organizer.image,
            contact: organizer.contact,
            identityProof:organizer.identityProof,
            isVerified:organizer.isVerified
        })
    } else {
        res.status(400);
        throw new Error('Organizer not created');
    }
})


const getOrganizer = async(req,res) => {
    res.status(200).json(await Organizer.find())
}

module.exports = {getOrganizer,addOrganizer}
