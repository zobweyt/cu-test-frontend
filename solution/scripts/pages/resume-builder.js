// @ts-check

import { createResumeBuilderLayout } from "../components/resume-builder/layout.js";
import { render } from "../utils/dom.js";

const EXAMPLE_RESUME = {
  "name": "Моё резюме",
  "username": "Иван Иванов",
  "birthday": "1990-05-15",
  "city": "Москва",
  "tel": "+7 (999) 123-45-67",
  "email": "ivan.ivanov@example.com",
  "description": "Опытный специалист в области маркетинга с более чем 5-летним стажем. Умею работать в команде и достигать поставленных целей.",
  "interests": [
    "Чтение",
    "Путешествия",
    "Спорт"
  ],
  "languages": [
    {
      "name": "Русский",
      "level": "Родной"
    },
    {
      "name": "Английский",
      "level": "Средний"
    }
  ],
  "jobs": [
    {
      "title": "Маркетолог",
      "date_start": "2018-06-01",
      "date_end": "2023-08-31",
      "place": "Компания XYZ",
      "description": "Разработка и реализация маркетинговых стратегий, анализ рынка и конкурентов."
    },
    {
      "title": "Ассистент маркетолога",
      "date_start": "2016-01-01",
      "date_end": "2018-05-31",
      "place": "Компания ABC",
      "description": "Поддержка команды маркетинга, участие в проведении рекламных кампаний."
    }
  ],
  "education": [
    {
      "title": "Бакалавр маркетинга",
      "date_start": "2012-09-01",
      "date_end": "2016-06-30",
      "place": "Московский государственный университет",
      "description": "Изучение основ маркетинга, рекламы и управления."
    }
  ],
  "courses": [
    {
      "title": "Курс по цифровому маркетингу",
      "date_start": "2021-01-15",
      "date_end": "2021-03-15",
      "place": "Онлайн-академия"
    }
  ]
};

// @ts-ignore
render(() => createResumeBuilderLayout(), document.getElementById("app"));
