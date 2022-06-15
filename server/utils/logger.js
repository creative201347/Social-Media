import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "hostname,pid,time",
    },
  },
});

export default logger;
