const router = require("express").Router();
const {
  models: { Category },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

// ALL ROUNTES MOUNTED ON /api/category

router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Category.getAll();
    res.send(allCategories);
  } catch (error) {
    next(error);
  }
});

router.post("/:name", requireToken, isAdmin, async (req, res, next) => {
  try {
    const newCategory = await Category.addCategory(req.params.name);
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
});

router.delete("/:name", requireToken, isAdmin, async (req, res, next) => {
  try {
    await Category.removeCategory(req.params.name);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
