(async () => {
  const express = require("express");

  const port = 3000;
  const app = express();

  app.use(express.json({ extended: true }));

  const responseHandler = (message = "", success = false, data = {}) => ({
    message,
    success,
    data,
  });
  app.get("/", (req, res) =>
    res.json({ message: "application up and running" })
  );

  app.post("/users/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "test@gmail.com" && password === "qwerty") {
      return res.json(responseHandler('user login success',true,{ token:'tes-token'}));
    }else{
        res.json(responseHandler('invalid user name or password'));
    }
  });

  app.post("/users", (req, res) => {
    res.json(responseHandler("user registration success.",true));
  });

  app.get('/users/password-reset-mail/:email',(req,res)=>{
      const {email } = req.body;
      if(email === "test@gmail.com") res.json(responseHandler("this email address not registered with us"));
      else res.json("please check your email to reset password");
  })

  app.listen(port, () => console.log("application running on " + port));
})();
