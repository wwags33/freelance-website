const breakpointMd = "768px";

window.particlesJS.load("particles-js", "./particles.json", function() {
  console.log("particles.js config loaded");
});

/**
 * Collapse dropdown on init and resize by checking the checkbox.
 * Add/remove tabindex on menu links when expanded/collapsed.
 * Trigger check/uncheck when label is clicked (automatic) and when enter or space is pressed.
 */
function headerInit() {
  const queryBreakpointMd = window.matchMedia(`(max-width: ${breakpointMd})`);

  const menuLinks = document.querySelectorAll(".nav-bar__link");
  const untabLinks = () => menuLinks.forEach(a => (a.tabIndex = "-1"));
  const tabLinks = () => menuLinks.forEach(a => (a.tabIndex = "0"));

  const menuCheckbox = document.querySelector(".nav-bar__dropdown input");
  const menuIconLabel = document.querySelector(".nav-bar__dropdown label");

  // Collapse menu on init and resize (if below md breakpoint).
  function initMenu() {
    if (queryBreakpointMd.matches) {
      menuCheckbox.checked = true;
      menuIconLabel.setAttribute("aria-expanded", false);
      menuIconLabel.setAttribute("aria-label", "Open menu");
      untabLinks();
    } else {
      menuCheckbox.checked = true;
      tabLinks();
    }
  }

  window.addEventListener("resize", initMenu);

  // Helpers to handle the a11y adjustments.
  function expandMenuA11y() {
    menuIconLabel.setAttribute("aria-expanded", true);
    menuIconLabel.setAttribute("aria-label", "Close menu");
    tabLinks();
  }

  function collapseMenuA11y() {
    menuIconLabel.setAttribute("aria-expanded", false);
    menuIconLabel.setAttribute("aria-label", "Open menu");
    untabLinks();
  }

  menuCheckbox.addEventListener("change", () => {
    if (menuCheckbox.checked) {
      collapseMenuA11y();
    } else {
      expandMenuA11y();
    }
  });

  // Add other "button" activators to label.
  menuIconLabel.addEventListener("keydown", event => {
    if (
      event.key === " " ||
      event.key === "Enter" ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      if (menuCheckbox.checked) {
        menuCheckbox.checked = false;
        expandMenuA11y();
      } else {
        menuCheckbox.checked = true;
        collapseMenuA11y();
      }
    }
  });

  initMenu();
}
window.addEventListener("load", headerInit);

/**
 * TBD
 */
function heroInit() {
  const SWITCHER_DELAY = 2000;
  const switchItems = document.querySelectorAll(".make-box__switch-item");
  function switcheroo() {
    switchItems.forEach(si => {
      switch (si.dataset.face) {
        case "front":
          si.dataset.face = "front-bottom";
          break;
        case "front-bottom":
          si.dataset.face = "bottom";
          break;
        case "bottom":
          si.dataset.face = "back-bottom";
          break;
        case "back-bottom":
          si.dataset.face = "back";
          break;
        case "back":
          si.dataset.face = "back-top";
          break;
        case "back-top":
          si.dataset.face = "top";
          break;
        case "top":
          si.dataset.face = "front-top";
          break;
        case "front-top":
          si.dataset.face = "front-around";
          setTimeout(() => (si.dataset.face = "front"), SWITCHER_DELAY / 2);
          break;
      }
    });
  }

  function switcherooLoop() {
    switcheroo();
    setTimeout(switcherooLoop, SWITCHER_DELAY);
  }

  setTimeout(switcherooLoop, SWITCHER_DELAY);
}
window.addEventListener("load", heroInit);

// function smoothScrollInit() {
//   document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])').forEach((localLink) =>{
//     localLink.onclick = function(event) {

//     };
//   });

// }
// window.addEventListener("load", smoothScrollInit);

$(function() {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
});
