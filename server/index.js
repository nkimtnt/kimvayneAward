// 김베인 어워드 서버
// 김베인이 1년간 오프라인 만남을 가진 사람들에게 주는 상
// 한번 만날 떄마다 큐알코드를 사용하여 웹에 접속한 후 Oauth를 통하여 가입
// 이미지, 장소, 시간, 이름 등을 기록
// 매년 12월 30일에 총 결산 진행
// 가장 많이 만난 사람 1,2,3위에게 선물 증정

// 필요한 것
// 물터 구글Oauth mySql
// api
// user, image, QR code,
// 게시판 사용할건가?
// 쪽지 기능?
// 구글 맵 api
// 웹소켓 채팅기능?
// 다른 것은 뭐가 있을까나~

// 클라이언트 사이드
// remix라든가 써보고 싶긴한데 일단 js로 만들고 typescript 부터 해보고 그 담에 리믹스를 쓰든 넥스트js를 쓰던 넉스트를 쓰던

// 2022.02.26 추가해야할 것들을 살펴보자
// 패키지점제이슨
// 클라이언트사이드 어떻게??

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const fs = require("fs");

const DB = require("./config/config");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const mailRouter = require("./routes/mail");
const mapRouter = require("./routes/map");
const imageRouter = require("./routes/image");

//use modules
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
// DB();
app.get("/", (req, res) => {
  res.status(200).send("hello world....!!");
});

//routes

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/comment", commentRouter);
app.use("/mail", mailRouter);
app.use("/map", mapRouter);
app.use("/image", imageRouter);

// app.post("/images", controller.imageControl);

//server
const HTTPS_PORT = 8080;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(` 🚀 Server is starting on ${HTTPS_PORT}`)
  );
  //인증서 없는경우
} else {
  app.listen(HTTPS_PORT, () => {
    console.log(`      🚀 Server is starting on ${HTTPS_PORT}`);
  });
}

module.exports = app;
