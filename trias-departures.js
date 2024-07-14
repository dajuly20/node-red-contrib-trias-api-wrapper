module.exports = function (RED) {

    const trias = require("trias-client");
  
    function TriasDepartures(config) {
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
  
  
  
          const finalStopID = msg.payload;//config.searchstring != "" ?  config.searchstring :  msg.payload; 
  

        this.warn("finalStopID: " + finalStopID);


        var client = trias.getClient({
            url: this.con.endpointuri,
            requestorRef: this.con.requestorref
        });
        
        
        var departuresResult = await client.getDepartures({
            id: finalStopID
        });

        const dbgObj = {
          
            con: this.con, 
            config, 
            requestorref: this.con.requestorref, 
            endpointuri: this.con.endpointuri, 
            oldPayload: payload}
        
        
        //const fill = (stopsResult.stops.length == 0) ? "red" : "green";
        //this.status({fill,shape:"ring", text: stopsResult.stops.length + " stops found"});
  
  
        node.send({...msg,dbgObj, topic: finalStopID, payload: departuresResult});
          
        });
      } catch (e) {
        node.error(`Errorrrrr!!!:}`, e);
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
  



    


    

