import { Router, Request, Response } from 'express';
const router = Router();

// 1,The first will log all request bodies,
//  as well as the url path they are requesting, 
// and the HTTP verb they are using to make the request
router.use((req: Request, res: Response, next: Function) => {
    console.log('_______________________________');
    console.log('_______________________________');
    console.log("*****CURRENT HTTP REQUEST:*****");
    console.log('req.body:\t' + JSON.stringify(req.body));
    console.log('req.path:\t' + req.path);
    console.log('req.method:\t' + req.method);
    // console.log('req.body:' + req.body + ' req.path:' + req.path + ' req.method:' + req.method);
    next();
})

// 2,The second will keep track of many times a particular URL has been requested,
//  updating and logging with each request.
const pathAccessed = {};

router.use((req: Request, res: Response, next: Function) => {
    let currentPath = req.url;
    if (!pathAccessed[currentPath]) {
        pathAccessed[currentPath] = 0;
    }
    pathAccessed[currentPath]++;

    console.log("");
    console.log("*****ALL REQUEST COUNT*****");
    for (let i in pathAccessed) {
        console.log(`${i} \t: ${pathAccessed[i]}`);
    }
    next();
})

export default router;