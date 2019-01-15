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

exports.getForm = function() {
    let form = {
        'email': {
          'placeholder': 'voorbeeld@zaanstad.nl',
          'label': 'Emailadres waar de bestanden naartoe gestuurd worden:',
          'id': 'email',
        },
        'besluittype': {
            'label': 'Welk type besluit betreft het?',
            'id': 'besluittype',
            'options': ['Ontwerpbestemmingsplan', 'Vaststelling Bestemmingsplan'],
        },
        'plannaam': {
            'label': 'Naam van het plan:',
            'id': 'plannaam',
            'description': 'Plannaam, zonder bestemmingsplan ervoor. Dus Pauwenven en niet bestemmingsplan Pauwenven'
        },
        'besluitdatum': {
            'label': 'Besluitdatum',
            'id': 'besluitdatum',
        },
        'stednummer': {
            'label': 'Laatste gedeelte van de IMRO code:',
            'placeholder': 'STED3837BP-0301',
            'id': 'stednummer',
        },
        'verseonnummer': {
            'label': 'Verseonnummer:',
            'placeholder': '2018/26780',
            'id': 'verseonnummer',
        },
        'omschrijving1': {
            'label': 'Korte omschrijving van het plan:',
            'rows': '5',
            'id': 'omschrijving1',
            'description': 'Dit moet een korte beschrijving zijn die in de eerste alinea van de publicatie komt te staan. Wat kenmerkt dit besluit? Maakt het woningbouw mogelijk? Is het een technische aanpassing?',
            'placeholder': 'Het plan voorziet een planologisch kader voor de ontwikkeling van 150 woningen.'
        },
        'locatie_omschrijving': {
            'label': 'Omschrijving van de locatie:',
            'id': 'locatie_omschrijving',
            'rows': '5',
            'placeholder': 'Het plangebied wordt globaal begrensd door: de Dorpsstraat in het noorden, de Bakkerstraat in het oosten, de Kerkstraat in het zuiden en de Molenstraat in het westen.'
        },
        'publicatiedatum': {
            'label': 'Verwachte datum van publicatie (woensdag):',
            'id': 'publicatiedatum',
        },
        'hasHGW': {
            'label': 'Wordt ook een (ontwerp)besluit hogere waarden bekendgemaakt?',
            'id': 'hasHGW',
            'options': ['Ja', 'Nee']
        },
        'besluitdatum_HGW': {
            'label': 'Besluitdatum van het hogere waarden besluit:',
            'id': 'besluitdatum_HGW',
        },
        'omschrijving_HGW': {
            'label': 'Korte omschrijving van het hogere waarden besluit:',
            'id': 'omschrijving_HGW',
            'rows': '5',
            'placeholder': 'De geluidbelasting als gevolg van het industrielawaai bedraagt op de gevel van de woning aan de Zadelstraat 14 54dB(A). Dit is hoger dan de voorkeursgrenswaarde van 50dB(A) die geldt voor nieuwe woningen. Daarom wordt voor deze woning een hogere grenswaarde vastgesteld.'
        },
        'hasCHW': {
            'label': 'Is op dit besluit de Crisis- en Herstelwet van toepassing?',
            'id': 'hasCHW',
            'options': ['Ja', 'Nee'],
            'description': 'Voor sommige ontwikkelingen heeft de wetgever bepaald dat een bestemmingsplan automatisch onder de Chw valt.'
        },
        'hasGewijzigd': {
            'label': 'Is het bestemmingsplan bij de vaststelling gewijzigd ten opzichte van het ontwerp?',
            'id': 'hasGewijzigd',
            'options': ['Ja', 'Nee']
        },
        'hasMER': {
            'label': 'Is uit de m.e.r.-beoordeling gebleken dat er geen m.e.r.-procedure noodzakelijk is?',
            'id': 'hasMER',
            'options': ['Ja', 'Nee']
        },
        'hasInloop': {
            'label': 'Wordt er voor dit plan een inloop-/informatieavond georganiseerd?',
            'id': 'hasInloop',
            'options': ['Ja', 'Nee']
        },
        'omschrijving_inloop': {
            'label': 'Uitnodigingstekst voor de inloop-/informatieavond:',
            'placeholder': 'Op 1 januari 2020 wordt een inloopavond georganiseerd waar u een toelichting kunt krijgen op het plan. De avond vindt plaats van 19:00 tot 20:00 in buurtcentrum De Enthousiaste Kabouter, Dorpsstraat 101 te Zaandam',
            'id': 'omschrijving_inloop',
            'rows': '5'
        },
        'contactpersoon': {
            'label': 'Contactpersoon voor vragen en mondelinge zienswijzen:',
            'placeholder': 'J. de Vries',
            'id': 'contactpersoon',
        },
        'bereikbaarheid_contactpersoon': {
            'label': 'Wanneer is de contactpersoon bereikbaar?',
            'placeholder': '10:00 en 10:30, behalve op woensdagen,',
            'id': 'bereikbaarheid_contactpersoon',
        },
        'aanhef_contactpersoon': {
            'label': 'Aanhef van de contactpersoon:',
            'id': 'aanhef_contactpersoon',
            'options': ['dhr.', 'mevr.']
        },
      }
    
    for (let key in form) {
        if (form[key].description) {
            form[key].idHelp = form[key].id + 'Help';
        }
        if (form[key].id === 'email') {
            form[key].type = 'email';
        } else if (form[key].id.includes('datum')) {
            form[key].type = 'date';
        } else if (!form[key].id) {
            form[key].type = 'text';
        }
    }  

    console.log(form);
    return form;
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