const router = require("express").Router();
const cloudinary = require("cloudinary");
const { register, login } = require("../services/authService");

router.post("/register", async (req, res) => {
  const data = req.body;
  const { avatarImg } = req.body;
  try {
    if (avatarImg) {
      const upload = await cloudinary.v2.uploader.upload(avatarImg, {
        fetch_format: "auto",
        folder: "SalesIT",
      });
      data.avatarImg = upload.url;
      data.imageId = upload.public_id;
    }
    const user = await register(data);
    res.cookie("auth", user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    res.cookie("auth", user.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/get-user', async (req, res) => {
  const cookie = req.cookies?.auth;
  if(cookie){
    let user = req.user;
    res.send(user)
  }
})
router.get("/logout", async (req, res) => {
  res.clearCookie("auth");
  // res.cookie("auth", 'none', { httpOnly: true, sameSite: 'none' , secure: true});
  res.send({ message: "Cookie cleared successfully" });

  // -- Clearing token from local storage
  // let token = req.user.token;
  // await logout(token)
});
module.exports = router;
