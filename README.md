# CarbonCritters

Built in two days at Collabothon 2023 in Sofia, Bulgaria.

## Concept

Gamifying the tracking of individual carbon footprint by turning it into a tamagotchi-inspired user experience. Educate kids on how the products their parents buy affect the environment.

The products you buy either make it happy or sad. Right now, that's all it does. We play an animation based on whether the product you bought was carbon conscious or not.

Upfront user experience could be handled via POS integration, such as printing a barcode to a receipt which can be scanned and the points "claimed" by the user account scanning it.

We didn't get to that. but, it's technically possible to implement.

What we wanted to get to but didn't have time was data on individual purchases, breaking down environmental impact, how they affected your final score and finally some kind of points shop.
I mean, the points need to mean something. Maybe buy the Critter a tophat, or something.

## Implementation

CI/CD is done via GitHub actions, and the frontend bundle is deployed to GitHub Pages. The Backend is Dockerized and the image is deployed to Google Cloud Run.

The backend is written in Java Spring, and the database is Google Data Store.

The backend and the frontend communicate via websockets. The idea was to have real-time two way message sharing. All connected clients get real-time updates to the leaderboard.
Individual users will get an update to their score pushed as soon as a product has been "scanned". In our demo we simulated this, however the backend fetches product data directly from
OpenFoodFacts, so it's technically "real data". Our backend calculates the user's score based on a little algorithm we wrote and the update message is passed to the user session socket.

## Setting it up locally
### Frontend
#### Prerequisites
- NodeJS 20.x
- pnpm
- (optional) casey/just

#### Steps
1. `cd ./frontend`
2. `just fe_init` or `pnpm install`
3. `just fe_start` to start the app and the websocket mock server OR `just fe_start_app` to start just the app.
4. Add `?userId=<insert a user id here>` to the end of the URL. Could be 0, 1, 2 for the local frontend mock server, or an actual userId from the database.

We didn't have time to set up envvars, but you can set up the connection to your local mock server by editing the socket URL in `packages/app/src/App.tsx`.
You can also change it to point at the locally running backend if you want to. We haven't tried it.

For the (mostly) full experience, keep it pointed at the deployed backend.

### Backend

TBD
