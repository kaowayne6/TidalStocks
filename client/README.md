# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Test Coverage plan

Right now our application has 2 major components: Creating an account and Signing into the dashboard.

Therefore, we will need to write test cases around these 2 core functionalities.

## Test Cases for Creating an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that first name is updated
   2. Test that last name is updated
   3. Test that email address is updated
   4. Test that password is updated
3. Test that checkPasswordStrength is working as intended
   1. Test that it succesfully passes a valid password
   2. Test that an erroneous password fails condition 1
   3. Test that an erroneous password fails condition 2

## Test Cases for Login into an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that email is updated
   2. Test that password is updated

## Test Cases for Server (In server folder)

1. Test that POST register server call works as intended
   1. Test register to a new user and successful authentication
   2. Test register on user with same email in database
2. Test that POST login server call works as intended
   1. Test with right login information
   2. Test with wrong login information
3. Test that GET user returns confirmation of authenticated user or not
   1. Test with not authenticated
   2. Test with authenticated
4. Test that GET logout succesfully logs user out of session using GET user

### Charting Library and Meaningful Data Documentation

1. The charting library we are using is [Nivo](https://nivo.rocks/line). Specfically, the Nivo line chart.
2. The data endpoint, Historical Stock, from Yahoo Finance provides the user meaningful data pertaining to the price of the stock in it's history.
   1. We then use the Nivo Line chart to graph that data to help the user see the trend of the stock price over a period of time
