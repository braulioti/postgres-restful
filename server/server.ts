import * as restify from 'restify';
import * as pgRestify from 'pg-restify';
import {mergePatchBodyParser} from './merge-patch.parser';
import {handleError} from './error.handle';
import {environment} from '../common/environments';
import {Router} from '../common/router';

export class Server {
    application: restify.Server;

    initializeDb(): Promise<any> {
        this.application = restify.createServer({
            name: 'postgresql-restify',
            version: '1.0.0'
        });

        return new Promise((resolve, reject) => {
            pgRestify.initialize({
                server: this.application,
                pgConfig: environment.db
            }, function(err, pgRestifyInstance) {
                if (err) {
                    reject(err);
                }

                resolve(pgRestifyInstance);
            });
        });
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatchBodyParser);

                // routes
/*
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }*/

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });

                this.application.on('restifyError', handleError);
            } catch (error) {
                reject(error);
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this)
        );
    }
}