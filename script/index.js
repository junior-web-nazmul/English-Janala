//
const loadLesson = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const res = await fetch(url);
  const data = await res.json();
  displayLesson(data.data);
};
const displayLesson = (lessons) => {
  const lessonBtnContainer = document.getElementById("lesson-btn-container");
  lessonBtnContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
        <button onclick="" class="btn btn-outline btn-primary">Lesson-${lesson.level_no}</button>
    `;
    lessonBtnContainer.append(lessonBtn);
  });
};

loadLesson();
