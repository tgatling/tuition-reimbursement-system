import Express from 'express';
import log from '../log';
import applicationService from '../application/application.service';

const applicationRouter = Express.Router();

applicationRouter.get('/', function(req, res, next) {
    log.trace('GET (/)');
    applicationService.getAllApplications().then((applications) => {
        log.debug(applications);
        res.send(JSON.stringify(applications));
    });
});

applicationRouter.get('/:id', function(req, res, next) {
    log.trace('GET (/:id)');
    applicationService.getApplicationById(req.params.id, req.params.employee).then((application)=>{
        res.send(JSON.stringify(application));
    });
})

applicationRouter.delete('/:id', function (req, res, next) {
    log.trace('DELETE (/:id)');
    log.debug(req.body);
    applicationService.removeApplication(req.body).then((data)=> {
        log.debug(data);
        res.sendStatus(200);
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500);
    })
});

applicationRouter.post('/', (req, res, next) => {
    log.trace('POST (/)');
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
    log.trace('PUT (/)');
    log.debug(req.body);
    applicationService.updateApplication(req.body).then((data)=> {
        res.send(data);
    })
})
export default applicationRouter;