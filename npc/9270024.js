load('nashorn:mozilla_compat.js');
/* 	Kelvin
	SingaPore VIP Face changer
	Made by aaron and cody 
*/
var status = 0;
var beauty = 0;
var mface = Array(20109, 20110, 20106, 20108, 20112, 20013);
var fface = Array(21021, 21009, 21010, 21006, 21008, 21012);
var facenew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) 
        cm.dispose();
     else {
        if (mode == 0 && status == 0)
            cm.dispose();

        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("Let's see...I can totally transform your face into something new. Don't you want to try it? For #b#t5152038##k, you can get the face of your liking. Take your time in choosing the face of your preference...\r\n\#L2#Let me get my dream face!#l");
            cm.dispose();
        } else if (selection == 2) {
            facenew = Array();
            if (cm.getChar().getGender() == 0) {
                for(var i = 0; i < mface.length; i++)
                    facenew.push(mface[i] + cm.getChar().getFace()% 1000 - (cm.getChar().getFace()% 100));
            }
            if (cm.getChar().getGender() == 1) {
                for(var i = 0; i < fface.length; i++) {
                    facenew.push(fface[i] + cm.getChar().getFace()% 1000 - (cm.getChar().getFace()% 100));
                }
            }
            cm.sendStyle("Let's see... I can totally transform your face into something new. Don't you want to try it? For #b#t5152038##k, you can get the face of your liking. Take your time in choosing the face of your preference...", facenew);
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152038)){
                cm.gainItem(5152038, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("Enjoy your new and improved face!");
            } else {
                cm.sendOk("Hmm ... it looks like you don't have the coupon specifically for this place. Sorry to say this, but without the coupon, there's no plastic surgery for you...");
            }
        }
    }
}