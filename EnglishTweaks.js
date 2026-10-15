function getClientInfo() {
    return {
        "name": "English Tweaks",
        "category": "Unofficial language support",
        "author": "Dannyu NDos",
        "versionNumber": 0,
        "minEditorVersion": 131330,
        "type": "SidePanelSection"
    };
}

const TITLE = "ENGLISH TWEAKS";
const MESSAGE = "Select notes with English lyrics, and press the button below.";
const BUTTON_TEXT = "Set to British pronunciation";
function getTranslations(langCode) {
    if (langCode == "ja-jp") {
        return [
            [TITLE, "英語の調整"],
            [MESSAGE, "英語の歌詞が書かれた音符を選択して、ボタンを押してください。"],
            [BUTTON_TEXT, "発音をイギリス英語に設定"]
        ];
    }
    else if (langCode == "zh-cn") {
        return [
            [TITLE, "英语调整"],
            [MESSAGE, "选择写有英文歌词的音符们，按下按键。"],
            [BUTTON_TEXT, "设定为英式发音"]
        ];
    }
    else if (langCode == "zh-tw") {
        return [
            [TITLE, "英語調整"],
            [MESSAGE, "選擇寫有英文歌詞的音符們，按下按鍵。"],
            [RESET_BUTTON_TEXT, "重置音素"],
            [BUTTON_TEXT, "設定為英式發音"]
        ];
    }
    else if (langCode == "ko-kr") {
        return [
            [TITLE, "영어 발음 조정"],
            [MESSAGE, "영어 가사가 적힌 음표들을 선택하고, 버튼을 눌러주세요."],
            [BUTTON_TEXT, "영국식 발음으로 설정"]
        ];
    }
    else if (langCode == "fr-fr") {
        return [
            [TITLE, "RÉGLAGES DE L'ANGLAIS"],
            [MESSAGE, "Sélectionnez des notes avec les paroles en anglais, et appuyez sur le bouton."],
            [BUTTON_TEXT, "Régler la prononciation britannique"]
        ];
    }
    else if (langCode == "es-la") {
        return [
            [TITLE, "AJUSTES EN INGLÉS"],
            [MESSAGE, "Seleccione notas con las letras en inglés, y apriete el botón."],
            [BUTTON_TEXT, "Ajustar la pronunciación británica"]
        ];
    }
    else if (langCode == "de-de") {
        return [
            [TITLE, "ENGLISCH ÄNDERUNGEN"],
            [MESSAGE, "Wählen Sie die Noten und drücken Sie eine Taste."],
            [BUTTON_TEXT, "Auf britische Aussprache wechseln"]
        ];
    }
}

function tweakEnglish(note, phonemeStr) {
    var newPhonemeStr = phonemeStr;
    function replacer(regex, replacement) {
        const candidate = newPhonemeStr.replace(new RegExp(/(^|\s)/.source + regex.source + /(\s|$)/.source, "g"), "$1" + replacement + "$2");
        if (candidate != phonemeStr) {
            newPhonemeStr = candidate;
            return true;
        }
        return false;
    }
    replacer(/@`/, "@") || replacer(/A\sr\\/, "A") || replacer(/O\sr\\/, "o") ||
        replacer(/I\sr\\/, "I :6") || replacer(/E\sr\\/, "E :6") || replacer(/U\sr\\/, "U :6");
    if (phonemeStr != newPhonemeStr) {
        note.setPhonemes(newPhonemeStr);
    }
}

var buttonValue = SV.create("WidgetValue");
buttonValue.setValueChangeCallback(function () {
    const mainEditor = SV.getMainEditor();
    const selectedNotes = mainEditor.getSelection().getSelectedNotes().sort(function (note1, note2) { return note1.getOnset() - note2.getOnset(); });
    for (var i = 0; i < selectedNotes.length; ++i) {
        selectedNotes[i].setAttributes({ "phoneset": "xsampa" });
    }
    function callback() {
        const phonemes = SV.getPhonemesForGroup(mainEditor.getCurrentGroup());
        for (var i = 0; i < selectedNotes.length; ++i) {
            const note = selectedNotes[i];
            const j = note.getIndexInParent();
            tweakEnglish(note, phonemes[j]);
        }
        SV.finish();
    }
    SV.setTimeout(10, callback);
});

function getSidePanelSectionState() {
    return {
        "title": SV.T(TITLE),
        "rows": [
            {
                "type": "Label",
                "text": SV.T(MESSAGE),
            },
            {
                "type": "Container",
                "columns": [
                    {
                        "type": "Button",
                        "text": SV.T(BUTTON_TEXT),
                        "value": buttonValue
                    }
                ]
            }
        ]
    };
}
