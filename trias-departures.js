module.exports = function (RED) {

    const trias = require("trias-client");
  
    function TriasDepartures(config) {
      try {
        const functions = {};
        module.exports = functions;
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        this.con = RED.nodes.getNode(config.con);

        if (!this.con) {
          this.error("No configuration node found");
          return;
        }

        var node = this;
        node.on("input", async function (msg) {
          const node = this;
          const payload = msg.payload;
          const propStoppointRef = config.stoppointref.replace(/ /g, "");
          const usedStopPointref =
            propStoppointRef != "" ? propStoppointRef : msg.payload;

          try {
            var client = trias.getClient({
              url: this.con.endpointuri,
              requestorRef: this.con.requestorref,
            });

            var departuresResult = await client.getDepartures({
              id: usedStopPointref,
            });

            const departures = departuresResult.departures;
            const success = departuresResult.success;
            const debug = msg.debug ? {
              con: this.con,
              config,
              requestorref: this.con.requestorref,
              endpointuri: this.con.endpointuri,
              oldPayload: payload,
            } : null;


            const fill = (departures.length == 0) ? "red" : "green";
            this.status({fill,shape:"ring", text: departures.length + " departures found" });

            node.send({
              ...msg,
              payload: departures,
              success,
              usedStopPointref,
              debug,
              
            });

          } catch (e) {
            this.status({fill: "red", shape:"ring", text: e});
            node.error(`Trias `+ e);
          }
          
        });
      } catch (e) {
        node.error(`Trias Error: `+ e );
      }
    }
  
    RED.nodes.registerType("trias-departures", TriasDepartures, {
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
        stopPointRef: {
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
  



    


    

