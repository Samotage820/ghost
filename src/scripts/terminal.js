function Terminal() {
    let history = [];
    let historyPos = 0;

    function init() {
        _cmdLine.addEventListener("keydown", processCommand);
        _cmdLine.addEventListener("keydown", navigateHistory);
    }

    function processCommand(e) {
        if (e.keyCode != 13 || !this.value || !this.value.trim()) {
            return;
        }

        const cmd = this.value.trim();
        this.value = "";

        if (history.length == 0 || history[history.length - 1] != cmd) {
            history[history.length] = cmd;
            historyPos = history.length;
        }

        _output.insertAdjacentHTML("beforeEnd", "<p>" + _prompt.textContent + cmd + "</p>");
        if (_output.children.length > _maxLines) {
            _output.children[0].remove();
        }

        runCommand(cmd.split(" "));
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

    init();
}