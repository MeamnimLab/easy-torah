import { createSlice } from "@reduxjs/toolkit";
import Level from "../models/level";
import Trivia from "@/models/games/trivia";
import TrueFalse from "@/models/games/trueFalse";
import Vocabulary from "@/models/games/vocabulary";

const initialState = {
  levels: [
    {
      ...new Level(1, "א", "דִּינֵי הַשְׁכָּמַת הַבּוֹקֶר", true),
      icon: "sunny-outline",
      games: [
        {
          ...new Trivia(
            1,
            "trivia",
            1,
            "When should a person wash their hands (Netilat Yadayim) in the morning according to Jewish law?",
            1,
            [1],
            [
              {
                id: 1,
                answer:
                  "Before making any blessings or prayers after waking up.",
                comment:
                  "This is the correct answer. According to the Kitzur Shulchan Aruch, hand washing should be done before making any blessings or prayers in the morning to purify oneself.",
              },
              {
                id: 2,
                answer: "Only after eating breakfast.",
                comment:
                  "This is incorrect. The obligation of Netilat Yadayim in the morning applies before eating or engaging in any activities, not specifically after breakfast.",
              },
              {
                id: 3,
                answer: "Only before going to sleep.",
                comment:
                  "This is incorrect. The washing of hands before sleep is a separate halacha and is not related to the morning practice.",
              },
              {
                id: 4,
                answer: "After going to the bathroom.",
                comment:
                  "This is incorrect. The washing of hands after using the bathroom is a separate halacha, but morning Netilat Yadayim should be done upon waking up before any activities.",
              },
            ]
          ),
        },
        {
          ...new Trivia(
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
          ),
        },
        {
          ...new Trivia(
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
          ),
        },
        {
          ...new TrueFalse(
            4,
            "trueFalse",
            1,
            "A person must wash their hands before making any blessings or prayers in the morning.",
            true
          ),
        },
        {
          ...new TrueFalse(
            5,
            "trueFalse",
            1,
            "this is a true false question 2",
            true
          ),
        },
        {
          ...new TrueFalse(
            6,
            "trueFalse",
            1,
            "this is a true false question 3",
            false
          ),
        },
        {
          ...new Vocabulary(
            7,
            "vocabulary",
            1,
            "The bioluminescent organisms in the ocean create a mesmerizing glow that illuminates the water.",
            [
              {
                id: 1,
                sentence: "bioluminescent",
                explanation: "Organisms that produce their own light.",
              },
              {
                id: 2,
                sentence: "mesmerizing",
                explanation:
                  "Something that is very captivating or fascinating.",
              },
              {
                id: 3,
                sentence: "illuminates",
                explanation: "Makes something bright or lights it up.",
              },
            ]
          ),
        },
        {
          ...new Vocabulary(
            8,
            "vocabulary",
            1,
            "The architect designed a magnificent edifice that became a landmark in the city.",
            [
              {
                id: 1,
                sentence: "architect",
                explanation: "A person who designs buildings.",
              },
              {
                id: 2,
                sentence: "magnificent",
                explanation: "Very impressive or beautiful.",
              },
              {
                id: 3,
                sentence: "edifice",
                explanation: "A large and impressive building.",
              },
              {
                id: 4,
                sentence: "landmark",
                explanation: "An important or recognizable building or place.",
              },
            ]
          ),
        },
        {
          ...new Vocabulary(
            9,
            "vocabulary",
            1,
            "Astronomers use sophisticated telescopes to observe celestial phenomena far beyond our galaxy.",
            [
              {
                id: 1,
                sentence: "sophisticated",
                explanation: "Advanced or complex.",
              },
              {
                id: 2,
                sentence: "celestial",
                explanation: "Related to the sky or outer space.",
              },
              {
                id: 3,
                sentence: "phenomena",
                explanation:
                  "Events or occurrences that can be observed, often remarkable or extraordinary.",
              },
              {
                id: 4,
                sentence: "galaxy",
                explanation: "A large system of stars and planets in space.",
              },
            ]
          ),
        },
      ],
    },
    {
      ...new Level(2, "ב", "הִלְכוֹת נְטִילַת יָדַיִם", false),
      icon: "water-outline",
    },
    {
      ...new Level(3, "ג", "דִּין לְבִישַׁת בְּגָדָיו וְהִלּוּכוֹ", false),
      icon: "shirt-outline",
    },
    {
      ...new Level(
        4,
        "ד",
        "הַנְהָגַת בֵּית הַכִּסֵּא וְדִינֵי אֲשֶׁר יָצַר",
        false
      ),
      icon: "water-outline",
    }, // represents Netilat Yadayim
    {
      ...new Level(5, "ה", "נקיון המקום לדבר שבקדושה", false),
      icon: "brush-outline",
    }, // cleanliness and purity
    {
      ...new Level(
        6,
        "ו",
        "קצת דיני ברכות ודיני ברוך הוא וברוך שמו ואמן",
        false
      ),
      icon: "pricetag-outline",
    }, // blessings and respectful mention
    { ...new Level(7, "ז", "הלכות ברכות השחר", false), icon: "sunny-outline" }, // morning blessings
    {
      ...new Level(8, "ח", "דברים האסורים משהאיר היום עד לאחר שיתפלל", false),
      icon: "time-outline",
    }, // timing for prayers
    { ...new Level(9, "ט", "הִלְכוֹת צִיצִית", false), icon: "shirt-outline" }, // Tzitzit (garment)
    { ...new Level(10, "י", "הלכות תפילין", false), icon: "cube-outline" }, // Tefillin (symbolic of the box shape)
    { ...new Level(11, "יא", "הלכות מזוזה", false), icon: "home-outline" }, // Mezuzah (placed on doorposts)
    {
      ...new Level(
        12,
        "יב",
        "הלכות הכנת הגוף לתפלה ומקומות שראוי להתפלל שם",
        false
      ),
      icon: "person-outline",
    },
    {
      ...new Level(13, "יג", "דיני קדושת בית הכנסת ובית המדרש", false),
      icon: "business-outline",
    },
    {
      ...new Level(14, "יד", "דיני פסוקי דזמרה", false),
      icon: "musical-notes-outline",
    },
    {
      ...new Level(15, "טו", 'דיני דברים שבקדושה ודיני ש"ץ', false),
      icon: "megaphone-outline",
    },
    {
      ...new Level(16, "טז", "דיני ההפסקות בקריאת שמע וברכותיה", false),
      icon: "pause-outline",
    }, // pauses during Shema
    { ...new Level(17, "יז", "דיני קריאת שמע", false), icon: "book-outline" }, // Shema reading
    {
      ...new Level(18, "יח", "הלכות תפילת שמונה עשרה", false),
      icon: "chatbubble-outline",
    }, // Amidah prayer
    {
      ...new Level(19, "יט", "דיני משיב הרוח וטל ומטר ויעלה ויבא ועננו", false),
      icon: "cloud-outline",
    }, // elements/weather prayer
    { ...new Level(20, "כ", 'דיני חזרת הש"ץ', false), icon: "repeat-outline" }, // repetition of Amidah
    {
      ...new Level(21, "כא", "דין מי שלא התפלל היאך ישלימנה", false),
      icon: "sync-outline",
    }, // makeup prayers
    { ...new Level(22, "כב", "דיני תחנון", false), icon: "hand-left-outline" }, // supplications
    {
      ...new Level(23, "כג", "קצת דיני קריאת ספר תורה", false),
      icon: "document-outline",
    }, // Torah reading
    {
      ...new Level(24, "כד", "אם נמצא טעות או פסול בספר תורה", false),
      icon: "alert-circle-outline",
    }, // error in Torah scroll
    {
      ...new Level(25, "כה", "דיני אשרי ובא לציון עד גמר התפילה", false),
      icon: "checkmark-done-outline",
    }, // conclusion of prayer
    { ...new Level(26, "כו", "דיני קדיש יתום", false), icon: "people-outline" }, // Kaddish for the deceased
    {
      ...new Level(27, "כז", "הלכות תלמוד תורה", false),
      icon: "school-outline",
    }, // study of Torah
    {
      ...new Level(28, "כח", "הלכות ספר תורה ושאר ספרי קודש", false),
      icon: "library-outline",
    }, // holy books
    {
      ...new Level(29, "כט", "מידות שירגיל בהם האדם את עצמו", false),
      icon: "options-outline",
    }, // character traits
    {
      ...new Level(30, "ל", "איסור רכילות, לשון הרע, נקימה ונטירה", false),
      icon: "volume-mute-outline",
    }, // prohibition of gossip
    {
      ...new Level(31, "לא", "שכל כוונות האדם יהיו לשם שמים", false),
      icon: "heart-outline",
    }, // for the sake of Heaven
    {
      ...new Level(32, "לב", 'שמירת הגוף ע"פ הטבע', false),
      icon: "fitness-outline",
    }, // health and body care
    {
      ...new Level(33, "לג", "דברים האסורים משום סכנה", false),
      icon: "warning-outline",
    }, // prohibited due to danger
    { ...new Level(34, "לד", "הלכות צדקה", false), icon: "cash-outline" }, // charity
    { ...new Level(35, "לה", "הלכות חלה", false), icon: "restaurant-outline" }, // Challah (bread)
    {
      ...new Level(
        36,
        "מח",
        "הִלְכוֹת בְּרָכוֹת עַל מַאֲכָלִים מֵחֲמֵשֶׁת מִינֵי דָּגָן",
        false
      ),
      icon: "help-outline",
    },
    { ...new Level(37, "לו", "הלכות מליחה", false), icon: "help-outline" },
    {
      ...new Level(
        38,
        "מט",
        "דִּין בִּרְכַּת הַיַּיִן וּבִרְכַּת הַטּוֹב וְהַמֵּטִיב",
        false
      ),
      icon: "help-outline",
    },
    {
      ...new Level(
        39,
        "נ",
        "כְּלָלִים בִּבְרָכָה רִאשׁוֹנָה מִבִּרְכוֹת הַנֶּהֱנִין",
        false
      ),
      icon: "help-outline",
    },
    {
      ...new Level(40, "נא", "כְּלָלִים בִּבְרָכָה אַחֲרוֹנָה", false),
      icon: "help-outline",
    },
    {
      ...new Level(
        41,
        "ס",
        "דִּין מִי שֶׁרוֹצֶה לֶאֱכֹל אוֹ לִשְׁתּוֹת קֹדֶם הַסְּעֻדָּה",
        false
      ),
      icon: "help-outline",
    },
    { ...new Level(42, "סא", "משא ומתן והדרך", false), icon: "help-outline" },
    {
      ...new Level(43, "סב", "הלכות כיבוד אב ואם", false),
      icon: "help-outline",
    },
    {
      ...new Level(44, "סג", "הלכות כיבוד רבו וזקן ותלמיד חכם וכהן", false),
      icon: "help-outline",
    },
    {
      ...new Level(45, "סד", "הִלְכוֹת שִׁמּוּר בָּרוּת", false),
      icon: "help-outline",
    },
    {
      ...new Level(46, "סה", "הִלְכוֹת הזדהות עם הקהל ביהודים השכנים", false),
      icon: "help-outline",
    },
  ],
};

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
});

export default levelsSlice.reducer;
