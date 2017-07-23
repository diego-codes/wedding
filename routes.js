import express from 'express';

function isLoggedIn (request, response, next) {
  if (request.isAuthenticated()) {
    next();
    return;
  }

  response.redirect('/login');
}

function routes (passport) {
  const router = express.Router();

  router.get('/', (request, response) => {
    response.render('index');
  });

  router.get('/login', (request, response) => {
    response.render('main', {
      title: 'This should prompt you to log in',
      login: true,
    });
  });

  router.post('/login',
   passport.authenticate('local', {
     successRedirect: '/restricted',
     failureRedirect: '/login',
   }),
   (request, response) => {
     response.render('main', {
       title: 'This should prompt you to log sn',
     });
   });

  router.get('/logout', (request, response) => {
    response.render('main', {
      title: 'You should be logged out now',
    });
  });

  router.get('/restricted', isLoggedIn, (request, response) => {
    response.render('main', {
      title: 'This is restricted',
    });
  });

  return router;
}

export default routes;
