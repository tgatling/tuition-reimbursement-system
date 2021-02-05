import Express from 'express';
import log from '../log';
import reimbursementFormService from '../application/reimbursementForm.service'

const reimbursementRouter = Express.Router();


reimbursementRouter.get('/', function(req, res, next) {
    reimbursementFormService.getForms().then((form) => {
        res.send(JSON.stringify(form));
    });
});

reimbursementRouter.get('/:id', function(req, res, next) {
    log.trace('rf get /:id', req.params.id);
    reimbursementFormService.getFormById(Number(req.params.id)).then((form)=>{
        res.send(JSON.stringify(form));
    });
})

reimbursementRouter.post('/', (req, res, next) => {
    log.debug(req.body);
    reimbursementFormService.addForm(req.body).then((data)=> {
        log.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

reimbursementRouter.put('/', (req, res, next) => {
    log.debug(req.body);
    reimbursementFormService.updateForm(req.body).then((data)=> {
        res.send(data);
    })
})

export default reimbursementRouter;