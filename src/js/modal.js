document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("create-project-modal");
    const createProjectButton = document.querySelector(".create-project-button");
    const closeModalButton = document.getElementById("close-modal");
    const submitProjectButton = document.getElementById("submit-project-button");
    const projectNameInput = document.getElementById("project-name-input");
  
    // Открываем модальное окно при нажатии на кнопку
    createProjectButton.onclick = function() {
      modal.style.display = "block";
    }
  
    // Закрываем модальное окно
    closeModalButton.onclick = function() {
      modal.style.display = "none";
    }
  
    // Закрываем модальное окно при клике вне его
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
    // Обработка создания нового проекта
    submitProjectButton.onclick = async function() {
        const projectName = projectNameInput.value.trim();
        if (!projectName) {
          alert("Project name");
          return;
        }
        const accessToken = localStorage.getItem('access_token');
  
        const url = "http://localhost:8000/cube_sat_project"; // Замените на ваш URL для создания проекта
  
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ project_name: projectName })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          // Добавляем новый проект в список
          displayProjects([...document.querySelectorAll('.right-project-item')].map(item => ({ project_name: item.textContent })), { project_name: data.project_name });
  
          // Закрываем модальное окно
          modal.style.display = "none";
          projectNameInput.value = ""; // Очищаем поле ввода
  
          fetchUserProjects();
  
        } catch (error) {
          console.error("Ошибка при создании проекта:", error);
          alert("Ошибка при создании проекта. Пожалуйста, попробуйте еще раз.");
        }
    }
  });