const router = require("express").Router();

router.post("/register", async (req, res) => {
  const data = req.body;
  const { avatarImg } = req.body;
  try {
    if (avatarImg) {
      const upload = await cloudinary.v2.uploader.upload(avatarImg, {
        fetch_format: "auto",
      });
      data.avatarImg = upload.url;
      data.imageId = upload.public_id;
    }
    const user = await register(data);
    res.cookie("auth", user.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  res.end();
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.cookie("auth", user.accessToken, { httpOnly: true, sameSite: 'none' , secure: true});
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;
