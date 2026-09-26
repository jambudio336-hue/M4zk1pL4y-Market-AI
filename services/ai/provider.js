export class AIProvider {

  constructor(config = {}) {
    this.name =
      config.name ||
      "unknown";

    this.baseUrl =
      config.baseUrl ||
      null;

    this.model =
      config.model ||
      null;
  }


  async generate() {

    throw new Error(
      "AIProvider.generate() must be implemented"
    );

  }

}
