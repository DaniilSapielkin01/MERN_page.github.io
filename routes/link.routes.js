const { Router, request } = require("express");
const router = Router();
const config = require("config")
const shortId= require("shortid")

const Link = require("../models/Link");
const auth = require('../middleware/auth.middleware')

//обработка запросов
//обрабатываем ссылку generate
router.post("/generate", auth, async (req, res) => {
  try {
   const baseUrl = config.get("baseUrl")
   const {from} = req.body  
             const code = shortId.generate()
  //смотрим есть ли такая ссылка уже в базе , и по этому нет смысла что-то формировать, и мы берем и отправляем её 
   const existing =  await Link.findOne({from})
    if(existing) {
      return res.json({link:existing})
    }
    //формировка той сокращенной ссылки
    const to = baseUrl + "/t/"+ code
    const link = new Link({ 
      code, to ,from, owner: req.user.userId
    })
    await link.save()
    res.status(201).json({link})

  } catch (e) {
    res
      .status(500)
      .json({ message: "Чтo-то пошло не так попробуйте снова ..." });
  }
});

//получение всех ссылок
router.get("/", auth , async (req, res) => {
  try {
      const links = await Link.find({owner: req.user.userId})
    res.json(links)

  } catch (e) {
    res
      .status(500)
      .json({ message: "Чтo-то пошло не так попробуйте снова ..." });
  }
});

router.get("/:id",auth, (req, res) => {
  try {
    const link = await Link.findById(request.params.id)
    res.json(link)

  } catch (e) {
    res
      .status(500)
      .json({ message: "Чтo-то пошло не так попробуйте снова ..." });
  }
});

module.exports = router;
