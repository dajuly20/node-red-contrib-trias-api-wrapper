module.exports = function (RED) {

  const trias = require("trias-client");

  function TriasSearchStops(config) {
    try {
      
      const functions = {};
      module.exports = functions;
      RED.nodes.createNode(this, config);
      this.server = RED.nodes.getNode(config.server);
      this.con = RED.nodes.getNode(config.con);

      if(!this.con){
        this.error("No configuration node found");
        node.send(null);
        return;
      }

      var node = this;
      node.on("input", async function (msg) {
        const node = this;
        const payload = msg.payload;
        const propSearchString = config.searchstring.replace(/ /g, "");
        const usedSearchString = propSearchString != "" ?  propSearchString :  msg.payload; 

        try { 
          var client = trias.getClient({
            url: this.con.endpointuri,
            requestorRef: this.con.requestorref,
          });
          
          var stopsResult = await client.getStops({
              name: usedSearchString
          });
              
          const debug = msg.debug ? {
            con: this.con,
            config,
            requestorref: this.con.requestorref,
            endpointuri: this.con.endpointuri,
            oldPayload: payload,
          } : null;


          const stopPoints = stopsResult.stops;
          const success = stopsResult.success;

          const fill = (stopsResult.stops.length == 0) ? "red" : "green";
          this.status({fill,shape:"ring", text: stopsResult.stops.length + " stops found"});

          node.send({
            ...msg,  
            payload: stopPoints,
            success,
            usedSearchString,
            debug});

      } catch (e) {
        this.status({fill: "red", shape:"ring", text: e});
        node.error(`Trias `+ e);
      }

      });
    } catch (e) {
      node.error(`Trias Error: `+ e );
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
