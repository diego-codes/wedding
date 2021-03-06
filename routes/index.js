import express from 'express';
import uiRouter from './ui';
import adminRouterConfig from './admin';
import findLanguage from '../middleware/international';

function routerConfig(passport) {
  const router = express.Router();

  router.get('/robots.txt', (request, response) => {
    response.set('Content-Type', 'text/plain');
    response.send('User-agent: *\nDisallow: /');
  });
  router.use('/admin', adminRouterConfig(passport));

  // UI routing
  router.use('/:lang?', findLanguage);
  router.use('/:lang', uiRouter);

  return router;
}

export default routerConfig;
