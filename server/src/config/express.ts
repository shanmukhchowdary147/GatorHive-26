import express, { NextFunction, Response, Request, Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { router } from "../api/routes";
import expressContext from "express-request-context";

// export const app = express();

class App {
  isInitialized!: boolean;
  app: Express;
  constructor() {
    this.app = express();
  }

  configureApp() {
    this.isInitialized = false;

    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
    this.app.use(expressContext());
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use("/", router);

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        next(err);
      }
    );
    this.isInitialized = true;
  }
  start() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

export const expressApp = new App();
