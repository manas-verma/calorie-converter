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

const itemLabels = items.map(item =>
	new Label({ left: 0, right: 0, top: 0, bottom: 0, string: item.name, style: normalText })
);

let darkGraySkin = new Skin({ fill:"#263238" });
let titleStyle = new Style( { font: "20px", color: "white" } );


export let firstScreenTemplate = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        VerticalScroller($, { 
            active: true, top: 30, bottom: 0,
            contents: [
                $.contentToScrollVertically,
                VerticalScrollbar(), 
                TopScrollerShadow(), 
                BottomScrollerShadow(),    
            ]                     
        }),
        new Container({ 
            top: 0, height: 30, left: 0, right: 0, skin: darkGraySkin, 
            style: titleStyle, 
            contents: [
                new Label({ string: "What are you eating today?", style: normalText }),
            ]
        })
    ]
}));

const tealColors = ['#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40',
					'#00695C', '#00796B', '#00897B', '#009688'];


let contentToScrollVertically = new Column({ 
    top: 0, left: 0, right: 0,
    contents:
    	itemLabels.map((label, index) => 
            new Container({ top: 0, height: 40, left: 0, right: 0, active: true,
            	skin: new Skin({
		                  fill: tealColors[index % tealColors.length]
		                }),
			    behavior: Behavior({
			        onTouchEnded: function(content){
			        	switchScreens(new Screen2Template({i: items[index]}))
			        },
			    }),
            contents: [label] }))
});

export const firstScreen = new firstScreenTemplate({ contentToScrollVertically });

let currentScreen = firstScreen;

export default function switchScreens(newScreen) {
	application.remove(currentScreen);
	currentScreen = newScreen;
	application.add(currentScreen)
}


application.add(currentScreen);


















