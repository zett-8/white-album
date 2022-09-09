# White Album 💿
Easy starter for Remix. 

**This repo already includes the following setups:**
* Tailwind CSS
* TypeScript
* Prettier
* Cloudflare Workers (handled by Remix when you init the project)

For the detail instruction about Remix, please check the official document.
- [Remix Docs](https://remix.run/docs)

## ⚠️ Note
The structure and setting files may differ depends on the platform you choose to deploy.
This repo works with *Cloudflare Workers*, so be aware of the differences when you deploy to other platforms. 

## 🚧 Development
1. Install repo
```shell
git clone https://github.com/zett-8/white-album.git

cd white-album
```

2. Install dependencies
```shell
npm install

# or

yarn
```

3. Start development server
```shell
npm run dev

# or 

yarn dev
```

Check out `http://localhost:8787` and you should see the app running.

4. Simulate production build
```shell
npm run start

# or

yarn start
```

This command will start your code with Miniflare(cloudflare worker emulator).


## 🏁 Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```

## 😉 Tips

### Use environment variables
When you want to use environment variables in Remix it's a bit tricky. You can't use `process.env` like you would in a Node.js app.

First, create `.env` file in the root directory and add your environment variables.
No need to install Dotenv package, Remix will automatically load the environment variables from `.env` file.

```text
MY_ENV_VAR=hello
```

Then, you can use environment variables in your code like this:
```ts
console.log(MY_ENV_VAR)
```

But this only works in the server-side code. If you want to use environment variables in the client-side code, you need to pass the environment variables to the client-side code in `root.tsx`.

```tsx 
export const loader: LoaderFunction = async () => {
  return json({
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MY_ENV_VAR,
    },
  })
}

const Document = ({ children }: { children: ReactNode }) => {
  const { env } = useLoaderData()
  
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(env)}` }} />
      </body>
    </html>
  )
}
```

Now you can access the environment variables in the client-side code like this:
```ts
console.log(window.env.MY_ENV_VAR)
```

If you are using TypeScript, you should define types to avoid type errors.
```ts
export {}

declare global {
  const MY_ENV_VAR: string

  interface Window {
    env: {
      NODE_ENV: string
      MY_ENV_VAR: string
    }
  }
}
```

### Power of nested routes
Remix has a powerful nested routing system.   
In the nested routes, parent components won't be unmounted when you navigate to child routes.

And another advantage of nested routes is that you can reduce the number of fetch calls.
Let's say you're accessing /todo/item-1 from /todo, Remix will only fetch data for /todo/item-1, not for /todo again. Because Remix knows your routes structure and it will only fetch data for the current route.

![45f252897454-20211123](https://user-images.githubusercontent.com/33055097/189394342-f0bd9d7c-5530-44ff-bf92-a461e32ff357.gif)

You can access parent loader data in child routes by using `useMatches` hook.

```tsx
const Child = () => {
  const matched = useMatches()
  
  return <div>I'm child</div>
}
```

Check out the [https://remix.run/docs/en/v1/api/remix#usematches](https://remix.run/docs/en/v1/api/remix#usematches) for more details.


### Create protected routes
You can, but you shouldn't.  
In Remix, it's recommended to let each route have their own auth check, to make your app as speedy as possible.

See the [https://remix.run/docs/en/v1/pages/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes](https://remix.run/docs/en/v1/pages/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes) for more details.
