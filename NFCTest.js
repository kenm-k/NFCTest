let userID;
function GetUID() {
    return userID;
}

const scan = async () => {
    try {
        const reader = new NDEFReader()
        await reader.scan()

        // Scanは起動しているが、NFCタグからデータが読み込めなかった
        reader.addEventListener('error', (event) => {
            //console.log(error)
            WriteLog("ああ、これエラーですわ");
            WriteLog(error);
            WriteP(`おっと、なにか不具合のようです：${error}`);
        })

        const readEvent = ({ serialNumber, message }) => {
            WriteLog("読み込めはしたよ");
            WriteLog(`あなたの独自UIDは、${serialNumber}`);
            WriteP(`あなたのUIDは、${serialNumber}`);
            userID = serialNumber;
            //参照処理
            Matching(userID);
        };

        // データを読み込んだ
        reader.addEventListener('reading', readEvent, { once: true })
    } catch (error) {
        // Scan起動失敗
        //console.error(error)
        WriteLog("ああ、これエラーですわ")
        WriteLog(error);
        WriteP(`おっと、なにか不具合のようです：${error}`);
    }
}

function ScanNFC() {
    WriteLog("Pushed!");
    scan();
}

function WriteLog(text) {
    let log = document.querySelector("#log");
    log.textContent += text + "\n";
}

function WriteP(text) {
    let log = document.querySelector("#plog");
    log.textContent = text;
}

function Matching(id) {
    let found = false;
    if (found) {

    }
    else {
        OpenModal();
    }
}

let vid;
let cams;

async function startCamera() {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment',

            aspectRatio: {
                exact: 1.6,
            },
        },
        audio: false,
    });
    const videoElement = document.createElement("video")
    vid = videoElement;
    videoElement.autoplay = true;
    videoElement.srcObject = cameraStream;
    document.getElementById("innerModal").append(videoElement);
    videoElement.addEventListener("resize", () => {
        const scSmaller = Math.min(window.screen.height, window.screen.width) / 1080;
        console.log(scSmaller);
        videoElement.width = videoElement.videoWidth * scSmaller;
        videoElement.height = videoElement.videoHeight * scSmaller;
    });

    cams = cameraStream;
    cameraCheckStart();
}

function cameraStop() {
    vid.remove();
    cams.getTracks()[0].stop();
}

let cameraChecking;

async function cameraCheckStart() {
    if (!("BarcodeDetector" in window)) {
        alert("Barcode Detector はこのブラウザーでは対応していません。"); return;
    } else {
        console.log("Barcode Detector に対応しています。");
    }

    const detector = new BarcodeDetector();

    cameraChecking = setInterval(async () => {
        const detectionList = await detector.detect(vid);

        for (const detected of detectionList) {
            if (confirm(`${detected.rawValue}でお間違いないですか?`)) {
                //処理
                CloseModal();
                return;
            }
            else {
                continue;
            }
        }
    }, 500);
}

function OpenModal() {
    let open = document.getElementById("modal-2__open");
    open.checked = true;
    startCamera();
}

function CloseModal() {
    let open = document.getElementById("modal-2__open");
    open.checked = false;
    cameraStop();
}