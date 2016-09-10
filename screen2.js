//EXAMPLE STUFF
import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

import {
    SystemKeyboard
} from 'keyboard';

import Item from 'Item';
import { Screen3Template } from 'screen3';
import switchScreens from 'main';

let nameInputSkin = new Skin({borders: {left: 2, right: 2, top: 2, bottom: 2 }, stroke: '#E0E0E0'});
let fieldStyle = new Style({color: 'white', font: 'bold 18px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let fieldHintStyle = new Style({color: 'white', font: '18px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5});
let whiteSkin = new Skin({fill: "white"});
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#9CCC65', '#8BC34A'] });

let input = "";

let InputField = Container.template($ => ({ 
    top: 0, bottom: 0, right: 5, left: 5, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 2, right: 2, top: 2, bottom: 2, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            input = label.string;
                            label.container.hint.visible = (data.name.length == 0);
                            trace(data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "Input Quantity...", name: "hint"
                }),
            ]
        })
    ]
}));


const label = Label.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   string: $,
   style: new Style( { font: "20px", color: "white" })   
}));


const field0 = new InputField({name: ""});

const goLabel = label("Calculate");
const goButton = Container.template($ => ({ top: 0, bottom: 0, left: 0, right: 0, active: true,
                  skin: new Skin({ fill: "#00796B" }),
                      behavior: Behavior({
                          onTouchBegan: function(content){
                              if (!isNaN(input)) {
                                  $.i.inputQty(parseInt(input));
                                  switchScreens(new Screen3Template($));
                                  SystemKeyboard.hide();
                              }
                          },
                      }),
            contents: [goLabel] }));


export let Screen2Template = Column.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: new Skin({fill: "#00897B"}),
   contents: [
      new label($.i.name),
      new label($.i.cals + " cal"),
      field0,
      new goButton($)
   ],
   Behavior: class extends Behavior {
        onTouchEnded(content) {
            SystemKeyboard.hide();
            content.focus();
        }
    }
}));
