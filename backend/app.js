// const express = require('express');
// const cors = require('cors');
// const app = express();
// const fs = require('fs')

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // CORSでhttp://localhost:8080からのリクエストを許可
// app.use(cors({
//   origin: 'http://localhost:8080',
//   credentials: true
// }));

// // POSTメソッドでフォームの値を受け取る
// app.post('/api/port/save', (req, res) => {
//     try{
//         fs.readFile('ports.json', 'utf8', (err, data) => {
//             //エラーが出た場合returnする。
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             // ファイルをJSONパースして配列に変換する
//             let arr = JSON.parse(data);
//             // 新しいオブジェクトを作成して配列に追加する
//             arr.push({ 
//               PortName: req.body.name, 
//               PortUrl: req.body.PortUrl, 
//               PortContent: req.body.PortContent,
//               UseLanguage: req.body.UseLanguage,
//               UseFramework: req.body.UseFramework,
//             });
//             console.log("fdoskfdso")
//             // 配列をJSON文字列に変換する
//             let newData = JSON.stringify(arr);
//             // writeFileメソッドで、JSONファイルに送られてきたデータを追加する。
//             fs.writeFile('info.json', newData, 'utf8', (err) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }
//                 console.log('JSONデータを追加！');
//             });
//         });
//     }catch(e){
//         console.log("error")
//     }
// });
// // 3000番ポートでサーバーを起動できるようにする。
// app.listen(3000, () => console.log('Server running on port 3000'));



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

// POSTメソッドでフォームの値を受け取る
app.post('/api/port/save', (req, res) => {
    try{
        fs.readFile('ports.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // ファイルをJSONパースして配列に変換する
            let arr = JSON.parse(data);
            
            // 新しいオブジェクトを作成して配列に追加する
            arr.push({ 
              PortName: req.body.PortName, 
              PortUrl: req.body.PortUrl, 
              PortContent: req.body.PortContent
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
    }catch(e){
        console.log("error")
    }
});
// 3000番ポートでサーバーを起動できるようにする。
app.listen(3000, () => console.log('Server running on port 3000'));
