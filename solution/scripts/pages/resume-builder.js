// @ts-check

import ResumeBuilderPage from "../components/resume-builder/page.js";
import { render } from "../utils/dom.js";

const EXAMPLE_RESUME = {
  "name": "Моё резюме",
  "username": "Данилов Дмитрий Евгеньевич",
  "birthday": "1986-05-05",
  "city": "Ижевск",
  "tel": "+7 (234) 228-18-12",
  "email": "beautifulfly@yandex.ru",
  "description": "В целом достаточно сильный разработчик, я бы даже сказал умный, вообще умен не по годам.\nПодниму ваш проект, удалю все легаси, и все коммиты будут маленькими по 15 строк кода.",
  "interests": [
    "Хороший лидер",
    "Занимаюсь спортом",
    "Строительные практики",
    "Выпускал журналы"
  ],
  "languages": [
    {
      "name": "Английский",
      "level": "C1"
    },
    {
      "name": "Испанский",
      "level": "B2"
    }
  ],
  "jobs": [
    {
      "title": "C++ разработчик",
      "date_start": "2020-09-01",
      "date_end": "",
      "place": "ООО Рога и Копыта, Москва",
      "description": "Писал компилятор под js, который позволял ускорить билд приложений."
    },
    {
      "title": "Angular-разработчик",
      "date_start": "2020-02-01",
      "date_end": "2020-08-01",
      "place": "Тинькофф Центр Разработки, Ижевск",
      "description": "Придумывал аналитические решения и разрабатывал веб-сайты для улучшения опыта пользователей."
    }
  ],
  "education": [
    {
      "title": "Магистратура",
      "date_start": "2020-09-01",
      "date_end": "",
      "place": "ЦУ, Москва",
      "description": "Дизайн и разработка ПО"
    },
    {
      "title": "Бакалавриат",
      "date_start": "2020-02-01",
      "date_end": "2020-08-01",
      "place": "Уральский федеральный университет, Екатеринбург",
      "description": "Направление: МОАИС.",
    }
  ],
  "courses": [
    {
      "title": "Школа промышленной разработки",
      "date_start": "2021-01-01",
      "date_end": "2021-05-01",
      "place": "Известная компания"
    },
    {
      "title": "Основы JavaScript, HTML, CSS",
      "date_start": "2020-02-01",
      "date_end": "2020-08-01",
      "place": "ЧУ"
    },
    {
      "title": "Разработка на C++",
      "date_start": "2019-01-01",
      "date_end": "2020-01-01",
      "place": "Образование для Всех"
    }
  ]
};

// @ts-ignore
render(() => new ResumeBuilderPage(EXAMPLE_RESUME).element, document.getElementById("app"));