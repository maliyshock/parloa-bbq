# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Task:
Please develop the web application with TypeScript and React. Feel free to use a tool
like Create React App, Vite or anything similar to set up the project. The code should
be what you would use in a production environment and incorporate engineering best
practices.

In the past, Parloa had twice a year hosted a BBQ with its active customers. The
selection of customers was based on the industry. Parloa now needs a single page
application that allows it to view its (active) customers. It should also be possible to
create new customers, edit customers, delete inactive customers and filter customers
by industry. The customer data can be found below and should be loaded dynamically
when you visit the website.
https://parloafrontendchallenge.z6.web.core.windows.net/customers.json

### Requirements:
* include loading and error states
* readable and testable code is the goal

## Comments:
Since there is no design provided and I have some UX/UI experience i tried to do my best guess how it should work and feel.
The task description has also a room for the freedom to make your own choice. For example customer creation and project creation. 
I knew that in parloa they are using ant design + react/redux as a core of SPA. Despite i did not had a practice with redux for a while and i did not had any experience with ant design i chose this stack to show and prove that i can learn and deliver things in short timeframe. I tried to follow redux example provided from the documentation. I never worked with "features" structure and i kinda find a bit weird the file naming convention, but i tried to guess and follow the examples. I would rather prefer to have "components", "slices", "store" folders.  

For this task they were expecting me to spend 3 hours, i spent 3 days to make things better as they could. Ofcourse there is a room for improvement still, but after 3 days of development i decided to stop and not to spend any additional time.
I also provided some unit tests and left some comments there. 

## Available Scripts

Beware, i used craco. Instead of using of npm in terminal use craco.
In the project directory, you can run:

### `craco start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `craco test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `craco build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
