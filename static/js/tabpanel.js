let timer;

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.p-hero-tab__item');

  // Add a click event handler to each tab
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      const target = e.target.closest('.p-hero-tab__item');
      changeTabs(target);
    });
  });

  // Select the inital active tab
  const initalActiveTab = document.querySelector('.p-hero-tab__item[aria-selected="true"]');
  if (initalActiveTab) {
    playTab(initalActiveTab);
  }
});

function changeTabs(target) {
  const tabs = document.querySelectorAll('.p-hero-tab__item');
  const panels = document.querySelectorAll('.p-hero-panel');
  clearInterval(timer);

  // Remove all current selected tabs
  tabs.forEach(tab => {
    draw(0, tab.querySelector('.before'));
    tab.setAttribute('aria-selected', false);
  });

  // Set this tab as selected
  target.setAttribute('aria-selected', true);

  // Hide all tab panels
  panels.forEach(panel => panel.classList.remove('u-animate--reveal'));

  // Show the selected panel
  document
    .querySelector(`#${target.getAttribute('aria-controls')}`)
    .classList.add('u-animate--reveal');

  playTab(target);
}

function playTab(tab) {
  const start = Date.now();
  const duration = 20000;
  const tabIndicator = tab.querySelector('.before');
  if (tabIndicator) {
    timer = setInterval(function() {
      const timePassed = Date.now() - start;
      if (timePassed >= duration) {
        clearInterval(timer);
        triggerNextTab(tab);
        return;
      }
      draw(timePassed / (duration / 100), tabIndicator);
    }, 20);
  }
}

function draw(timePassed, tab) {
  tab.style.width = timePassed + '%';
}

function triggerNextTab(tab) {
  let nextTab = tab.nextElementSibling;
  if (!nextTab) {
    nextTab = document.querySelectorAll('.p-hero-tab__item')[0];
  }
  changeTabs(nextTab);
}
