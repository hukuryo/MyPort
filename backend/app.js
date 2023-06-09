const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { error } = require('console');

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
    const dataJSON = bufferData.toString();
    //JSONのデータをJavascriptのオブジェクトに
    const data = JSON.parse(dataJSON);
    res.send(data);
  } catch(e) {
    console.log("JSONデータなし");
  }
});

app.get('/api/user/detail/get', (req, res) => {
  try {
    //データを取りだす
    const bufferData = fs.readFileSync('users.json');
    // データを文字列に変換
    const dataJSON = bufferData.toString();
    //JSONのデータをJavascriptのオブジェクトに
    const data = JSON.parse(dataJSON);
    res.send(data);
  } catch(e) {
    console.log("JSONデータなし");
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
          const requestBodyData = req.body;
          // ファイルをJSONパースして配列に変換する
          let arr = JSON.parse(data);
          // 新しいオブジェクトを作成して配列に追加する
          console.log(requestBodyData.postUserId)
          arr.push({
            id: arrayLength + 1,
            postUserId: requestBodyData.postUserId,
            ClipUserName: requestBodyData.ClipUserName,
            PortName: requestBodyData.PortName,
            PortUrl: requestBodyData.PortUrl,
            PortContent: requestBodyData.PortContent,
          });
          // 配列をJSON文字列に変換する
          let newData = JSON.stringify(arr, null, '\t');
          // writeFileメソッドで、JSONファイルに送られてきたデータを追加する。
          fs.writeFile('ports.json', newData, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      })
  } catch(e) {
    console.log("error")
  }
});


// ポートフォリオ編集
app.put('/api/port/edit', (req, res) => {
  try{
      const bufferData = fs.readFileSync('ports.json');
      let data = JSON.parse(bufferData);
      const editData = data[req.body.id - 1];
      editData.postUserId = editData.postUserId;
      editData.PortName = req.body.PortName;
      editData.PortUrl = req.body.PortUrl;
      editData.PortContent = req.body.PortContent;
      const updatedJsonData = JSON.stringify(data, null, '\t');
      fs.writeFileSync('ports.json', updatedJsonData);
  }catch(e){
      console.log(e);
  }
});

// ポートフォリオ削除
app.delete('/api/port/delete', (req, res) => {
  const bufferData = fs.readFileSync('ports.json');
  const portData = JSON.parse(bufferData);
  const deleteIndex = portData.findIndex(port => port.id === req.body.id);
  portData.splice(deleteIndex, 1);
  fs.writeFileSync('ports.json', JSON.stringify(bufferData));
})


// ユーザー認証API
async function initializeUsers(username, pass) {
  try {
      const data = await fs.promises.writeFile('users.json', `[{"id":1,"username":"${username}","pass":"${pass}"}]`, 'utf8');
      return data;
  } catch (error) {
      console.error(error);
  }
}

// プロフィール情報保存
app.post('/api/user/profile/save', (req, res) => {
  const bufferData = fs.readFileSync('users.json');
  let data = JSON.parse(bufferData, null, '\t');
  const reqData = req.body;
  fs.writeFile('profile.json',arr ,'utf8');
})

// プロフィール編集
app.put('/api/user/profile/edit', (req, res) => {
  fs.readFile('users.json', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      const jsonData = JSON.parse(data);
      const updatedData = {
          username: req.body.username,
          skill: req.body.skill,
          framework: req.body.framework,
          github: req.body.github,
          qiita: req.body.qiita,
          lapras: req.body.lapras,
          twitter: req.body.twitter
      };

      Object.assign(jsonData, updatedData);

      const updatedJsonData = JSON.stringify(jsonData, null, '\t');
      fs.writeFile('users.json', updatedJsonData, (err) => {
          if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
              return;
          }

          res.status(200).send('Profile updated successfully');
      });
  });
});

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
          const date = req.body
          // ファイルをJSONパースして配列に変換する
          let arr = JSON.parse(data, null, '\t');
          // 新しいオブジェクトを作成して配列に追加する
          arr.push({
            id: usersArrayLength + 1,
            username: date.username,
            pass: date.pass,
            skill: date.skill,
            framework: date.framework,
            github: date.github,
            qiita: date.qiita,
            lapras: date.lapras,
            twitter: date.twitter
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
    const showData = JSON.parse(userDataJSON);
    //ユーザーを一人ずつ取り出して、入力された内容と比較する。   
    for (let i = 0; i < showData.length; i++) {
      if (showData[i].username === getData.username && showData[i].pass === getData.pass) {
        // フロント側に成功メッセージを送る
        return res.status(200).send(showData[i]);
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
app.listen(3000, () => console.log('3000番ポートで起動'));