const { promises: fs } = require("fs");
const webmToMp4 = require("webm-to-mp4");

const webmToMp4Function = async () => {
    await fs.writeFile("ParticlesSpanish01.mp4", Buffer.from(webmToMp4(await fs.readFile("ParticlesSpanish01.webm"))));
}

webmToMp4Function();