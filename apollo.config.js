const env = require("./src/environments/environment");
const environment = env.environment;

module.exports = {
  client: {
    service: {
      name: "Origami-frontend",
      url: environment.graphQLRoot
    }
  }
}
