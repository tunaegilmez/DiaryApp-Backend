import Model from "./model.js";

const addDiary = async (title, description) => {
  return new Model.Diary({ title, description }).save();
};

const getDiaries = async (limit, skip) => {
  let diaries = await Model.Diary.find(
    {},
    {},
    { limit, skip, sort: { updatedAt: -1 } }
  );
  let count = await Model.Diary.countDocuments({});
  return { diaries, count };
};

const getDiary = async diaryId => {
  return Model.Diary.findById(diaryId);
};

const updateDiary = async (diaryId, title, description) => {
  return Model.Diary.findByIdAndUpdate(
    diaryId,
    {
      $set: { title, description },
    },
    { new: true, returnOriginal: false }
  );
};

const deleteDiary = async diaryId => {
  return Model.Diary.findByIdAndDelete(diaryId);
};

export default {
  addDiary,
  getDiaries,
  getDiary,
  updateDiary,
  deleteDiary,
};
