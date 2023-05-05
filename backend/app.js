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
          let newData = JSON.stringify(arr, null, '\t');
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


// メッセージ編集
app.put('/api/port/edit', (req, res) => {
  try{
      const id = req.body.id - 1;
      const bufferData = fs.readFileSync('ports.json');
      let data = JSON.parse(bufferData);
      data[id].PortName = req.body.PortName;
      data[id].PortUrl = req.body.PortUrl;
      data[id].PortContent = req.body.PortContent;
      const updatedJsonData = JSON.stringify(data);
      fs.writeFileSync('ports.json', updatedJsonData);
  }catch(e){
      console.log(e);
  }
});


// ユーザー認証API
async function initializeUsers(username, pass) {
  try {
      const data = await fs.promises.writeFile('users.json', `[{"id":1,"username":"${username}","pass":"${pass}"}]`, 'utf8');
      return data;
  } catch (error) {
      console.error(error);
  }
}

app.post('/api/user/registration', (req, res) => {
  try {
      async function getUserArrayLength() {
          try {
              const data = await fs.promises.readFile('users.json', 'utf8');
              const myData = JSON.parse(data);
              const arrayLength = myData.length;
              return arrayLength;
          } catch (error) {
              console.error(error);
              // ファイルが存在しない場合、配列を作成して、入力された内容を保存する。
              initializeUsers(req.body.username, req.body.pass);
              return 1;
          }
      }
      getUserArrayLength().then((usersArrayLength) => {
          fs.readFile('users.json', 'utf8', (err, data) => {
              if (err) {
                  console.error(err);
                  return;
              }
              // ファイルをJSONパースして配列に変換する
              let arr = JSON.parse(data);
              // 新しいオブジェクトを作成して配列に追加する
              arr.push({
                  id: usersArrayLength + 1,
                  username: req.body.username,
                  pass: req.body.pass
              });
              // 配列をJSON文字列に変換する
              let newData = JSON.stringify(arr, null, '\t');
              // ファイルに書き込む
              fs.writeFile('users.json', newData, 'utf8', (err) => {
                  if (err) {
                      console.error(err);
                      return;
                  }
              });
          });
      });
  } catch (e) {
      console.log(e);
  }
});

// ログイン認証
app.post('/api/user/login', (req, res) => {
  try {
    const userData = fs.readFileSync('users.json');
    const userDataJSON = userData.toString();
    const getData = req.body;
    const data = JSON.parse(userDataJSON);
    //ユーザーを一人ずつ取り出して、入力された内容と比較する。   
    for (let i = 0; i < data.length; i++) {
      if (data[i].username === getData.username && data[i].pass === getData.pass) {
      // フロント側に成功メッセージを送る
        return res.status(200).send('Success');
      }
    }
  //入力された内容と一致するユーザーがいなければ、失敗メッセージを返す。   
    res.status(401).send('Authentication failed');
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal server error');
  }
});


// 3000番ポートでサーバーを起動できるようにする。
app.listen(3000, () => console.log('Server running on port 3000'));