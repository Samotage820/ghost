let _cmdLine;
let _output;
let _prompt;
let _responses;
const _maxLines = 10;

function init() {

    _cmdLine = document.querySelector(".input");
    _prompt = document.querySelector(".prompt");
    _output = document.querySelector("output");

    terminal = new Terminal();
    setPrompt("[user@host] > ");
}

function setPrompt(value) {
    _prompt.textContent = value;
    console.log("set prompt: " + value);
}

function output(message) {
    _output.insertAdjacentHTML("beforeEnd", "<p>" + message + "</p>");
    if (_output.children.length > _maxLines) {
        _output.children[0].remove();
    }
}

function runCommand(fullCmd) {
    const cmd = fullCmd[0];
    const args = fullCmd.slice(1);
    if (commands[cmd]) {
        console.log("recognized command: " + fullCmd.join(" "));
        return commands[cmd](args);
    }
    else {
        for (let [id, info] of Object.entries(responses)) {
            for (let call of info.calls) {
                if (fullCmd == call) {
                    const i = Math.floor(Math.random() * (info.responses.length));
                    output(info.responses[i]);
                }
            }
        }
    }
    console.log("unrecognized command: " + args.join(" "));
}

commands = {
    echo(args) {
        output(args.join(" "));
    }
}

init();