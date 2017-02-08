/*
 * NPC Name:    Roger
 * Map(s):      Maple Road | Lower level of the Training Camp (2)
 * Description: Quest | Roger's Apple
 */

var MapleStat = Java.type("net.sf.odinms.client.MapleStat");

var status = -1;

function start(mode, type, selection) {
    if (mode === -1) {
        qm.dispose();
        return;
    } else {
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            qm.sendNext("Hey, Man~ What's up? Haha! I am Roger who can teach you adorable new Maplers lots of information.");
        } else if (status === 1) {
            qm.sendNextPrev("You are asking who made me do this? Ahahahaha!\r\nMyself! I wanted to do this and just be kind to you new travellers.");
        } else if (status === 2) {
            qm.sendAcceptDecline("So..... Let me just do this for fun! Abaracadabra~!");
        } else if (status === 3) {
            if (qm.getC().getTimesTalked(qm.getNpc()) === 0) {
                qm.getPlayer().setHp(25);
                qm.getPlayer().updateSingleStat(MapleStat.HP, 25);
            }
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            qm.sendNext("Surprised? If HP becomes 0, then you are in trouble. Now, I will give you #rRoger's Apple#k. Please take it. You will feel stronger. Open the Item window and double click to consume. Hey, it's very simple to open the Item window. Just press #bI#k on your keyboard.");
        } else if (status === 4) {
            qm.getC().setTimesTalked(qm.getNpc(), qm.getC().getTimesTalked(qm.getNpc()) + 1);
            qm.sendPrev("Please take all Roger's Apples that I gave you. You will be able to see the HP bar increasing. Please talk to me again when you recover your HP 100%.");
        } else if (status === 5) {
            qm.forceStartQuest();
            qm.dispose();
            return;
        }
    }
}

function end(mode, type, selection) {
    if (mode === -1) {
        qm.dispose();
        return;
    } else {
        if (mode === 1) {
            status++;
        } else {
            status--;
        }
        if (status === 0) {
            qm.sendNext("How easy is it to consume the item? Simple, right? You can set a #bhotkey#k on the right bottom slot. Haha you didn't know that! right? Oh, and if you are a beginner, HP will automatically recover itself as time goes by. Well, it takes time, but this is one of the strategies that beginners use.");
        } else if (status === 1) {
            qm.sendNextPrev("Alright! Now that you have learned quite a bit, I will give you a present. This is a must for your travel in Maple World, so thank me! Please use this under emergency cases!");
        } else if (status === 2) {
            qm.sendNextPrev("Okay, this is all I can teach you. I know it's sad, but it is time to say goodbye. Well, take care of yourself, and good luck my friend!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        } else if (status === 3) {
            qm.forceCompleteQuest();
            qm.gainExp(3 * qm.getC().getChannelServer().getExpRate() * qm.getPlayer().getAbsoluteXp());
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.dispose();
            return;
        }
    }
}