(function () {
  Drupal.behaviors.ypQABehavior = {
    attach: function (context, settings) {

      const buildMarkup = () => {
        const root = document.querySelector('body');
        const elDetails = document.createElement('details');
        const elSummary = document.createElement('summary');
        const elForm = document.createElement('form');
        document.querySelector('.dialog-off-canvas-main-canvas').classList.add('qa-root');

        elDetails.classList.add('qa-settings');

        // Add settings here to be rendered out
        const settings = [
          {
            name: 'Columns',
            id: 'columns',
            type: 'checkbox',
          },
          {
            name: 'Drupal Tabs',
            id: 'tabs',
            type: 'checkbox',
          },
          {
            name: 'Text',
            id: 'text',
            type: 'checkbox',
          },
          {
            name: 'List',
            id: 'list',
            type: 'checkbox',
          },
          {
            name: 'Component',
            id: 'component',
            type: 'checkbox',
          },
        ]

        // add title to details
        elSummary.innerText = 'QA'
        elDetails.append(elSummary);


        // create markup for each setting
        settings.forEach(setting => {
          // Create elements
          const elWrapper = document.createElement('label');
          const elCheck = document.createElement('input');
          const elLabel = document.createElement('span');

          // Set attributes
          elWrapper.setAttribute('for', `settings-${setting.id}`);
          elCheck.setAttribute('type', setting.type);
          elCheck.setAttribute('id', `settings-${setting.id}`)
          elCheck.setAttribute('name', `settings-${setting.id}`);
          elLabel.innerText = setting.name;

          // Append everything
          elWrapper.append(elCheck)
          elWrapper.append(elLabel);
          elForm.append(elWrapper);
        });

        // append tool to page
        elDetails.append(elForm);
        root.append(elDetails);
      }
      
      const initEventListeners = () => {
        const settingsInputs = document.querySelectorAll('.qa-settings input');
        settingsInputs.forEach(input => {
          input.addEventListener('click', function () {
            updateSettings(); 
          });
        });
      }

      const updateSettingsPageLoad = () => {
        const settingsInputs = document.querySelectorAll('.qa-settings input');
        const allCookies = document.cookie.split(';');
        const qaCookies = [];

        allCookies.forEach(cookie => {
          if (cookie.slice(1, 5) == 'ypqa' && cookie.slice(-4) == 'true') {
            // remove ypqa_  and =true from cookie and add to array
            qaCookies.push(cookie.slice(6).slice(0, -5));
          }
        });

        settingsInputs.forEach(input => {
          qaCookies.forEach(cookie => {
            if (input.name == cookie) {
              input.checked = true;
            }
          });
        });

        updateSettings();
      }

      const updateSettings = () => {
        const docBody = document.querySelector('.qa-root');
        const settingsInputs = document.querySelectorAll('.qa-settings input');

        settingsInputs.forEach(input => {
          if (input.checked) {
            docBody.classList.add(input.name);
            setCookie('ypqa_' + input.name, true);
          } else {
            docBody.classList.remove(input.name);
            eraseCookie('ypqa_' + input.name);
          }
        });
      }

      // cookie functions from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
      const setCookie = (name, value, days) => {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }

      const eraseCookie = (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

      buildMarkup();
      initEventListeners();
      updateSettingsPageLoad();
    }
  };
})();
