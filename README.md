# Promise to be Async

Promises can be tricky to understand, this project is a playground to experiment and better understand them.

### References

- [Fireship.io - The Async Await Episode I Promised](https://youtu.be/vn3tm0quoqE)
- [Jake Archibald - In the loop - JSConf.Asia](https://youtu.be/cCOL7MC4Pl0)

### Usage

- Open browser console
- Smash buttons
- Observe
- Run `doubleClick(<button>)`

## WTH?

- Button `a` is special and demonstrates blocking the main queue
- Buttons simulate an async API call
- While the API is busy, buttons are disabled
- The idle counter increments every 100ms
- When the async job completes the counter resets
- The `doubleClick` function triggers two consecutive clicks

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3600](http://localhost:3600) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn serve`

Serves the production `build` produced on [http://localhost:3601](http://localhost:3601).

### `yarn ngrok`

Starts a `ngrok` tunnel towards the dev server from `yarn start`.
