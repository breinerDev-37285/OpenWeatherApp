// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "openweather-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "personal",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("openweather-app", {
      domain: {
        name: "openweather-app.breinerdev.com",
        dns: false,
        cert: "arn:aws:acm:us-east-1:571600865189:certificate/17ee5da9-f04d-4dec-b23f-100b4e0421c4",
      },
      imageOptimization: {
        memory: "512 MB",
      },
    });
  },
});
