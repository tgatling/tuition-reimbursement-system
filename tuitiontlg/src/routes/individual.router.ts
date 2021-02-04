import Express from 'express';
import log from '../log';
import applicationService from '../application/application.service';

const individualRouter = Express.Router();

individualRouter.get('/:username', function(req,res,next) {
    log.trace('ind GET /');
    applicationService.getApplicationByEmployee(req.params.username).then((applications) => {
        res.send(JSON.stringify(applications));
    })
})

export default individualRouter;