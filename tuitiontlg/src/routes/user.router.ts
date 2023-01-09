import express from 'express';
import * as user from '../user/user';
import log from '../log';
import userService from '../user/user.service';

const userRouter = express.Router();

// getLogin() - used to see if a user is already logged in
userRouter.get('/', (req: any, res, next) => {
    log.debug('users GET /: ', req.session.user);
    let u = { ...req.session.user };
    log.debug('User: ', u);
    res.send(JSON.stringify(u));
});

// login(user)
userRouter.post('/', function (req: any, res, next) {
    log.debug('users POST /: ', req.body);
    user.login(req.body.username, req.body.password).then((user) => {
        if (user === null) {
            res.sendStatus(401);
        }
        req.session.user = user;
        res.send(JSON.stringify(user));
    });
});

// logout()
userRouter.delete('/', (req, res, next) => {
    log.trace('users DELETE /');
    req.session.destroy((err) => log.error(err));
    res.sendStatus(204);
});

// updateUser(user)
userRouter.put('/', (req, res, next) => {
    log.trace('users PUT /');
    log.debug(req.body);
    userService.updateUser(req.body).then((data)=> {
        res.send(data);
    })
})

export default userRouter;
