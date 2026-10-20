# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Cloudinary photo uploads

Create an unsigned upload preset named `love-letter` in Cloudinary and set
`VITE_CLOUDINARY_CLOUD_NAME` to your Cloudinary cloud name. Copy `.env.example`
to `.env.local` for local development, and configure the same variable in your
deployment environment. The cloud name and unsigned preset are public client-side
configuration; do not put an API secret in a `VITE_` variable.

New photos are uploaded to Cloudinary, while their URLs and descriptions are
saved in the current browser's `localStorage`. They are not synchronized
between devices until a shared database is connected.
