# Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Redux](https://redux.js.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [React-Redux](https://react-redux.js.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/fr/docs/intro)
- [Chakra UI](https://v2.chakra-ui.com/)
- [The Movie DB](https://www.themoviedb.org/)
- [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

# Why this stack 
- TS, React and Redux : mandatory for the test.
- Vite : I choose Vite insteead of Webpack for personal preference and quicker startup 
- Axios : Needed for api call. I could use fetch but choose Axios as personal preference and the data structure it renders automaticly.
- Chakra UI : I choose to use an UI lib to avoid taking too much time on coding a full custom design as it was not the priority and I already used it in the past.
- Eslint and Prettier : standard practice to have a clean code.
- Components structure is based on Atomic Design. [Here](https://bradfrost.com/blog/post/atomic-web-design/) is a great overview of it by Brad Frost.

# How much time
It took me a little day to do this, including design time, reading documentation (Redux, TheMovieDB api), some api testing and coding.

# Prerequisites
- Node >= 20
- npm >= 10

# Local installation
- Install all dependencies : `npm i`
- Create an account on [The Movie DB](https://www.themoviedb.org/) and get your API key (just follow their [documentation](https://developer.themoviedb.org/docs/getting-started))
- Create a `.env` file with : 
```
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=***PUT_YOUR_API_KEY_HERE***
VITE_IMAGE_API_BASE_URL=https://image.tmdb.org/t/p/w200/
```
- Run the project : `npm run dev`
