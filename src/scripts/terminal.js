function Terminal() {
    let cmdLine;
    let output;
    let prompt;
    let terminalHeight = 10;

    function init() {
        cmdLine = document.querySelector(".input");
        prompt = document.querySelector(".prompt");
        output = document.querySelector("output");

        setPrompt("[user@host] > ");
        cmdLine.addEventListener("keydown", processCommand);
    }

    function processCommand(e) {
        if (e.keyCode == 13 && this.value && this.value.trim) {
            let cmd = this.value.trim();
            this.value = "";

            output.insertAdjacentHTML("beforeEnd", "<p>" + cmd + "</p>");
            if (output.children.length > terminalHeight) {
                output.children[0].remove();
            }
        }
    }

    function setPrompt(value) {
        prompt.textContent = value;
        console.log("set")
    }

    init();
}

terminal = new Terminal();