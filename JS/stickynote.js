export function createStickyNote(widgetToolArea) {

    const id = widgetToolArea.parentElement.id;
    const html =  /*html*/` 
  <div class="stickynote">
    <div class="stickynote__toolbar--up">
        <button data-for="${id}" title="Settings" class="tool-settings__btn stickynote__btn--settings"></button>
        <button data-for="${id}" title="Copy text into clipboard" class="stickynote__btn stickynote__btn--copy"></button>
    </div>
    <textarea class="stickynote__textarea"></textarea>
    <div class="stickynote__toolbar--down">
        <button data-for="${id}" class="stickynote__btn stickynote__btn--bold">B</button>
        <button data-for="${id}" class="stickynote__btn stickynote__btn--italic">i</button>
        <button data-for="${id}" class="stickynote__btn stickynote__btn--strikethrough">abc</button>
        <button data-for="${id}" class="stickynote__btn stickynote__btn--underline">U</button>
        <button data-for="${id}" class="stickynote__btn stickynote__btn--overline">O</button>
    </div>
    <div class="tool-settings__container">
        <button data-for="${id}" class="tool-settings__close-btn">X</button>
        <p>Settings</p>
        <label for="fontColor" class="tool-settings__label">Change Font Color:</label>
        <input id="fontColor" type="color" value="#000000">
        <label for="bgColor" class="tool-settings__label">Change Background Color:</label>
        <input id="bgColor" type="color" value="#e6e6e6">
        <label for="fontSize" class="tool-settings__label">Change Font Size (px):</label>
        <input id="fontSize" type="number" min="1" max="400" value="25">
        <label for="fontFamily" class="tool-settings__label">Change Font Family:</label>
        <select id="fontFamily">
        </select>
    </div>
  </div>`; 

    widgetToolArea.innerHTML = html;

    widgetToolArea.querySelector('select').innerHTML = stickyNoteFonts.map(font => `<option style="font-family: ${font};" value="${font}">${font}</option>`).join('');

    setTimeout(function() {
        widgetToolArea.querySelector('.stickynote').style.visibility = 'visible';
        widgetToolArea.querySelector('.stickynote').style.opacity = '1';
    }, 300);
}

export function handleStickyNoteButtons(e, btnClass) {
    const widget = document.querySelector(`[id="${e.target.dataset.for}"]`);
    const textArea = widget.querySelector('.stickynote__textarea');

    if(btnClass.contains('stickynote__btn--copy')) {
      copyContentToClipboard(textArea);
    }

    if(btnClass.contains('stickynote__btn--bold')) {
      if(!textArea.style.fontWeight) {
        textArea.style.fontWeight = 'bold';
      } else {
        textArea.style.fontWeight = '';
      }
    }
    if(btnClass.contains('stickynote__btn--italic')) {
      if(!textArea.style.fontStyle) {
        textArea.style.fontStyle = 'italic';
      } else {
        textArea.style.fontStyle = '';
      }
    }
    if(btnClass.contains('stickynote__btn--strikethrough')) {
      if(!textArea.style.textDecoration) {
        textArea.style.textDecoration = 'line-through';
      } else {
        textArea.style.textDecoration = '';
      }
    }
    if(btnClass.contains('stickynote__btn--underline')) {
      if(!textArea.style.textDecoration) {
        textArea.style.textDecoration = 'underline';
      } else {
        textArea.style.textDecoration = '';
      }
    }
    if(btnClass.contains('stickynote__btn--overline')) {
      if(!textArea.style.textDecoration) {
        textArea.style.textDecoration = 'overline';
      } else {
        textArea.style.textDecoration = '';
      }
    }
}


