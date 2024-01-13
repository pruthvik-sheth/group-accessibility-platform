### Understand Scripts

**```start```**

It will start Express Server both locally and in Production (Will work for both Developer Build and Production Build of Webpack Bundle)

**```start:dev```**

It will start Express Server with Environment variables ( Will work only for Developer Build of Webpack Bundle )

**```dev```**

It will start Webpack Dev-server in Development Mode ( No need to build Webpack Bundle )

**```build:dev```**

It will build Webpack Bundle for Development Mode ( With Development Source Maps and Development Environment Variables )

**```build:prod```**

It will build Webpack Bundle for Production Mode ( With Production Source Maps and Production Environment variables )

**```build:prod:dev```**

It will build Webpack Bundle for Production Mode ( With Production Source Maps and Development Environment Variables )

**```heroku-postbuild```**

Whatever is inside this Script will run just after Deploying an App on Heroku