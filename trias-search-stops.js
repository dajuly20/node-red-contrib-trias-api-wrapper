module.exports = function (RED) {

  const trias = require("trias-client");

  function TriasSearchStops(config) {
    try {
      
      const functions = {};

      module.exports = functions;
      RED.nodes.createNode(this, config);

      this.server = RED.nodes.getNode(config.server);
      this.warn(config)
      this.con = RED.nodes.getNode(config.con);

      if(!this.con){
        this.error("No configuration node found");
        node.send(null);
        return;
      }

      var node = this;
      node.on("input", async function (msg) {
        const dbg = true;
        const node = this;
        const payload = msg.payload;



        const finalSearchString = payload; // TODO: Check for override

      var client = trias.getClient({
          url: this.con.endpointuri,
          requestorRef: this.con.requestorref
      });
      
      var stopsResult = await client.getStops({
          name: finalSearchString
      });
          
      //this.status({fill:"green",shape:"ring",text:"disconnected"});
      node.send({con: this.con, config, requestorref: this.con.requestorref, endpointuri: this.con.endpointuri, oldPayload: payload, payload: stopsResult.stops});
        
      });
    } catch (e) {
      node.error(`Errorrrrr!!!:}`, e);
    }
  }

  RED.nodes.registerType("trias-search-stops", TriasSearchStops, {
    settings: {
      endpointuri: {
        value: "",
        exportable: true,
      },
      name: {
        value: "",
        exportable: true,
      },
      
      requestorref: {
        value: "",
        exportable: true,
      },
      searchstring: {
        value: "",
        exportable: true,
      },
      logging: {
        // Console logging
        console: {
          level: "info",
          metrics: false,
          audit: false,
        },
      },
    },
  });
};
