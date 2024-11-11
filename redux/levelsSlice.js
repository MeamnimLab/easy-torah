import { createSlice } from "@reduxjs/toolkit";
import Level from "../models/level";
import Trivia from "@/models/games/trivia";
import TrueFalse from "@/models/games/trueFalse";

const initialState = {
  levels: [
    {
      ...new Level(1, "א", "דִּינֵי הַשְׁכָּמַת הַבּוֹקֶר", true),
      games: [
        {...new Trivia(
          1,
          "trivia",
          1,
          "When should a person wash their hands (Netilat Yadayim) in the morning according to Jewish law?",
          1,
          [1],
          [
            { id: 1, answer: "Before making any blessings or prayers after waking up.", comment: "This is the correct answer. According to the Kitzur Shulchan Aruch, hand washing should be done before making any blessings or prayers in the morning to purify oneself." },
            { id: 2, answer: "Only after eating breakfast.", comment: "This is incorrect. The obligation of Netilat Yadayim in the morning applies before eating or engaging in any activities, not specifically after breakfast." },
            { id: 3, answer: "Only before going to sleep.", comment: "This is incorrect. The washing of hands before sleep is a separate halacha and is not related to the morning practice." },
            { id: 4, answer: "After going to the bathroom.", comment: "This is incorrect. The washing of hands after using the bathroom is a separate halacha, but morning Netilat Yadayim should be done upon waking up before any activities." }
          ]
        )},
        {...new Trivia(
          2,
          "trivia",
          1,
          "question B",
          1,
          [1],
          [
            { id: 1, answer: "answer 1.2", comment: "comment 1" },
            { id: 2, answer: "answer 2.2", comment: "comment 2" },
            { id: 3, answer: "answer 3.2", comment: "comment 3" },
            { id: 4, answer: "answer 4.2", comment: "comment 4" },
          ]
        )},
        {...new Trivia(
          3,
          "trivia",
          1,
          "question C",
          1,
          [1],
          [
            { id: 1, answer: "answer 1.3", comment: "comment 1" },
            { id: 2, answer: "answer 2.3", comment: "comment 2" },
            { id: 3, answer: "answer 3.3", comment: "comment 3" },
            { id: 4, answer: "answer 4.3", comment: "comment 4" },
          ]
        )},
        {...new TrueFalse(
          4,
          "trueFalse",
          1,
          "A person must wash their hands before making any blessings or prayers in the morning.",
          true
        )},
        {...new TrueFalse(
          5,
          "trueFalse",
          1,
          "this is a true false question 2",
          true
        )},
        {...new TrueFalse(
          6,
          "trueFalse",
          1,
          "this is a true false question 3",
          false
        )},
      ],
    },
    {...new Level(2, "ב", "הִלְכוֹת נְטִילַת יָדַיִם", false)},
    {...new Level(3, "ג", "דִּין לְבִישַׁת בְּגָדָיו וְהִלּוּכוֹ", false)},
    {...new Level(4, "ד", "הַנְהָגַת בֵּית הַכִּסֵּא וְדִינֵי אֲשֶׁר יָצַר", false)},
    {...new Level(5, "ה", "נקיון המקום לדבר שבקדושה", false)},
    {...new Level(6, "ו", "קצת דיני ברכות ודיני ברוך הוא וברוך שמו ואמן", false)},
    {...new Level(7, "ז", "הלכות ברכות השחר", false)},
    {...new Level(8, "ח", "דברים האסורים משהאיר היום עד לאחר שיתפלל", false)},
    {...new Level(9, "ט", "הִלְכוֹת צִיצִית", false)},
    {...new Level(10, "י", "הלכות תפילין", false)},
    {...new Level(11, "יא", "הלכות מזוזה", false)},
    {...new Level(12, "יב", "הלכות הכנת הגוף לתפלה ומקומות שראוי להתפלל שם", false)},
    {...new Level(13, "יג", "דיני קדושת בית הכנסת ובית המדרש", false)},
    {...new Level(14, "יד", "דיני פסוקי דזמרה", false)},
    {...new Level(15, "טו", 'דיני דברים שבקדושה ודיני ש"ץ', false)},
    {...new Level(16, "טז", "דיני ההפסקות בקריאת שמע וברכותיה", false)},
    {...new Level(17, "יז", "דיני קריאת שמע", false)},
    {...new Level(18, "יח", "הלכות תפילת שמונה עשרה", false)},
    {...new Level(19, "יט", "דיני משיב הרוח וטל ומטר ויעלה ויבא ועננו", false)},
    {...new Level(20, "כ", 'דיני חזרת הש"ץ', false)},
    {...new Level(21, "כא", "דין מי שלא התפלל היאך ישלימנה", false)},
    {...new Level(22, "כב", "דיני תחנון", false)},
    {...new Level(23, "כג", "קצת דיני קריאת ספר תורה", false)},
    {...new Level(24, "כד", "אם נמצא טעות או פסול בספר תורה", false)},
    {...new Level(25, "כה", "דיני אשרי ובא לציון עד גמר התפילה", false)},
    {...new Level(26, "כו", "דיני קדיש יתום", false)},
    {...new Level(27, "כז", "הלכות תלמוד תורה", false)},
    {...new Level(28, "כח", "הלכות ספר תורה ושאר ספרי קודש", false)},
    {...new Level(29, "כט", "מידות שירגיל בהם האדם את עצמו", false)},
    {...new Level(30, "ל", "איסור רכילות, לשון הרע, נקימה ונטירה", false)},
    {...new Level(31, "לא", "שכל כוונות האדם יהיו לשם שמים", false)},
    {...new Level(32, "לב", 'שמירת הגוף ע"פ הטבע', false)},
    {...new Level(33, "לג", "דברים האסורים משום סכנה", false)},
    {...new Level(34, "לד", "הלכות צדקה", false)},
    {...new Level(35, "לה", "הלכות חלה", false)},
    {...new Level(
      36,
      "מח",
      "הִלְכוֹת בְּרָכוֹת עַל מַאֲכָלִים מֵחֲמֵשֶׁת מִינֵי דָּגָן",
      false
    )},
    {...new Level(37, "לו", "הלכות מליחה", false)},
    {...new Level(
      38,
      "מט",
      "דִּין בִּרְכַּת הַיַּיִן וּבִרְכַּת הַטּוֹב וְהַמֵּטִיב",
      false
    )},
    {...new Level(
      39,
      "נ",
      "כְּלָלִים בִּבְרָכָה רִאשׁוֹנָה מִבִּרְכוֹת הַנֶּהֱנִין",
      false
    )},
    {...new Level(40, "נא", "כְּלָלִים בִּבְרָכָה אַחֲרוֹנָה", false)},
    {...new Level(
      41,
      "ס",
      "דִּין מִי שֶׁרוֹצֶה לֶאֱכֹל אוֹ לִשְׁתּוֹת קֹדֶם הַסְּעֻדָּה",
      false
    )},
    {...new Level(42, "סא", "משא ומתן והדרך", false)},
    {...new Level(43, "סב", "הלכות כיבוד אב ואם", false)},
    {...new Level(44, "סג", "הלכות כיבוד רבו וזקן ותלמיד חכם וכהן", false)},
    {...new Level(45, "סד", "הִלְכוֹת שִׁמּוּר בָּרוּת", false)},
    {...new Level(46, "סה", "הִלְכוֹת הזדהות עם הקהל ביהודים השכנים", false)},
  ],
};

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
});

export default levelsSlice.reducer;
