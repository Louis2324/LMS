export const errorHandler = (err,res,next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    if(res.headersSent) {
        return next(err);
    }
    return res.status(statusCode).json({msg:err.message || "Internal Server Error"});
};

export const notFound = (req,next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
