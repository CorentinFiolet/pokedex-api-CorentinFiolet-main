const { getTypesModel, getTypeIdModel } = require('./types.model');

// const getTypesController = (_req, res) => {
//     getTypesModel()
//         .then((types) => {
//             res.status(200).send(types);
//         })
//         .catch((err) => {
//             res.status(500).send(err);
//         });
    
// };

const getTypesController = async (_req, res) => {
    try {
        const types = await getTypesModel();

        if(types.length === 0) {
            return res.status(204).send(types);
        }
        return res.status(200).send(types);
        
    } 
    catch (err) {
        return res.status(500).send(err);
    }
    
};

const getTypesIdController = async (req, res) => {
    try {
        const id = req.params.typeId;
        const type = await getTypeIdModel(id);

        if(type === null){
            return res.status(204).send(type);
        }
        return res.status(200).send(type);
    }
    catch (err){
        return res.status(500).send(err);
    }
}

module.exports = {
    getTypesController,
    getTypesIdController
};