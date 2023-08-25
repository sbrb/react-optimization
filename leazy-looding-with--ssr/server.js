// // @ts-check
// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const { Helmet } = require("react-helmet");
// require("dotenv").config();

// const PORT = process.env.PORT;

// const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

// async function createServer(
//   root = process.cwd(),
//   isProd = process.env.NODE_ENV === "production"
// ) {
//   const resolve = (p) => path.resolve(__dirname, p);

//   const indexProd = isProd
//     ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
//     : "";

//   const app = express();

//   /**
//    * @type {import('vite').ViteDevServer}
//    */
//   let vite;
//   if (!isProd) {
//     vite = await require("vite").createServer({
//       root,
//       logLevel: isTest ? "error" : "info",
//       server: {
//         middlewareMode: true,
//         watch: {
//           // During tests we edit the files too fast and sometimes chokidar
//           // misses change events, so enforce polling for consistency
//           usePolling: true,
//           interval: 100,
//         },
//       },
//     });
//     // use vite's connect instance as middleware
//     app.use(vite.middlewares);
//   } else {
//     app.use(require("compression")());
//     app.use(
//       require("serve-static")(resolve("dist/client"), {
//         index: false,
//       })
//     );
//   }

//   app.get(
//     "/product/:id",
//     (req, res, next) => {
//       setTimeout(() => next(), 3000);
//       setInterval(() => {
//         console.log(1);
//       }, 1000);
//     },
//     async (req, res) => {
//       try {
//         const url = req.originalUrl;

//         let template, render;
//         if (!isProd) {
//           // always read fresh template in dev
//           template = fs.readFileSync(resolve("index.html"), "utf-8");
//           template = await vite.transformIndexHtml(url, template);
//           // (await vite.ssrLoadModule("/src/App.jsx")).setup();
//           render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
//         } else {
//           template = indexProd;
//           render = require("./dist/server/entry-server.js").render;
//         }

//         const context = {};
//         const appHtml = render(url, context);

//         if (context.url) {
//           // Somewhere a `<Redirect>` was rendered
//           return res.redirect(301, context.url);
//         }

//         const helmet = Helmet.renderStatic();
//         const helmetTags = helmet.title.toString() + helmet.meta.toString();

//         const html = template
//           .replace(`<!--app-html-->`, appHtml)
//           .replace("<!--helmet-tags-->", helmetTags);

//         res.status(200).set({ "Content-Type": "text/html" }).end(html);
//       } catch (e) {
//         !isProd && vite.ssrFixStacktrace(e);
//         console.log(e.stack);
//         res.status(500).end(e.stack);
//       }
//     }
//   );

//   app.use("*", async (req, res) => {
//     try {
//       const url = req.originalUrl;

//       let template, render;
//       if (!isProd) {
//         // always read fresh template in dev
//         template = fs.readFileSync(resolve("index.html"), "utf-8");
//         template = await vite.transformIndexHtml(url, template);
//         // (await vite.ssrLoadModule("/src/App.jsx")).setup();
//         render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
//       } else {
//         template = indexProd;
//         render = require("./dist/server/entry-server.js").render;
//       }

//       const context = {};
//       const appHtml = render(url, context);

//       if (context.url) {
//         // Somewhere a `<Redirect>` was rendered
//         return res.redirect(301, context.url);
//       }

//       const helmet = Helmet.renderStatic();
//       const helmetTags = helmet.title.toString() + helmet.meta.toString();

//       const html = template
//         .replace(`<!--app-html-->`, appHtml)
//         .replace("<!--helmet-tags-->", helmetTags);

//       res.status(200).set({ "Content-Type": "text/html" }).end(html);
//     } catch (e) {
//       !isProd && vite.ssrFixStacktrace(e);
//       console.log(e.stack);
//       res.status(500).end(e.stack);
//     }
//   });

//   return { app };
// }

// if (!isTest) {
//   createServer().then(({ app }) =>
//     app.listen(PORT, () => {
//       console.log("Server Running..");
//     })
//   );
// }

// // for test use
// // exports.createServer = createServer;



// @ts-check
const fs = require("fs");
const path = require("path");
const express = require("express");
const { Helmet } = require("react-helmet");
require("dotenv").config();

const PORT = process.env.PORT;

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer(root = process.cwd()) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const app = express();

  let vite;
  if (!isProd) {
    vite = await require("vite").createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false,
      })
    );
  }

  async function handleRequest(req, res) {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = indexProd;
        render = require("./dist/server/entry-server.js").render;
      }

      const context = {};
      const appHtml = render(url, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }

      const helmet = Helmet.renderStatic();
      const helmetTags = helmet.title.toString() + helmet.meta.toString();

      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace("<!--helmet-tags-->", helmetTags);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }

  app.get("/product/:id", async (req, res, next) => {
    setTimeout(() => next(), 3000);
  }, handleRequest);

  app.use("*", handleRequest);

  return { app };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, () => {
      console.log("Server Running..");
    })
  );
}
