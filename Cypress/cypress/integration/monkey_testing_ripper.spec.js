describe('Los estudiantes under monkeys', function() {

    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(20);
    })

});

function randomEvent(monkeysLeft) {
    cy.log("ejecuta monkey " + monkeysLeft.toString());
    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        executeRandomEvent(0);
        monkeysLeft = monkeysLeft - 1;
        cy.wait(3000);
        randomEvent(monkeysLeft);
    }
}

function executeRandomEvent(intento) {
    let min = 0;
    let max = 5;
    let option = getRandomInt(min, max);
    cy.log("opcion " + option.toString());
    if (intento <= 5){
        if(option === 0){
            cy.get('body').then(($body) => {if ($body.find('a').length) {return $body.find('a').length} return 0})
                .then((selector) => {
                    cy.wait(2000);
                    if (selector <= 1){
                        cy.log("no existe a");
                        intento = intento + 1;
                        executeRandomEvent(intento);
                    }else {
                        cy.log("ejecuta a");
                        cy.log(selector.toString());
                        randomLinkClick();
                    }
                });
        }else if(option === 1){
            cy.get('body').then(($body) => {if ($body.find('input[class="jsx-2777811044 form-control"]').length) {return $body.find('input[class="jsx-2777811044 form-control"]').length} return 0})
                .then((selector) => {
                    cy.wait(2100);
                    if (selector <= 1){
                        cy.log("no existe input");
                        intento = intento + 1;
                        executeRandomEvent(intento);
                    }else{
                        cy.log("type en input");
                        cy.log(selector.toString());
                        randomText('input[class="jsx-2777811044 form-control"]');
                    }
                });
        }else if(option === 2){
            cy.get('body').then(($body) => {if ($body.find('select').length) { return $body.find('select').length;} return 0})
                .then((selector) => {
                    cy.wait(2200);
                    if (selector <= 0){
                        cy.log("no existe select");
                        intento = intento + 1;
                        executeRandomEvent(intento);
                    }else{
                        cy.log("select en select");
                        cy.log(selector.toString());
                        randomCombo();
                    }
                });
        }else if(option === 3){
            cy.get('body').then(($body) => {if ($body.find('button').length) {return $body.find('button').length} return 0})
                .then((selector) => {
                    cy.wait(2300);
                    if (selector <= 1){
                        cy.log("no existe button");
                        intento = intento + 1;
                        executeRandomEvent(intento);
                    }else{
                        cy.log("clic en button");
                        cy.log(selector.toString());
                        randomButtonClick();
                    }
                });
        }else if(option === 4) {
            cy.get('body').then(($body) => {
                if ($body.find('input[type="text"]').length) {
                    return $body.find('input[type="text"]').length
                }
                return 0
            })
                .then((selector) => {
                    cy.wait(2400);
                    if (selector <= 1) {
                        cy.log("no existe input");
                        intento = intento + 1;
                        executeRandomEvent(intento);
                    } else {
                        cy.log("type en input");
                        cy.log(selector.toString());
                        randomText('input[type="text"]');
                    }
                });
        }
    }else {
        cy.visit('https://losestudiantes.co');
        cy.wait(3000);
        return 0;
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomLinkClick() {
    cy.get('a').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
        }
    });
}

function randomText(style) {
    cy.get(style).then($inputs => {
        if($inputs.length > 0) {
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            if (!Cypress.dom.isHidden(randomInput)) {
                cy.wrap(randomInput).click({force: true}).type(generateRandomString(10),{force: true});
            }
        }
    });
}

function generateRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function randomButtonClick() {
    cy.get('button').then($buttons => {
        var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
        if(!Cypress.dom.isHidden(randomButton)) {
            cy.wrap(randomButton).click({force: true});
        }
    });
};

function randomCombo() {
    cy.get('select').then($select => {
        var randomSelect = $select.get(getRandomInt(0, $select.length));
        if(!Cypress.dom.isHidden(randomSelect)) {
             cy.wrap(randomSelect).children('option').eq(getRandomInt(0, randomSelect.options.length)).then(e => {
                 cy.wrap(randomSelect).select(e.val(), {force: true});
             });
         }

    // cy.get('div[class="Select-placeholder"]').then($select => {
    //     cy.log("antes de clic");
    //     $select.click();
    //     cy.log("antes de get input");
    //     cy.get('input').type(generateRandomString(1));
    //     cy.log("antes de wait");
    //     cy.wait(5000);
        // if(!Cypress.dom.isHidden(randomSelect)) {
        //     cy.log("antes de select");
        //     cy.wrap(randomSelect).children('option').eq(getRandomInt(0, randomSelect.options.length)).then(e => {
        //         cy.wrap(randomSelect).select(e.val());
        //     });
        // }
    });
};