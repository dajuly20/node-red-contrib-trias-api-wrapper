module.exports = function(RED) {
    function TriasConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.endpointuri = n.endpointuri;
        this.requestorref = n.requestorref;
    }
    RED.nodes.registerType("triasconfig",TriasConfigNode);
}