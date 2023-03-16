import Service from "./service.js";

const addDiary = async (req, res) => {
  const { title, description } = req.body;

  console.log(req.userId, "----diaries file");

  try {
    let addedDiary = await Service.addDiary(title, description);

    return res.json({ status: true, addedDiary });
  } catch (error) {
    console.log("addDiary error", error);
  }
};

const getDiaries = async (req, res) => {
  let { limit, skip } = req.query;

  limit = !limit ? 10 : limit;
  skip = !skip ? 0 : skip;
  try {
    let foundDiaries = await Service.getDiaries(limit, skip);

    return res.json({
      status: true,
      diaries: foundDiaries.diaries,
      count: foundDiaries.count,
    });
  } catch (error) {
    console.log("getDiaries error", error.message);
  }
};

const getDiary = async (req, res) => {
  let { diaryId } = req.params;

  try {
    let diary = await Service.getDiary(diaryId);

    return res.json({
      status: true,
      diary,
    });
  } catch (error) {
    console.log("getDiary error", error.message);
  }
};

const updateDiary = async (req, res) => {
  const { diaryId } = req.params;
  const { title, description } = req.body;
  try {
    let updatedDiary = await Service.updateDiary(diaryId, title, description);

    return res.json({ status: true, updatedDiary });
  } catch (error) {
    console.log("updateDiary error", error.message);
  }
};

const deleteDiary = async (req, res) => {
  const { diaryId } = req.params;

  try {
    await Service.deleteDiary(diaryId);

    return res.json({ status: true });
  } catch (error) {
    console.log("deleteDiary error", error.message);
  }
};
export default {
  addDiary,
  getDiaries,
  getDiary,
  updateDiary,
  deleteDiary,
};
