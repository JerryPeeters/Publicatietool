'use strict';

exports.formatDutchDates = function(obj) {
    let month = {
        0: 'januari',
        1: 'februari',
        2: 'maart',
        3: 'april',
        4: 'mei',
        5: 'juni',
        6: 'juli',
        7: 'augustus',
        8: 'september',
        9: 'oktober',
        10: 'november',
        11: 'december'
    }
    for (let key in obj) {
        if (obj[key] instanceof Date) {
            obj[key] = obj[key].getDate() 
                     + " "
                     + month[ obj[key].getMonth() ] 
                     + " "
                     + obj[key].getFullYear()
        }
    }
}

exports.setType = function(obj) {
    obj.type = obj.besluittype === 'Ontwerpbestemmingsplan' ? 'OntwerpBP' :
               obj.besluittype === 'Vaststelling bestemmingsplan' ? 'VastBP' :
               false;
}

exports.setTemplates = function(obj) {
    if (obj.type === 'OntwerpBP' || obj.type === 'VastBP') {
        
        let styles = ['Website', 'Stadsblad', 'Staatscourant'];
        obj.docs = {};
        for (let style of styles) {
            obj.docs[style] = {
                template: ('template_' + obj.type + style + '.docx'),
                outputName: (style + ' ' + obj.besluittype + ' ' + obj.name),
            }
        }
    }
    return obj;
}

exports.setTerms = function(obj) {
    let day = (1000*60*60*24);
    let sevenWeeks = (day*7*6);
  
    let date = new Date(obj.publicatiedatum);
    let dateStart = new Date( date.getTime() + day); //Plus 1 day
    let dateEnd = (obj.type === 'VastBP') ?
                   new Date(dateStart.getTime() + day + sevenWeeks) :
                   new Date(dateStart.getTime() + sevenWeeks);

    obj.besluitdatum = new Date(obj.besluitdatum);
    obj.publicatiedatum = date;
    obj.start_terinzagelegging = dateStart;
    obj.einde_terinzagelegging = dateEnd;
}