module.exports = {
  apps : [{
      name: "website",
      script: "./bin/www",
      watch: false,
      instance_var: "INSTANCE_ID",
      log_file: __dirname + "/log/log.log",
      out_file: __dirname + "/log/output.log",
      error_file: "/log/error.log",
      env_production: {
        NODE_ENV: "production",
      }
   }]
}