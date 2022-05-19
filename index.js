const express = require('express');
const app = express();
// const router = express.Router();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { auth } = require('./middleware/auth');

const { User } = require('./models/user');

// application/x-www-form-urlencoded를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));
// application/json을 오는 데이터를 분석해서 가져오기 위해...
app.use(bodyParser.json());
// Cookies에 있는 정보를 분석해 준다.
app.use(cookieParser());

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

app.post('/api/users/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 database에 넣어 준다.
  const user = new User(req.body);
  // console.log("user: ",user);

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ 
      success: true,
      message: `Success to create ${userInfo.name}`
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // 1. 요청된 email을 Database에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "There is no email you are looking for."
      })
    };

    // 2. email이 같다면 password가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false, 
          message: "Something wrong!"
        })
      }

      // 3. password까지 확인이 되면, token을 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // token을 저장. 어디에 저장할지? Cookie, Session, or LocalStorage
        // token은 권한이 있는 사용자인지 아닌지를 페이지 이동 때마다 지속적으로 check한다.
        res.cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          })
      })   
    });
  });  
});

// Auth 설정 (token을 이용)
app.post('/api/users/auth', auth, (req, res) => {
  // Middleware인 auth.js에서 넘겨 준 정보를 받았다는 것은 error없이 진해이 되었다는 의미. Authentication이 true라는 말.
  // 여기에서의 req는 middleware에서 받아 온 req이다.
  // role이 0이면 일반 유저, O이 아니면 관리자
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id }, 
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({ 
        success: true 
      });
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});