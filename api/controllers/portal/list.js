module.exports = {

  friendlyName: 'portal list',

  description: ' Add description ',

  inputs: {
    env: {
      description: "portals tied to a environment",
      type: 'string',
      required: false
    },
    mode: {
      description: "results format: json or html",
      type: 'string',
      required: false
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'portal/list'
    },
    json: {
      responseType: '', // with return json
      statusCode: 200
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'redirect'
    }
  },

  fn: async function (inputs, exits) {

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    try {

      let portals;
      if (inputs.env) {
        portals = await Portal.find({env: inputs.env});
      }
      else {
        portals = await Portal.find();
      }
      // Display the results
      if (inputs.mode === "json") {
        // Return json
        return exits.json(portals);
      }
      else {
        // Display the welcome view.
        return exits.success({portals: portals});
      }
    }
    catch (e) {
      return exits.error(e);
    }
  }
};

