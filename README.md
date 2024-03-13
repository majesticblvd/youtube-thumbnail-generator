
## Getting Started

Install the needed dependencies:

```bash
npm install
```
Make sure you're on the correct node version:
```bash
nvm use
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Making Changes

Pull the latest from Main and then make a branch off of it and begin making your changes!

## Deployment

Merge your branch with dev to see changes in the staging environment

Push up the dev branch and the build will automatically begin with your changes. 
```bash
git push origin dev
```
Dev URL [https://thumbnail-generator-drab-stage.vercel.app]([https://thumbnail-generator-drab-stage.vercel.app]) 

After merging your branch into main and you are ready to deploy the latest version of the code to vercel run: 
```bash
npm run deploy
```



