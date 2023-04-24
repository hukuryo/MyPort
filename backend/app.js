const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORSでhttp://localhost:8080からのリクエストを許可
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// データの長さを取得する関数
function getArrayLength() {
  return new Promise((resolve, reject) => {
    fs.readFile('ports.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      // ファイルをJSONパースして配列に変換する
      const arr = JSON.parse(data);
      // 配列の長さを返す
      resolve(arr.length);
    });
  });
}

app.get('/api/port/get', (req, res) => {
  try {
    //データを取りだす
    const bufferData = fs.readFileSync('ports.json')
    // データを文字列に変換
    const dataJSON = bufferData.toString()
    //JSONのデータをJavascriptのオブジェクトに
    const data = JSON.parse(dataJSON)
    res.send(data)
  } catch(e) {
    console.log("JSONデータなし")
  }
});

// POSTメソッドでフォームの値を受け取る
app.post('/api/port/save', (req, res) => {
  try {
    getArrayLength()
      .then((arrayLength) => {
        fs.readFile('ports.json', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          // ファイルをJSONパースして配列に変換する
          let arr = JSON.parse(data);
          console.log(arr)
          // 新しいオブジェクトを作成して配列に追加する
          arr.push({
            id: arrayLength + 1,
            PortName: req.body.PortName,
            PortUrl: req.body.PortUrl,
            PortContent: req.body.PortContent,
          });
          // 配列をJSON文字列に変換する
          let newData = JSON.stringify(arr);
          // writeFileメソッドで、JSONファイルに送られてきたデータを追加する。
          fs.writeFile('ports.json', newData, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('JSONデータを追加！');
          });
        });
      })
  } catch(e) {
    console.log("error")
  }
});

// 3000番ポートでサーバーを起動できるようにする。
app.listen(3000, () => console.log('Server running on port 3000'));