function copyContentToClipboard(textarea) {
    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

export function handleStickyNoteSettings(input, tool) {
  switch(input.id) {
    case 'fontColor':
         {
         const textarea = tool.querySelector('textarea');
         textarea.style.color = `${input.value}`;
         }
         break;
    case 'bgColor':
         {
         const toolArea = tool.parentElement;
         toolArea.style.backgroundColor = `${input.value}`;
         }
         break;
    case 'fontSize':
         {
         const textarea = tool.querySelector('textarea');
         if(input.value < 400 && input.value > 0) {
           textarea.style.fontSize = `${input.value/10}rem`;
         } else if (input.value < 1) {
           textarea.style.fontSize = `0.1rem`;
         } else {
           textarea.style.fontSize = `40rem`;
         }
         }
         break;
     case 'fontFamily':
         {
         const textarea = tool.querySelector('textarea');
         textarea.style.fontFamily = `${input.value}`;
         }
         break;
  }
  input.setAttribute('value', `${input.value}`);
}


export const stickyNoteFonts = [
    "Abadi MT Condensed Light",
    "Aharoni",
    "Aharoni Bold",
    "Aldhabi",
    "AlternateGothic2 BT",
    "Andale Mono",
    "Andalus",
    "Angsana New",
    "AngsanaUPC",
    "Aparajita",
    "Apple Chancery",
    "Arabic Typesetting",
    "Arial",
    "Arial Black",
    "Arial narrow",
    "Arial Nova",
    "Arial Rounded MT Bold",
    "Arnoldboecklin",
    "Avanta Garde",
    "Bahnschrift",
    "Bahnschrift Light",
    "Bahnschrift SemiBold",
    "Bahnschrift SemiLight",
    "Baskerville",
    "Batang",
    "BatangChe",
    "Big Caslon",
    "BIZ UDGothic",
    "BIZ UDMincho Medium",
    "Blippo",
    "Bodoni MT",
    "Book Antiqua",
    "Book Antiqua",
    "Bookman",
    "Bradley Hand",
    "Browallia New",
    "BrowalliaUPC",
    "Brush Script MT",
    "Brush Script Std",
    "Brushstroke",
    "Calibri",
    "Calibri Light",
    "Calisto MT",
    "Cambodian",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Century Gothic",
    "Chalkduster",
    "Cherokee",
    "Comic Sans",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Copperplate",
    "Copperplate Gothic Light",
    "Copperplate Gothic Bold",
    "Corbel",
    "Cordia New",
    "CordiaUPC",
    "Coronetscript",
    "Courier",
    "Courier New",
    "DaunPenh",
    "David",
    "DengXian",
    "DFKai-SB",
    "Didot",
    "DilleniaUPC",
    "DokChampa",
    "Dotum",
    "DotumChe",
    "Ebrima",
    "Estrangelo Edessa",
    "EucrosiaUPC",
    "Euphemia",
    "FangSong",
    "Florence",
    "Franklin Gothic Medium",
    "FrankRuehl",
    "FreesiaUPC",
    "Futara",
    "Gabriola",
    "Gadugi",
    "Garamond",
    "Gautami",
    "Geneva",
    "Georgia",
    "Georgia Pro",
    "Gill Sans",
    "Gill Sans Nova",
    "Gisha",
    "Goudy Old Style",
    "Gulim",
    "GulimChe",
    "Gungsuh",
    "GungsuhChe",
    "Hebrew",
    "Hoefler Text",
    "HoloLens MDL2 Assets",
    "Impact",
    "Ink Free",
    "IrisUPC",
    "Iskoola Pota",
    "Japanese",
    "JasmineUPC",
    "Javanese Text",
    "Jazz LET",
    "KaiTi",
    "Kalinga",
    "Kartika",
    "Khmer UI",
    "KodchiangUPC",
    "Kokila",
    "Korean",
    "Lao",
    "Lao UI",
    "Latha",
    "Leelawadee",
    "Leelawadee UI",
    "Leelawadee UI Semilight",
    "Levenim MT",
    "LilyUPC",
    "Lucida Bright",
    "Lucida Console",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Lucidatypewriter",
    "Luminari",
    "Malgun Gothic",
    "Malgun Gothic Semilight",
    "Mangal",
    "Marker Felt",
    "Marlett",
    "Meiryo",
    "Meiryo UI",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft JhengHei UI",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Sans Serif",
    "Microsoft Tai Le",
    "Microsoft Uighur",
    "Microsoft YaHei",
    "Microsoft YaHei UI",
    "Microsoft Yi Baiti",
    "MingLiU",
    "MingLiU_HKSCS",
    "MingLiU_HKSCS-ExtB",
    "MingLiU-ExtB",
    "Miriam",
    "Monaco",
    "Mongolian Baiti",
    "MoolBoran",
    "MS Gothic",
    "MS Mincho",
    "MS PGothic",
    "MS PMincho",
    "MS UI Gothic",
    "MV Boli",
    "Myanmar Text",
    "Narkisim",
    "Neue Haas Grotesk Text Pro",
    "New Century Schoolbook",
    "News Gothic MT",
    "Nirmala UI",
    "No automatic language associations",
    "Noto",
    "NSimSun",
    "Nyala",
    "Oldtown",
    "Optima",
    "Palatino",
    "Palatino Linotype",
    "papyrus",
    "Parkavenue",
    "Perpetua",
    "Plantagenet Cherokee",
    "PMingLiU",
    "Raavi",
    "Rockwell",
    "Rockwell Extra Bold",
    "Rockwell Nova",
    "Rockwell Nova Cond",
    "Rockwell Nova Extra Bold",
    "Rod",
    "Sakkal Majalla",
    "Sanskrit Text",
    "Segoe MDL2 Assets",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Emoji",
    "Segoe UI Historic",
    "Segoe UI Symbol",
    "Shonar Bangla",
    "Shruti",
    "SimHei",
    "SimKai",
    "Simplified Arabic",
    "Simplified Chinese",
    "SimSun",
    "SimSun-ExtB",
    "Sitka",
    "Snell Roundhan",
    "Stencil Std",
    "Sylfaen",
    "Symbol",
    "Tahoma",
    "Thai",
    "Times New Roman",
    "Traditional Arabic",
    "Traditional Chinese",
    "Trattatello",
    "Trebuchet MS",
    "Tunga",
    "UD Digi Kyokasho",
    "UD Digi KyoKasho NK-R",
    "UD Digi KyoKasho NP-R",
    "UD Digi KyoKasho N-R",
    "Urdu Typesetting",
    "URW Chancery",
    "Utsaah",
    "Vani",
    "Verdana",
    "Verdana Pro",
    "Vijaya",
    "Vrinda",
    "Webdings",
    "Westminster",
    "Wingdings",
    "Yu Gothic",
    "Yu Gothic UI",
    "Yu Mincho",
    "Zapf Chancery"
]
