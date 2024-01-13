# Get Started with Development

### First thing First

**Setup Environment Variables in Project**

path: `/config/local/.env.development`

> You'll find required variables in `/config/local/.env.development.sample`

### Routine

1. Run the command given below in Terminal and keep that terminal open till you're working on Project.

````powershell
"[MongoDB]\bin\mongod.exe" --dbpath="[Store]"
# MongoDB - Static Path to the location where you've installed MongoDB
# Store - Static Path to the location where you want to store all files for Database
````

> You can hardcode this things and make a batchfile and use that instead; by passing it to Environment variables.

2. Run `start:dev` npm script in another terminal and keep that terminal running till you're working on Project.

````powershell
npm run start:dev
````

3. Run `dev` npm script in another terminal  and also keep that terminal open till you're working on Project.

````powershell
npm run dev
````

## Flow

- **Node.js Backend Server** will be running on port **3000**

- **Webpack Dev Server** will be running on port **8080**

So, basically you'll be able to debug your

- **FrontEnd** code at `localhost:8080`

- **BackEnd** Code at `localhost:3000`

[unless you change them]

# Happy Coding 🍻