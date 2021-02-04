import Express from 'express';
import log from '../log';
import reimbursementFormService from '../application/reimbursementForm.service';

const myRouter = Express.Router();

myRouter.delete('/:id', function (req, res, next) {
    log.trace('My DELETE /:id')
    log.debug(req.body);
    reimbursementFormService.deleteForm(req.params.id).then((data)=> {
        log.debug(data);
        res.sendStatus(200); // Created
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

export default myRouter;