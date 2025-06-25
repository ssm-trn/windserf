class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.isWorking = true;
        this.isRunning = false;
        this.timer = null;
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.statusElement = document.getElementById('status');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => {
            this.workTime = parseInt(this.workTimeInput.value) * 60;
            if (!this.isRunning) {
                this.updateDisplay();
            }
        });
        this.breakTimeInput.addEventListener('change', () => {
            this.breakTime = parseInt(this.breakTimeInput.value) * 60;
            if (!this.isRunning && !this.isWorking) {
                this.updateDisplay();
            }
        });
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = '停止';
        this.startBtn.style.backgroundColor = '#f44336';

        this.timer = setInterval(() => {
            if (this.isWorking) {
                if (this.workTime > 0) {
                    this.workTime--;
                    this.updateDisplay();
                } else {
                    this.isWorking = false;
                    this.statusElement.textContent = '休憩中';
                    this.updateDisplay();
                }
            } else {
                if (this.breakTime > 0) {
                    this.breakTime--;
                    this.updateDisplay();
                } else {
                    this.isWorking = true;
                    this.workTime = parseInt(this.workTimeInput.value) * 60;
                    this.breakTime = parseInt(this.breakTimeInput.value) * 60;
                    this.statusElement.textContent = '作業中';
                    this.updateDisplay();
                }
            }
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startBtn.textContent = '開始';
        this.startBtn.style.backgroundColor = '#4CAF50';
        clearInterval(this.timer);
    }

    resetTimer() {
        this.stopTimer();
        this.workTime = parseInt(this.workTimeInput.value) * 60;
        this.breakTime = parseInt(this.breakTimeInput.value) * 60;
        this.isWorking = true;
        this.statusElement.textContent = '作業中';
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.isWorking ? this.workTime / 60 : this.breakTime / 60);
        const seconds = this.isWorking ? this.workTime % 60 : this.breakTime % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// タイマーの初期化
const pomodoroTimer = new PomodoroTimer();
