import express from "express";
import * as user from "../user/user";
import log from "../log";
import userService from '../user/user.service';

const userRouter = express.Router();

/* GET users listing. */
userRouter.get("/login", function (req: any, res, next) {
    log.debug('user GET /login: ', req.session.user);
    if (req.session.user) {
        console.log(req.session.user);
        res.redirect("/");
    }
});

userRouter.get("/", (req: any, res, next) => {
    log.debug('users GET /: ', req.session.user);
    let u = { ...req.session.user };
    log.debug('User: ', u);
    res.send(JSON.stringify(u));
});

userRouter.delete("/", (req, res, next) => {
    log.trace('users GET /');
    req.session.destroy((err) => log.error(err));
    res.sendStatus(204);
});

userRouter.post("/", function (req: any, res, next) {
    log.debug('users POST /: ', req.body);
    user.login(req.body.username, req.body.password).then((user) => {
        if (user === null) {
            res.sendStatus(401);
        }
        req.session.user = user;
        res.send(JSON.stringify(user));
    });
});

userRouter.put('/', (req, res, next) => {
    log.debug(req.body);
    userService.updateUser(req.body).then((data)=> {
        res.send(data);
    })
})

export default userRouter;
