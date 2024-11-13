const scan = async () => {
    try {
        const reader = new NDEFReader()
        await reader.scan()

        // Scanは起動しているが、NFCタグからデータが読み込めなかった
        reader.addEventListener('error', (event) => {
            //console.log(error)
            WriteLog("ああ、これエラーですわ");
            WriteLog(error);
        })

        // データを読み込んだ
        reader.addEventListener('reading', ({ serialNumber, message }) => {
            const record = message.records[0];
            WriteLog("読み込めはしたよ");
            console.log(record.data);
        })
    } catch (error) {
        // Scan起動失敗
        //console.error(error)
        WriteLog("ああ、これエラーですわ")
        WriteLog(error);
    }
}

function ScanNFC()
{
    WriteLog("Pushed!");
    scan();
}

function WriteLog(text)
{
    let log = document.querySelector("#log");
    log.textContent += text + "\n";
}