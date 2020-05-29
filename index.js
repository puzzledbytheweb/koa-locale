const Koa = require("koa");
const Router = require("@koa/router");

const router = new Router();

const app = new Koa();

const setupRoutes = (localeConfig) => {
  // Have some check to prevent duplicate routes
  localeConfig.forEach((locale) => {
    locale.routes.forEach((route) => {
      router[route.method.toLowerCase()].apply(router, [
        route.path,
        ...route.controllers,
      ]);
    });
  });
};

const enController = (ctx, next) => {
  ctx.body = "Signup Welcome";
};

const seController = (ctx, next) => {
  ctx.body = "Registrera dig välkommen";
};

const localeConfig = [
  {
    locale: "en",
    routes: [
      {
        path: "/sign-up",
        controllers: [enController],
        method: "GET",
      },
    ],
    prefix: false,
  },
  {
    locale: "se",
    routes: [
      {
        path: "/skapa-konto",
        controllers: [seController],
        method: "GET",
      },
    ],
    prefix: false,
  },
];

setupRoutes(localeConfig);
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening...");
});
