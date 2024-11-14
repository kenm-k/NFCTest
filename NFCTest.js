import {app} from "./firebaseApp.js"
import { getFirestore, doc, updateDoc, setDoc, getDoc, query, where, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

const COLLECTION = "users";

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
            WriteP(`おっと、なにか不具合のようです：\n${error}`);
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
        WriteP(`おっと、なにか不具合のようです：\n${error}`);
    }
}

window.ScanNFC = () => {
    WriteLog("Pushed!");
    scan();
}

window.WriteLog = (text) => {
    let log = document.querySelector("#log");
    log.textContent += text + "\n";
}

window.WriteP = (text) => {
    let log = document.querySelector("#plog");
    log.textContent = text;
}

async function Matching(id) {
    WriteP("参照中...");
    var db = getFirestore(app);
    var userRef = collection(db, COLLECTION);
    const q = query(userRef, where("UID", "==", id));

    const querySnap = await getDocs(q);

    let tempDoc = querySnap[0];

    querySnap.forEach(doc => {
        tempDoc = doc;
    });

    if (tempDoc.exists()) {
        WriteP(`あなたの学籍番号：${tempDoc.data().studentID}`);
    }
    else {
        WriteP("見つかりませんでした、登録してください!");
        OpenModal();
    }
}

let vid;
let cams;

window.startCamera = () => startCamera();

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

window.cameraStop = () => {
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
                db_save("users", detected.rawValue, GetUID(), detected.rawValue);

                CloseModal();
                WriteP("送信完了しました!");
                return;
            }
            else
            {
                continue;
            }
        }
    }, 500);
}

window.OpenModal = () => {
    let open = document.getElementById("modal-2__open");
    open.checked = true;
    startCamera();
}

window.CloseModal = () => {
    let open = document.getElementById("modal-2__open");
    open.checked = false;
    cameraStop();
}

window.db_save = (collection, document, UID, studentID) => {
    db_save(collection, document, UID, studentID);
}

async function db_save(collection,document,UID,studentID) {
    var db = getFirestore(app);
    var userRef = doc(db, collection, document);
    await setDoc(userRef, {
        UID: UID,
        studentID: studentID
    });
}

async function db_get(collection, document)
{
    var db = getFirestore(app);
    var userRef = doc(db, collection, document);
    const docSnap = await getDoc(userRef);

    console.log("document data : ", docSnap.data());
}

window.db_get = (collection, document) => {
    db_get(collection, document);
}