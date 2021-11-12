import express, { Request, Response, NextFunction} from 'express'

export const badRequest = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.errorsList)
  if (err.status === 400) {
    res.status(400).send({ message: err.errorsList })
  } else {
    next(err)
  }
}

export const unauthorized = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 401) {
    res
      .status(401)
      .send({
        status: "error",
        message: err.message || "You are not logged in!",
      });
  } else {
    next(err);
  }
};

export const forbidden = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 403) {
    res
      .status(403)
      .send({
        status: "error",
        message: err.message || "You are not allowed to do that!",
      });
  } else {
    next(err);
  }
};

export const notFound = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if(err.status === 404){
      res.status(404).send({err: err.message || "Not Found!"})
  } else {
      next(err)
  }
}

export const serverError = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ status: "error", message: "Generic Server Error" });
};
