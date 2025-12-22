import axios from "axios";

export async function recaptchaMiddleware(req, res, next) {
  console.log("recaptcha middleware hit");
  const { data } = req.body;
  const { token } = data;
  // console.log(token)

  if (!token) {
    // console.log(req.body)
    // console.log('token below')
    // console.log(req.body.token)
    console.log("no token gotten from this request");
    return res.status(400).send({ message: "Captcha token is missing" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},

      {
        params: {
          secret: process.env.CAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    // console.log(response.data);

    if (!response.data.success) {
      return res
        .status(403)
        .send({ message: "Captcha verification failed. Try again later" });
    }

    req.token = "";
    next();
    // res.send({ message: "captcha verification succeeded" });
  } catch (error) {
    console.error("Captcha verification error:", error);
    return res
      .status(500)
      .json({ message: "Server error during captcha verification" });
  }
}
