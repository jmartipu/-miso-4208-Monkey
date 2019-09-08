function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var horde = window.gremlins.createHorde()
      .gremlin(gremlins.species.clicker().clickTypes(['click'])
      .canClick(function(element){
        if (((element.type != 'a') && (element.type != 'button')))
        {
          return false;
        }else{
          return true;
        }
      }))
      .gremlin(gremlins.species.formFiller()
      .canFillElement(function(element){
        var tagName = element.tagName.toLowerCase();
        if (tagName === 'textarea') return true;
        if (tagName !== 'input') return false;
        var type = element.getAttribute('type'),
            // if any of these input types is not supported by a browser, it will behave as input type text.
            inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']
        return inputTypes.indexOf(type) >= 0;
      }))
      .gremlin(gremlins.species.toucher())
      .gremlin(gremlins.species.scroller())
      .strategy(gremlins.strategies.distribution()
        .delay(50)
        .distribution([
          0.4, // first gremlin
          0.2, // second gremlin
          0.2, // third gremlin
          0.2, // fourth gremlin
        ])
      );

  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});