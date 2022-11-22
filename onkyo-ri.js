module.exports = function (RED) {
	function OnkyoRi(config) {
		const { exec } = require("child_process");
		RED.nodes.createNode(this, config);
		var node = this;
		node.on('input', function (msg) {
			//RED.settings.sampleNodeColour
			
			const payload = msg.payload; // TODO put field for that as well
			const path = config.path;			
			const nodeRedDir = RED.settings.userDir || process.env.NODE_RED_HOME || path.resolve(".");
			const completePath = `${nodeRedDir}/node_modules/node-red-contrib-onkyo-ri/Onkyo-RI-Rasperrypi/onkyoricli -p 24 -c ${payload}`;
			console.log
			
			node.warn("Dir: "+nodeRedDir);//${config.gpioPin}
			node.warn("Complete: "+completePath);
			const command = `pwd`
			//var path = require('path');
			//userdir = path.resolve(process.execPath,'..');
			//node.warn(userdir);
			// && ../node_modules/Onkyo-RI-Rasperrypi/onkyoricli -p 24 -c ${payload}`;
			node.warn("HERE WE R"+command)
			exec(completePath, (error, stdout, stderr) => {
				if (error) {
					node.warn(`error: ${error.message}`);
					return;
				} 
				if (stderr) {
					node.warn(`stderr: ${stderr}`);

					return;
				}
			
				node.warn(`stdout: ${stdout}`);

				node.send(command+" ...aha:"+stdout);
			});

			
			
		});
	}
	RED.nodes.registerType("onkyo-ri", OnkyoRi, {
		
		settings: {
			path: {
				value: "~/onkyo-rpi/onkyo-rpi/",
				exportable: true
			},
			gpioPin: {
				value: "25",
				exportable: true
			},
			logging: {
				// Console logging
				console: {
					level: "info",
					metrics: false,
					audit: false
				}
			}
		}
	});
}
