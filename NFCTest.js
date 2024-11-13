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

        // データを読み込んだ
        reader.addEventListener('reading', ({ serialNumber, message }) => {
            WriteLog("読み込めはしたよ");
            WriteLog(`あなたの独自UIDは、${serialNumber}`);
            WriteP(`あなたのUIDは、${serialNumber}`);
            userID = serialNumber;
            //参照処理
            Matching(userID);
        })
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
        videoElement.width = videoElement.videoWidth;
        videoElement.height = videoElement.videoHeight;
    });

    cams = cameraStream;
}

function cameraStop() {
    vid.remove();
    cams.getTracks()[0].stop();
}

async function cameraPause() {
    if (!("BarcodeDetector" in window)) {
        alert("Barcode Detector はこのブラウザーでは対応していません。"); return;
    } else {
        console.log("Barcode Detector に対応しています。");
    }

    vid.pause();
    const detector = new BarcodeDetector();
    const detectionList = await detector.detect(vid);
    console.log(detectionList);

    if (!confirm(`${detectionList[0].rawValue}でお間違いないですか?`)) {
        cameraStop();
        startCamera();
        return;
    }
}

function OpenModal() {
    let open = document.getElementById("modal-2__open");
    open.checked = true;
    startCamera();
}