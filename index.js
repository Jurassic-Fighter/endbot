"use strict";

const EndBot = require("./src/EndBot");
const client = new EndBot();
const { Console } = require("console");

console = new (class extends Console {
	constructor() {
		super({ stdout: process.stdout, stderr: process.stderr });
	}

	log(...data) {
		let time = this.getTime();
		super.log(`\x1b[37m${time}\x1b[0m`, ...data);
	}

	error(...data) {
		let time = this.getTime();
		super.log(`\x1b[37m${time}\x1b[31m`, ...data);
	}

	warn(...data) {
		let time = this.getTime();
		super.log(`\x1b[37m${time}\x1b[33m`, ...data);
	}

	getTime() {
		let date = new Date();
		let hours = String(date.getHours()).padStart(2, "0");
		let minutes = String(date.getMinutes()).padStart(2, "0");
		let seconds = String(date.getSeconds()).padStart(2, "0");
		return `[${hours}:${minutes}:${seconds}]`
	}
});

client.init();
client.on("message", client.filterCommand);

module.export = client;
