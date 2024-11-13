const scan = async () => {
    try {
        const reader = new NDEFReader()
        await reader.scan()

        // Scanは起動しているが、NFCタグからデータが読み込めなかった
        reader.addEventListener('error', (event) => {
            //console.log(error)
            WriteLog(error);
        })

        // データを読み込んだ
        reader.addEventListener('reading', ({ serialNumber, message }) => {
            const record = message.records[0]
            const { data, encoding, recordType } = record
            // recordTypeごとにdecode処理を実行する
            WriteLog(data);
        })
    } catch (error) {
        // Scan起動失敗
        //console.error(error)
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