module.exports = function(RED) {
    function TriasDepatures(config) {


        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function(msg) {
            //const select= $("#node-input-device");    
            //node.error("HalloIchBinFehler... "+select);
            msg.topic = config.device ?? "-1";
            msg.payload = "HALLOOOOOO!!!!";
            node.send(msg);
        });
    }
    RED.nodes.registerType("trias-departures",TriasDepatures);


    
}


