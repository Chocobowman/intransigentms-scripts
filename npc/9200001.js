/*
 * Mad Bunny
 * ID: 9200001
 *
 * Quest ID: 1000
 */

var status;
var id = 1000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === -1) {
        cm.dispose();
        return;
    }
    if (mode === 0 && status === 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk(cm.randomText(3));
                cm.dispose();
                return;
            } else if (id - 1000 === cm.getStory()) {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            } else {
                cm.sendOk(cm.randomText(1));
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            cm.sendAcceptDecline(cm.getPlayer().getCQuest().loadInfo(id));
        } else if (status === 2) {
            cm.startCQuest(id);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(id)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + cm.getPlayer().getCQuest().getTitle() + cm.randomText(5));
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
        } else if (status === 1) {
            cm.sendOk(cm.showReward(cm.randomText(2)));
        } else if (status === 2) {
            cm.rewardPlayer(1, 0);
            cm.getPlayer().sendHint(cm.randomText(6));
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(id) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(id, cm.randomText(1)));
            }
        } else if (status === 1) {
            cm.sendYesNo(cm.randomText(7));
        } else if (status === 2) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        }
    }
}
