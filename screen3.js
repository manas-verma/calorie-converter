import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';

import Item from 'Item';
import { Screen2Template } from 'screen2';

export const items = [new Item("Calories", 1),
                new Item("Plate of Spaghetti", 600),
                new Item("Pop Tart", 200),
                new Item("Banana", 105),
                new Item("Big Mac", 563),
                new Item("Medium Fries", 365),
                new Item("Taco", 189),
                new Item("Slice of bread", 79),
                new Item("Chocolate Cake", 350),
                new Item("Plate of Pad Thai", 889),
                new Item("IHOP Chorizo Fiesta Omelette", 1990),
                new Item("Harmless Coconut Water (1 bottle)", 120),
                new Item("Boba milk tea with grass jelly, 50% sugar", 316),
                new Item("Cup of black coffee", 5),
                new Item("Grande Caramel Frappuccino", 420)];


const whiteSkin = new Skin({ fill: "white" });
const normalText = new Style( { font: "15px", color: "white" });

const label = Label.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   string: $,
   style: normalText}));

const itemLabels = items.map(item =>
	label(item.name)
);

const tealColors = ['#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40',
                    '#00695C', '#00796B', '#00897B', '#009688'];

let darkGraySkin = new Skin({ fill:"#263238" });
let titleStyle = new Style( { font: "20px", color: "white" } );


export let Screen3Template = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        VerticalScroller($, { 
            active: true, top: 35, bottom: 0,
            contents: [
                new Column({ 
                    top: 0, left: 0, right: 0,
                    contents:
                        itemLabels.map((l, index) => 
                            new Column({ top: 0, height: 40, left: 0, right: 0, active: true,
                                skin: new Skin({
                                          fill: tealColors[index % tealColors.length]
                                        }),
                                contents: [l, label(" X" + ($.i.total_cals / items[index].cals).toFixed(2))]}))
                     }),
                VerticalScrollbar(), 
                TopScrollerShadow(), 
                BottomScrollerShadow(),    
            ]                     
        }),
        new Column({ 
            top: 0, height: 35, left: 0, right: 0, skin: darkGraySkin,
            style: titleStyle,
            active: true,
            contents: [
                new label($.i.name + " X " + $.i.qty),
                new label($.i.total_cals + " cal")
            ]
        })
    ]
}));
