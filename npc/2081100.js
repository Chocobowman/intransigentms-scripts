/*
 * Harmonia
 * 4th job warrior instructor
 *
 * ID: 2081100
 */

var status;
var ids = [3000, 3001, 3002, 3003, 3004];
var skills = [[[3121003, 30], [3221007, 20], [2121007, 20], [2221007, 20], [2321002, 30], [5121005, 20], [5221003, 20], [4120005, 30], [4220005, 30], [1121001, 30], [1221001, 30], [1321001, 30]], [[3120005, 30], [3221007, 30], [2121002, 30], [2221002, 30], [2321008, 20], [5121007, 30], [5221004, 20], [4121007, 20], [4221001, 30], [1121006, 30], [1221007, 30], [1321003, 30]], [[3121004, 30], [3221003, 30], [2121003, 30], [2221003, 30], [2321007, 30], [5121005, 30], [5221004, 30], [4121007, 30], [4221007, 30], [1221009, 30], [1121008, 30]], [[3221001, 30], [2121001, 30], [2221001, 30], [2321001, 30], [5121004, 20], [5221003, 30], [4121004, 30], [4221004, 30], [1221011, 20]], [[3220004, 30], [2121007, 30], [2221007, 30], [2321008, 30], [5121004, 30], [5221007, 20], [4121008, 30], [1221011, 30]]];
var qualifies, idon, reward;

function contains(a, o) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] === o) {
            return true;
        }
    }
    return false;
}

function start() {
    idon = ids[0] + cm.getOffenseStory();
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var p = cm.getPlayer();
    var rewards, i, hasquest;
    if (mode < 0) {
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    if (p.getLevel() < 120) {
        cm.sendOk("Come back to me when you are much stronger.");
        cm.dispose();
        return;
    } else if (p.getJob().getId() % 10 !== 2) {
        cm.sendOk("If you are looking to make your fourth job advancement, please talk to your instructor in #bVictoria Island#k.");
        cm.dispose();
        return;
    }
    if (!cm.onQuest()) {
        if (status === 0) {
            if (mode === 0) {
                cm.sendOk("Bye, then.");
                cm.dispose();
                return;
            } else if (contains(ids, idon)) {
                rewards = skills[idon - ids[0]];
                hasquest = false;
                for (i = 0; i < rewards.length; ++i) {
                    if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                        hasquest = true;
                        break;
                    }
                }
                if (hasquest) {
                    cm.sendSimple(cm.selectQuest(idon, "I can train you to fight with enormous strength."));
                } else {
                    cm.sendOk("Your training with me is finished. You are an apprentice to no one now.");
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk("#enods#n");
                cm.dispose();
                return;
            }
        } else if (status === 1) {
            if (mode === 0) {
                cm.sendOk("Fine.");
                cm.dispose();
                return;
            } else {
                rewards = skills[idon - ids[0]];
                for (i = 0; i < rewards.length; ++i) {
                    if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                        hasquest = true;
                        break;
                    }
                }
                cm.sendAcceptDecline(p.getCQuest().loadInfo(idon));
            }
        } else if (status === 2) {
            if (mode === 0) {
                cm.sendOk("Ok.");
                cm.dispose();
                return;
            }
            cm.startCQuest(idon);
            cm.dispose();
            return;
        }
    } else if (!cm.onQuest(idon)) {
        if (status === 0) {
            cm.sendYesNo(cm.randomText(4) + p.getCQuest().getTitle() + cm.randomText(5));
        } else if (status === 1) {
            cm.startCQuest(0);
            cm.dispose();
            return;
        } 
    } else if (cm.onQuest(idon) && cm.canComplete()) {
        if (status === 0) {
            cm.sendSimple(cm.selectQuest(idon, "Well what have we here?")); 
        } else if (status === 1) {
            rewards = skills[idon - ids[0]];
            for (i = 0; i < rewards.length; ++i) {
                if (Math.floor(rewards[i][0] / 10000) === p.getJob().getId()) {
                    reward = rewards[i];
                    break;
                }
            }
            if (p.getMasterLevelById(reward[0]) >= reward[1] - 10) {
                qualifies = true;
            } else {
                qualifies = false;
            }
            if (qualifies) {
                cm.sendOk(cm.showReward("Excellent. Excercise this newfound strength wisely.\r\n\r\n#eNew skill master level achieved: #r" + cm.getSkillNameById(reward[0]) + "#k #b" + reward[1] + "#k#n"));
            } else {
                cm.sendOk("You don't have the requisite skill master levels to complete this quest! Come back to me when you've got a master level of at least #b" + (reward[1] - 10) + "#k in the #r" + cm.getSkillNameById(reward[0]) + "#k skill.");
                cm.dispose();
                return;
            }
        } else if (status === 2) {
            p.setMasterLevel(reward[0], reward[1]);
            cm.fourthRewardPlayer(1, 0);
            p.sendHint(cm.randomText(6));
            cm.dispose();
            return;
        }
    } else if (cm.onQuest(idon) && !cm.canComplete()) {
        if (status === 0) {
            if (mode === 0) {
                cm.dispose();
                return;
            } else {
                cm.sendSimple(cm.selectQuest(idon, "I can make you... so much more powerful."));
            }
        } else if (status === 1) {
            cm.sendOk("This is what I need from you:\r\n\r\n" + p.getCQuest().loadInfo(idon));
        } else if (status === 2) {
            cm.dispose();
            return;
        }
    }
}
