[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org).

### Follow these steps to setup vs code so you can run application inside docker container.

[vs code setup](https://code.visualstudio.com/docs/remote/containers)

Once you have docker and vs code setup then select *open folder in container*.

The images will then be built and two contianers deployed one for **node app** the other for **mongoDB** database.

To run the app in debug *where app will restart whenever there is a change to the code* run the command:

`npm run debug`

To run test:

`npm run tests`

To run normally:

`npm start`

