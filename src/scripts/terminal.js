function Terminal() {
    let cmdLine;
    let output;
    let prompt;
    let history = [];
    let historyPos = 0;
    let terminalHeight = 10;

    function init() {
        cmdLine = document.querySelector(".input");
        prompt = document.querySelector(".prompt");
        output = document.querySelector("output");

        setPrompt("[user@host] > ");
        cmdLine.addEventListener("keydown", processCommand);
        cmdLine.addEventListener("keydown", navigateHistory);
    }

    function processCommand(e) {
        if (e.keyCode == 13 && this.value && this.value.trim()) {
            let cmd = this.value.trim();
            this.value = "";

            if (history.length == 0 || history[history.length - 1] != cmd) {
                history[history.length] = cmd;
                historyPos = history.length;
            }

            output.insertAdjacentHTML("beforeEnd", "<p>" + cmd + "</p>");
            if (output.children.length > terminalHeight) {
                output.children[0].remove();
            }
            console.log(history);
        }
    }

    function navigateHistory(e) {
        if (history.length && (e.keyCode == 38 || e.keyCode == 40)) {
            if (e.keyCode == 38) {
                historyPos--;
                if (historyPos < 0) {
                    historyPos = 0;
                }
            }
            else if (e.keyCode == 40) {
                historyPos++;
                if (historyPos >= history.length) {
                    historyPos = history.length - 1;
                }
            }

            this.value = history[historyPos];
        }
    }

    function setPrompt(value) {
        prompt.textContent = value;
        console.log("set")
    }

    init();
}

terminal = new Terminal();