const faqUI = {
  ru: {
    pageTitle: 'Справочник — Training Endurance',
    title: 'Справочник',
    subtitle: 'Лактометр Training Endurance',
    search: 'Поиск по вопросам...',
    notFound: 'Ничего не найдено.',
    noAnswer: 'Не нашли ответ?',
    back: '← Все вопросы',
    prev: '← Назад',
    next: 'Далее →',
    btnFaq: 'Справочник',
    menuArticles: 'Статьи',
    menuVideo: 'Видео',
  },
  en: {
    pageTitle: 'Reference Guide — Training Endurance',
    title: 'Reference Guide',
    subtitle: 'Training Endurance Lactometer',
    search: 'Search questions...',
    notFound: 'Nothing found.',
    noAnswer: "Didn't find your answer?",
    back: '← All questions',
    prev: '← Previous',
    next: 'Next →',
    btnFaq: 'Reference',
    menuArticles: 'Articles',
    menuVideo: 'Video',
  }
};

const faqData = {
  ru: [
    {
      id: 'start', title: 'Начало работы', icon: '⚡',
      questions: [
        { id: 'kit', q: 'Что входит в комплект лактометра?', a: 'В коробке вы найдёте:\n\n• Лактометр Training Endurance\n• Мягкий кейс для переноски\n• USB-кабель для зарядки (Type-C)\n• Калибровочный чип\n• Руководство по эксплуатации\n\n**Важно:** тест-полоски и контрольный раствор приобретаются отдельно.' },
        { id: 'charge', q: 'Как зарядить лактометр?', a: 'Подключите USB Type-C к зарядному устройству **5В, 1А или выше**. Подойдёт любой адаптер.\n\n**Измерения во время зарядки невозможны.**' },
        { id: 'onoff', q: 'Как включить и выключить?', a: '• **Включение:** боковая кнопка **3 секунды**\n• **Выключение:** боковая кнопка **3 секунды**\n• **Автовыключение:** через **3 минуты** бездействия' },
        { id: 'settings', q: 'Настройка даты, времени, языка, яркости', a: '**Настройки** на главном экране:\n\n• **Bluetooth** — подключение устройств\n• **Зоны** — зоны лактата\n• **Дата/Время**\n• **Звук и экран** — громкость, яркость\n• **Устройство** — язык, QC, сброс\n• **Приложение TE** — платформа' },
        { id: 'chip', q: 'Что такое кодовый чип?', a: 'Калибровочное устройство из каждой упаковки полосок.\n\n**Когда вставлять:**\n• Первое использование\n• Новая упаковка полосок\n\n**Как:**\n1. Включите → значок калибровки\n2. **«Вставьте чип»**\n3. Вставьте чип\n4. Проверьте код\n5. Извлеките — готово\n\n!warn Не используйте чип от другой упаковки.' },
      ]
    },
    {
      id: 'measure', title: 'Измерение', icon: '🩸',
      questions: [
        { id: 'steps', q: 'Пошаговая инструкция', a: '**Шаг 1.** Включите. Заряд ≥15%. Новая упаковка → чип.\n\n**Шаг 2.** Вставьте полоску контактами вперёд.\n\n**Шаг 3.** Вымойте руки, высушите, продезинфицируйте палец.\n\n**Шаг 4.** Проколите ланцетом. **Сотрите первую каплю** — берите вторую.\n\n**Шаг 5.** Каплю к нижнему краю полоски. Одно касание.\n\n**Шаг 6.** ~**10 секунд** на ровной поверхности.\n\n**Шаг 7.** Извлеките полоску.' },
        { id: 'blood', q: 'Как взять кровь из пальца?', a: '• Тёплая вода улучшает кровообращение\n• Массируйте от основания к кончику\n• Дезинфекция → высушить\n• Не на родинках, венах, отёках\n\n**Мало крови:** рука вниз, массаж, тёплая вода.' },
        { id: 'drop', q: 'Почему вторая капля?', a: 'Первая содержит межклеточную жидкость. Вторая — чистая капиллярная кровь.' },
        { id: 'time', q: 'Сколько длится измерение?', a: '~**10 секунд** после нанесения крови.' },
        { id: 'low', q: 'Крови недостаточно?', a: '**Не добавляйте на ту же полоску.** Новая полоска, новый забор.' },
      ]
    },
    {
      id: 'strips', title: 'Тест-полоски', icon: '🧪',
      questions: [
        { id: 'which', q: 'Какие подходят?', a: 'Только **TE (Training Endurance)** с золотыми бета-электродами.\n\n**25 шт.** + чип. Хватает на 4–5 тестов.' },
        { id: 'store', q: 'Как хранить?', a: '• Туба плотно закрыта\n• **Закрывайте сразу** — влага портит реагент\n• Не просроченные\n• **Одноразовые**' },
        { id: 'code', q: 'Что такое смарт-код?', a: 'Чип с калибровкой партии. Вставьте при новой упаковке.' },
      ]
    },
    {
      id: 'results', title: 'Результаты и зоны', icon: '📊',
      questions: [
        { id: 'read', q: 'Как читать результат?', a: '• **Значение** в ммоль/л\n• **Зона** выделена в таблице\n\nДиапазон: **0,5–28,0**\nПокой: **0,5–1,7**' },
        { id: 'zones', q: 'Зоны лактата', a: '**LT 0 — 0,5–1,5** — Восстановление\n\n**LT 1 — 1,6–2,6** — Лёгкая аэробная\n\n**LT 2 — 2,7–4,0** — Темповая (ПАНО)\n\n**VO2 max — 4,1–10,0** — Надпороговая\n\n**Lactate Peak — 10,1–28,0** — Анаэробная' },
        { id: 'custom', q: 'Настроить зоны?', a: '1. **Настройки → Зоны**\n2. Выберите зону\n3. Мин. и макс.\n4. **Сохранить**\n\n**Lactate Peak** — только нижняя граница.' },
        { id: 'lt', q: 'Что такое LT1 и LT2?', a: '**LT1 — 1,3–2,5**\n• Жиросжигание, часами, FatMax\n\n**LT2 (ПАНО) — 2,5–4,5**\n• Макс. устойчивый лактат\n• Темп марафона' },
        { id: 'range', q: '«Ниже/выше порога»?', a: '• **Ниже 0,5** — повторите\n• **Выше 28,0** — повторите или QC' },
      ]
    },
    {
      id: 'notes', title: 'Заметки', icon: '📝',
      questions: [
        { id: 'why', q: 'Зачем заметки?', a: 'Планируйте замеры: лактат, время, интервал.' },
        { id: 'add', q: 'Как добавить?', a: '1. **Заметки** (или **Записи → Заметки**)\n2. **Добавить**\n3. Лактат (обязательно)\n4. Время (необязательно)\n5. Интервал (необязательно)' },
      ]
    },
    {
      id: 'history', title: 'История', icon: '🗂',
      questions: [
        { id: 'mem', q: 'Сколько в памяти?', a: 'До **7000 измерений** с датой.' },
        { id: 'view', q: 'Как посмотреть?', a: '**Записи** на главном экране.\n\nТакже: **QC записи**, **Заметки**.' },
        { id: 'full', q: 'Память заполнена?', a: 'Новый результат **перезаписывает старейший**.' },
      ]
    },
    {
      id: 'qc', title: 'Контроль качества', icon: '✅',
      questions: [
        { id: 'whyqc', q: 'Зачем QC?', a: 'Проверка прибора и полосок.' },
        { id: 'whenqc', q: 'Когда?', a: '• Новая партия полосок\n• Плохие условия хранения\n• Сомнительный результат' },
        { id: 'howqc', q: 'Как провести?', a: '1. **Устройство → QC**\n2. Полоска **TE**\n3. **Контрольный раствор**\n4. Результат\n\n!warn Раствор Eaglenos. 3 месяца после вскрытия.' },
      ]
    },
    {
      id: 'errors', title: 'Ошибки', icon: '⚠️',
      questions: [
        { id: 'codes', q: 'Коды ошибок', a: '**Код 001** — Повреждённый чип. Переставьте.\n\n**Код 002** — Использованная полоска. Новую.\n\n**Код 003** — Ошибка нанесения. Новая полоска, достаточно крови.\n\n**Код 004** — Неверный чип. Из текущей упаковки.\n\n**Код 005** — Электроника. Перезагрузите.' },
        { id: 'te', q: '«Вставьте полоску TE»', a: 'Вставлена не-TE полоска. Замените.' },
        { id: 'bat', q: 'Батарея', a: '**«Зарядите»** — низкий заряд.\n**«Скоро выключится»** — подключите.\n**«Тестирование невозможно»** — заряжается, отключите кабель.' },
      ]
    },
    {
      id: 'care', title: 'Уход', icon: '🛡',
      questions: [
        { id: 'clean', q: 'Как чистить?', a: '1. Прибор **выключен**\n2. Ткань + **75% спирт**\n3. Без отбеливателя\n4. Не распылять\n5. Не погружать' },
        { id: 'storage', q: 'Хранение', a: '• **−20°C … +55°C**\n• Влажность **10%–93%**\n• Работа **+10°C … +40°C**' },
        { id: 'cold', q: 'Холоднее +10°C?', a: 'Держите в тепле. Доставайте для измерения.' },
        { id: 'life', q: 'Срок службы', a: '**5 лет**. Батарея заменяемая.' },
      ]
    },
    {
      id: 'specs', title: 'Характеристики', icon: '⚙️',
      questions: [
        { id: 't', q: 'Таблица характеристик', a: '• Измерение: ~10 сек\n• Кровь: 0,8 мкл\n• Электрохимический биосенсор, золотые электроды\n• 0,5–28,0 ммоль/л\n• Гематокрит: 30%–60%\n• Память: 7000\n• Li-батарея, USB-C (5В, ≥1А)\n• Bluetooth 5.0\n• +10…+40°C работа\n• EN600, EN601\n• 5 лет' },
      ]
    },
  ],
  en: [
    {
      id: 'start', title: 'Getting Started', icon: '⚡',
      questions: [
        { id: 'kit', q: "What's in the box?", a: '• Training Endurance Lactometer\n• Soft carrying case\n• USB Type-C cable\n• Calibration code chip\n• User manual\n\n**Important:** strips and control solution sold separately.' },
        { id: 'charge', q: 'How to charge?', a: 'USB Type-C, **5V ≥1A**. Any phone charger.\n\n**No testing while charging.**' },
        { id: 'onoff', q: 'Power on/off?', a: '• **On:** hold side button **3 sec**\n• **Off:** hold side button **3 sec**\n• **Auto-off:** **3 min** idle' },
        { id: 'settings', q: 'Date, time, language, brightness?', a: '**Settings** on main screen:\n\n• **Bluetooth**\n• **Zones**\n• **Date/Time**\n• **Sound and display**\n• **Device** — language, QC, reset\n• **TE App**' },
        { id: 'chip', q: 'What is the code chip?', a: 'Calibration device in every strip box.\n\n**When:**\n• First use\n• Every **new box**\n\n**How:**\n1. Turn on → calibration icon\n2. **Insert code chip**\n3. Insert chip\n4. Verify code\n5. Remove — done\n\n!warn Don\'t use chip from different package.' },
      ]
    },
    {
      id: 'measure', title: 'How to Measure', icon: '🩸',
      questions: [
        { id: 'steps', q: 'Step-by-step guide', a: '**Step 1.** Turn on. Battery ≥15%. New box → chip first.\n\n**Step 2.** Insert strip contact-side first.\n\n**Step 3.** Wash hands, dry, disinfect fingertip.\n\n**Step 4.** Prick with lancet. **Wipe first drop** — use second.\n\n**Step 5.** Touch blood to strip inlet. One attempt.\n\n**Step 6.** ~**10 sec** on flat surface.\n\n**Step 7.** Remove strip.' },
        { id: 'blood', q: 'Blood collection tips', a: '• Warm water improves flow\n• Massage base to tip\n• Disinfect, let dry\n• Avoid moles, veins, swelling\n\n**Low flow:** lower arm, massage, warm water.' },
        { id: 'drop', q: 'Why second drop?', a: 'First drop has interstitial fluid. Second is pure capillary blood.' },
        { id: 'time', q: 'How long?', a: '~**10 seconds** after application.' },
        { id: 'low', q: 'Not enough blood?', a: "**Don't add to same strip.** New strip, new sample." },
      ]
    },
    {
      id: 'strips', title: 'Test Strips', icon: '🧪',
      questions: [
        { id: 'which', q: 'Compatible strips?', a: 'Only **TE (Training Endurance)** — gold beta-electrodes.\n\n**25 strips** + chip per box.' },
        { id: 'store', q: 'How to store?', a: '• Vial tightly closed\n• **Close immediately**\n• Don\'t use expired\n• **Single-use**' },
        { id: 'code', q: 'Smart code?', a: 'Calibration chip for batch. Insert with new box.' },
      ]
    },
    {
      id: 'results', title: 'Results & Zones', icon: '📊',
      questions: [
        { id: 'read', q: 'Reading results', a: '• **Lactate** in mmol/L\n• **Zone** highlighted\n\nRange: **0.5–28.0**\nResting: **0.5–1.7**' },
        { id: 'zones', q: 'Lactate zones', a: '**LT 0 — 0.5–1.5** — Recovery\n\n**LT 1 — 1.6–2.6** — Easy aerobic\n\n**LT 2 — 2.7–4.0** — Tempo (MLSS)\n\n**VO2 max — 4.1–10.0** — Supra-threshold\n\n**Lactate Peak — 10.1–28.0** — Anaerobic' },
        { id: 'custom', q: 'Customize zones?', a: '1. **Settings → Zones**\n2. Select zone\n3. Min/max\n4. **Save**\n\n**Lactate Peak** — lower bound only.' },
        { id: 'lt', q: 'What are LT1 & LT2?', a: '**LT1 — 1.3–2.5**\n• Fat burning, hours, FatMax\n\n**LT2 (MLSS) — 2.5–4.5**\n• Max steady lactate\n• Marathon pace' },
        { id: 'range', q: 'Below/above limit?', a: '• **Below 0.5** — retest\n• **Above 28.0** — retest or QC' },
      ]
    },
    {
      id: 'notes', title: 'Notes', icon: '📝',
      questions: [
        { id: 'why', q: 'Why notes?', a: 'Plan measurements: lactate, time, interval.' },
        { id: 'add', q: 'How to add?', a: '1. **Notes** (or **Records → Notes**)\n2. **Add**\n3. Lactate (required)\n4. Time (optional)\n5. Interval (optional)' },
      ]
    },
    {
      id: 'history', title: 'History', icon: '🗂',
      questions: [
        { id: 'mem', q: 'How many stored?', a: 'Up to **7,000** with date/time.' },
        { id: 'view', q: 'View history?', a: '**Records** on main screen.\n\nAlso: **QC records**, **Notes**.' },
        { id: 'full', q: 'Memory full?', a: 'New **overwrites oldest**.' },
      ]
    },
    {
      id: 'qc', title: 'Quality Control', icon: '✅',
      questions: [
        { id: 'whyqc', q: 'Why QC?', a: 'Verifies device and strips.' },
        { id: 'whenqc', q: 'When?', a: '• New lot number\n• Bad storage\n• Odd result' },
        { id: 'howqc', q: 'How?', a: '1. **Device → QC**\n2. **TE** strip\n3. **Control solution**\n4. Result\n\n!warn Eaglenos solution. 3 months after opening.' },
      ]
    },
    {
      id: 'errors', title: 'Error Codes', icon: '⚠️',
      questions: [
        { id: 'codes', q: 'Error codes', a: '**001** — Damaged chip. Re-insert.\n\n**002** — Used strip. New one.\n\n**003** — Sample error. New strip, enough blood.\n\n**004** — Wrong chip. From current box.\n\n**005** — Electronics. Restart.' },
        { id: 'te', q: '"Insert TE strip"', a: 'Non-TE strip. Replace.' },
        { id: 'bat', q: 'Battery warnings', a: '**"Charge"** — low.\n**"Shutting down"** — plug in now.\n**"Can\'t test"** — charging, unplug.' },
      ]
    },
    {
      id: 'care', title: 'Care & Storage', icon: '🛡',
      questions: [
        { id: 'clean', q: 'Cleaning?', a: '1. Device **off**\n2. Cloth + **75% alcohol**\n3. No bleach\n4. Don\'t spray\n5. Don\'t immerse' },
        { id: 'storage', q: 'Storage', a: '• **−20 to +55°C**\n• Humidity **10–93%**\n• Operating **+10 to +40°C**' },
        { id: 'cold', q: 'Below +10°C?', a: 'Keep warm. Out only to measure.' },
        { id: 'life', q: 'Lifespan?', a: '**5 years**. Battery replaceable.' },
      ]
    },
    {
      id: 'specs', title: 'Specs', icon: '⚙️',
      questions: [
        { id: 't', q: 'Specifications', a: '• ~10 sec measurement\n• 0.8 µL blood\n• Electrochemical biosensor, gold electrodes\n• 0.5–28.0 mmol/L\n• Hematocrit 30–60%\n• 7,000 memory\n• Li-battery, USB-C 5V ≥1A\n• Bluetooth 5.0\n• +10…+40°C operating\n• EN600, EN601\n• 5 years' },
      ]
    },
  ]
};