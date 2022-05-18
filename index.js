const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/user');

// application/x-www-form-urlencoded를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));
// application/json을 오는 데이터를 분석해서 가져오기 위해...
app.use(bodyParser.json());

// DB 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology:true, 
    // useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err))


app.get('/', (req, res) => {
  res.send('Hi! Daniel ~~~');
});

app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 database에 넣어 준다.
  const user = new User(req.body);

  // console.log("user: ",user);

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ 
      success: true,
      message: `Success to create ${user.name}`
    });
  });

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});