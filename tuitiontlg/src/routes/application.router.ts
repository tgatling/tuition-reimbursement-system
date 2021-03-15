import Express from 'express';
import log from '../log';
import applicationService from '../application/application.service';

const applicationRouter = Express.Router();

applicationRouter.get('/', function(req, res, next) {
    log.trace('app GET /');
    applicationService.getAllApplications().then((applications) => {
        log.debug(applications);
        res.send(JSON.stringify(applications));
    });
});

applicationRouter.get('/:id', function(req, res, next) {
    log.trace('app GET /:id');
    applicationService.getApplicationById(req.params.id).then((application)=>{
        res.send(JSON.stringify(application));
    });
})

applicationRouter.delete('/:id', function (req, res, next) {
    log.trace('app DELETE /:id');
    log.debug(req.params.id);
    applicationService.removeApplication(Number(req.params.id)).then((data)=> {
        log.debug(data);
        res.sendStatus(200);
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500);
    })
});

applicationRouter.post('/', (req, res, next) => {
    log.trace('app POST /');
    log.debug(req.body);
    applicationService.addApplication(req.body).then((data)=> {
        log.debug(data);
        res.sendStatus(201);
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500);
    })
});

applicationRouter.put('/', (req, res, next) => {
    log.trace('app PUT /');
    log.debug(req.body);
    applicationService.updateApplication(req.body).then((data)=> {
        res.send(data);
    })
})
export default applicationRouter;