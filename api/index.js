import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();

app.use(express.urlencoded({ extended: true }));

// 跨域
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello，欢迎访问liushuaiyang的网站"));

app.post("/api/sendMessage", async (req, res,next) => {
  const url =
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
  try {
    const result = await axios(url, {
      method: "POST",
      data: req.body,
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      res.json({
        code: 500,
        success: false,
        data: "error",
      });
      return;
    });
    console.log(result.data)
    if (result.data) {
      res.json({
        code: 200,
        success: true,
        data: result.data.output?.text,
      });
    } else {
      res.json({
        code: 500,
        success: false,
      });
    }
  } catch (error) {
   next()
  }
});

app.listen(3002, () => console.log("Server ready on port 3000."));

