async function fetchUserData() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    console.warn("Токен доступа не найден в localStorage.");
    document.getElementById("user-name").textContent = "Требуется авторизация";
    return;
  }

  try {
    const response = await fetch("http://158.160.187.238:8206/user/get_me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.name)
    document.getElementById("user-name").textContent = data.name;

  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    document.getElementById("user-name").textContent = "Ошибка загрузки имени";
  }
}

  async function fetchUserProjects() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.warn("Токен доступа не найден в localStorage.");
      return;
    }

    const offset = 0;
    const limit = 8;
    const sortField = "created_at";

    const url = `http://158.160.187.238:8206/projects/user_projects?offset=${offset}&limit=${limit}&sort[field]=${sortField}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      displayProjects(data.projects);

    } catch (error) {
      console.error("Ошибка при получении проектов:", error);
      const rightSidebar = document.querySelector('.right-sidebar');
      rightSidebar.innerHTML = "Ошибка загрузки проектов";
    }
  }

  function displayProjects(projects) {
    const rightSidebar = document.querySelector('.right-sidebar');
    rightSidebar.innerHTML = "";

    if (projects.length === 0) {
      const noProjectsDiv = document.createElement("div");
      noProjectsDiv.classList.add("right-project-item");
      noProjectsDiv.textContent = "Нет проектов";
      rightSidebar.appendChild(noProjectsDiv);
    } else {
      projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("right-project-item");
        projectDiv.textContent = project.project_name; // Используем имя проекта из данных
        project.project_name; // Используем имя проекта из данных
        rightSidebar.appendChild(projectDiv);
      });
    }
  }