const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");

// Custom middleware
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const verifyToken = require("../middleware/authentication");
const logger = require("../middleware/winston");
const notFound = require("../middleware/notFound");
const validator = require("../middleware/validator");

// Routers
const todoRouter = require("../routes/todo.routes");
const messageRouter = require("../routes/message.routes");
const userRouter = require("../routes/user.routes");
const movieRouter = require("../routes/movie.routes");
const ratingRoutes = require("../routes/rating.routes");
const commentsRoutes = require("../routes/comments.routes");

// PostgreSQL connection test
const pool = require("./database/db_connect");
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    logger.error("Database connection failed:", err);
  } else {
    logger.info("Database connected successfully");
  }
});

const registerCoreMiddleware = () => {
  try {
    app.use(
      session({
        secret: "1234",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      })
    );

    app.use(morgan("combined", { stream: logger.stream }));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use(validator);

    app.use("/todos", todoRouter);
    app.use("/messages", verifyToken, messageRouter);
    app.use("/users", userRouter);
    app.use("/movies", movieRouter);
    app.use("/ratings", ratingRoutes);
    app.use("/comments", commentsRoutes);

    // 404 handling
    app.use(notFound);

    logger.info("Done registering all middlewares");
  } catch (error) {
    logger.error(
      "Error thrown while executing registerCoreMiddleware" +
        JSON.stringify(error, undefined, 2)
    );
  }
};

// handling uncaught exceptions
const handleError = () => {
  // 'process' is a built in object in NodeJS
  // if uncaught exception, then execute this
  // note that we can catch uncaught exceptions from the process object
  process.on("uncaughtException", (err) => {
    logger.error(`UNCAUGHT_EXCEPTION OCCURED : ${JSON.stringify(err.stack)}`);
  });
};

const startApp = () => {
  try {
    // register core application level middlewared
    registerCoreMiddleware();

    app.listen(PORT, () => {
      logger.info(`Server running on PORT: ${PORT}`);
    });

    handleError();
  } catch (error) {
    logger.error(
      `startup :: Error while booting the application ${JSON.stringify(
        error,
        undefined,
        2
      )}`
    );
    throw error;
  }
};

module.exports = { startApp };
