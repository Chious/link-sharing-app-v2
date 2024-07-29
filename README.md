# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/Chious/link-sharing-app-v2](https://github.com/Chious/link-sharing-app-v2)
- Live Site URL: [https://link-sharing-app-v2.vercel.app](https://link-sharing-app-v2.vercel.app)

## My process

### Built with

1. Front-end

\*main

- [Next.JS](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

\*others

- [dnd-kit](https://dndkit.com) - package to manage drag and drop
- [@urql/next](https://www.npmjs.com/package/@urql/next) - package to manage graphql to nextjs in client side
- [sweetalert2](https://sweetalert2.github.io/) - package to manage alert

2. DB / Server

\*main

- [Next.JS](https://nextjs.org/) - build with api router and server action
- [TURSO](https://turso.tech) - sqlite database
- [drizzle-orm](https://orm.drizzle.team) - package to manage sql to turso
- [GraphQL](https://graphql.org/) - package to manage api
- [Amazon S3](https://aws.amazon.com/s3/) - package to save image in amazon

\*others

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - package to manage jwt
- [bycryptjs](https://www.npmjs.com/package/bcryptjs) - package to manage password

### What I learned

- How to use dnd-kit to manage drag and drop
- How to use graphql to manage api
- How to use tailwindcss to manage css
- How to use nextjs to manage ssr and ssr

### Continued development

### Useful resources

1. [【Youtube】Storing Images in S3 from Node Server](https://www.youtube.com/watch?v=eQAIojcArRY)

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)
