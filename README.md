# Golden vom Bienegässli Website

### Development

1. `cp .env.example .env` to copy the example environment variables
2. `pnpm install && pnpm dev` to install dependencies and start the dev server
3. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user.

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
2. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
