/*
 * Quote forms: posts any <form data-quote-form> to the existing HubSpot form
 * "ISZ Challenge Coin Quote" through HubSpot's public submission endpoint.
 * The portal ID and form ID are public identifiers, not secrets.
 */
(function () {
  'use strict';

  var PORTAL_ID = '45290400';
  var FORM_ID = '59a8ff17-176a-49b6-b1bb-c24ff83c21ce';
  var ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + FORM_ID;

  function value(form, name) {
    var el = form.elements[name];
    return el && typeof el.value === 'string' ? el.value.trim() : '';
  }

  function buildFields(form) {
    var fields = [];
    function add(name, val) {
      if (val !== '') fields.push({ objectTypeId: '0-1', name: name, value: val });
    }

    add('firstname', value(form, 'firstname'));
    add('lastname', value(form, 'lastname'));
    add('email', value(form, 'email'));
    add('company', value(form, 'company'));
    add('quote_product_type', value(form, 'quote_product_type'));
    add('quote_quantity', value(form, 'quote_quantity'));

    // HubSpot date properties take midnight UTC in milliseconds.
    var date = value(form, 'quote_delivery_date');
    if (date) {
      var ms = Date.parse(date + 'T00:00:00Z');
      if (!isNaN(ms)) add('quote_delivery_date', String(ms));
    }

    var notes = value(form, 'quote_customer_notes');
    var source = form.getAttribute('data-source') || 'isz.one';
    add('quote_customer_notes', (notes ? notes + '\n\n' : '') + '[Submitted from: ' + source + ']');
    return fields;
  }

  function setStatus(form, message, isError) {
    var status = form.querySelector('.quote-form-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', !!isError);
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;

    // Honeypot: real visitors never fill this hidden field.
    if (value(form, 'website')) return;
    if (!form.reportValidity()) return;

    var button = form.querySelector('button[type="submit"]');
    var label = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = 'Sending...'; }
    setStatus(form, '', false);

    var payload = {
      fields: buildFields(form),
      context: { pageUri: window.location.href, pageName: document.title }
    };

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HubSpot returned ' + response.status);
        var done = document.createElement('div');
        done.className = 'quote-form-success';
        done.setAttribute('role', 'status');
        done.innerHTML = '<h3>Request received</h3><p>Thank you. We will reply within 24 hours with a quote and next steps. ' +
          'If you have artwork, reply to our email with it attached.</p>';
        form.replaceWith(done);
      })
      .catch(function () {
        if (button) { button.disabled = false; button.textContent = label; }
        setStatus(form, 'That did not go through. Please try again, or email sales@isz.one.', true);
      });
  }

  var forms = document.querySelectorAll('form[data-quote-form]');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', handleSubmit);
  }
})();
