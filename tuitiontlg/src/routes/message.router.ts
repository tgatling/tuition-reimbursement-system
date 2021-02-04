import Express from 'express';
import log from '../log';
import messageService from '../communication/message.service';

const messageRouter = Express.Router();

messageRouter.get('/', function(req, res, next) {
    log.trace('msg GET /');
    messageService.getAllMessages().then((messages) => {
        log.debug(messages);
        res.send(JSON.stringify(messages));
    });
});

messageRouter.get('/:username', function(req,res,next) {
    log.trace('msg GET /:username');
    log.trace(req.params.username);
    messageService.getMessagesByRecipient(req.params.username).then((messages) => {
        res.send(JSON.stringify(messages));
    })
})

messageRouter.delete('/:id', function (req, res, next) {
    log.trace('msg DELETE /:id');
    log.debug(req.body);
    messageService.removeMessage(req.body).then((data)=> {
        log.debug(data);
        res.sendStatus(200);
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500);
    })
});

messageRouter.post('/', (req, res, next) => {
    log.trace('msg POST /');
    log.debug(req.body);
    messageService.addMessage(req.body).then((data)=> {
        log.debug(data);
        res.sendStatus(201);
    }).catch((err) => {
        log.error(err);
        res.sendStatus(500);
    })
});

export default messageRouter;