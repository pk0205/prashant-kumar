/**
 * Template Name: iPortfolio - v1.5.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  "use strict";

  // Hero typed
  if ($(".typed").length) {
    var typed_strings = $(".typed").data("typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on("click", ".nav-menu a, .scrollto", function (e) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        var scrollto = target.offset().top;

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass(
      "icofont-navigation-menu icofont-close"
    );
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").toggleClass(
          "icofont-navigation-menu icofont-close"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Skills section
  $(".skills-content").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    }
  );

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    status.classList.remove("sent-message");
    status.classList.remove("error-message");
    status.classList.add("sent-message");
    status.innerHTML = "Thanks! Your message has been sent";
  }

  function error() {
    status.classList.remove("sent-message");
    status.classList.remove("error-message");
    status.classList.add("error-message");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

// Example words with priority levels
const word_arrays = [
  { text: "React", weight: 25 },
  { text: "TypeScript", weight: 20 },
  { text: "JavaScript", weight: 20 },
  { text: "Jest", weight: 19 },
  { text: "C++", weight: 18 },
  { text: "React Native", weight: 17 },
  { text: "Node.js", weight: 15 },
  { text: "Go", weight: 15 },
  { text: "SQL", weight: 15 },
  { text: "MongoDb", weight: 14 },
  { text: "Express", weight: 13 },
  { text: "Next", weight: 12 },
  { text: "Fusion", weight: 11 },
  { text: "HTML", weight: 10 },
  { text: "CSS", weight: 10 },
  { text: "Python", weight: 3 },
  { text: "Java", weight: 3 },
  { text: "Comuter vision", weight: 3 },
];

(function ($) {
  "use strict";
  $.fn.jQCloud = function (word_array, options) {
    // Reference to the container element
    var $this = this;
    // Namespace word ids to avoid collisions between multiple clouds
    var cloud_namespace =
      $this.attr("id") || Math.floor(Math.random() * 1000000).toString(36);

    // Default options value
    var default_options = {
      width: $this.width(),
      height: $this.height(),
      center: {
        x: (options && options.width ? options.width : $this.width()) / 2.0,
        y: (options && options.height ? options.height : $this.height()) / 2.0,
      },
      delayedMode: word_array.length > 50,
      shape: false, // It defaults to elliptic shape
      encodeURI: true,
      removeOverflowing: true,
    };

    options = $.extend(default_options, options || {});

    // Add the "jqcloud" class to the container for easy CSS styling, set container width/height
    $this.addClass("jqcloud").width(options.width).height(options.height);

    // Container's CSS position cannot be 'static'
    if ($this.css("position") === "static") {
      $this.css("position", "relative");
    }

    var drawWordCloud = function () {
      // Helper function to test if an element overlaps others
      var hitTest = function (elem, other_elems) {
        // Pairwise overlap detection
        var overlapping = function (a, b) {
          if (
            Math.abs(
              2.0 * a.offsetLeft +
                a.offsetWidth -
                2.0 * b.offsetLeft -
                b.offsetWidth
            ) <
            a.offsetWidth + b.offsetWidth
          ) {
            if (
              Math.abs(
                2.0 * a.offsetTop +
                  a.offsetHeight -
                  2.0 * b.offsetTop -
                  b.offsetHeight
              ) <
              a.offsetHeight + b.offsetHeight
            ) {
              return true;
            }
          }
          return false;
        };
        var i = 0;
        // Check elements for overlap one by one, stop and return false as soon as an overlap is found
        for (i = 0; i < other_elems.length; i++) {
          if (overlapping(elem, other_elems[i])) {
            return true;
          }
        }
        return false;
      };

      // Make sure every weight is a number before sorting
      for (var i = 0; i < word_array.length; i++) {
        word_array[i].weight = parseFloat(word_array[i].weight, 10);
      }

      // Sort word_array from the word with the highest weight to the one with the lowest
      word_array.sort(function (a, b) {
        if (a.weight < b.weight) {
          return 1;
        } else if (a.weight > b.weight) {
          return -1;
        } else {
          return 0;
        }
      });

      var step = options.shape === "rectangular" ? 18.0 : 2.0,
        already_placed_words = [],
        aspect_ratio = options.width / options.height;

      // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
      var drawOneWord = function (index, word) {
        // Define the ID attribute of the span that will wrap the word, and the associated jQuery selector string
        var word_id = cloud_namespace + "_word_" + index,
          word_selector = "#" + word_id,
          angle = 6.28 * Math.random(),
          radius = 0.0,
          // Only used if option.shape == 'rectangular'
          steps_in_direction = 0.0,
          quarter_turns = 0.0,
          weight = 5,
          custom_class = "",
          inner_html = "",
          word_span;

        // Extend word html options with defaults
        word.html = $.extend(word.html, { id: word_id });

        // If custom class was specified, put them into a variable and remove it from html attrs, to avoid overwriting classes set by jQCloud
        if (word.html && word.html["class"]) {
          custom_class = word.html["class"];
          delete word.html["class"];
        }

        // Check if min(weight) > max(weight) otherwise use default
        if (word_array[0].weight > word_array[word_array.length - 1].weight) {
          // Linearly map the original weight to a discrete scale from 1 to 10
          weight =
            Math.round(
              ((word.weight - word_array[word_array.length - 1].weight) /
                (word_array[0].weight -
                  word_array[word_array.length - 1].weight)) *
                9.0
            ) + 1;
        }
        word_span = $("<span>")
          .attr(word.html)
          .addClass("w" + weight + " " + custom_class);

        // Append link if word.url attribute was set
        if (word.link) {
          // If link is a string, then use it as the link href
          if (typeof word.link === "string") {
            word.link = { href: word.link };
          }

          // Extend link html options with defaults
          if (options.encodeURI) {
            word.link = $.extend(word.link, {
              href: encodeURI(word.link.href).replace(/'/g, "%27"),
            });
          }

          inner_html = $("<a>").attr(word.link).text(word.text);
        } else {
          inner_html = word.text;
        }
        word_span.append(inner_html);

        // Bind handlers to words
        if (!!word.handlers) {
          for (var prop in word.handlers) {
            if (
              word.handlers.hasOwnProperty(prop) &&
              typeof word.handlers[prop] === "function"
            ) {
              $(word_span).bind(prop, word.handlers[prop]);
            }
          }
        }

        $this.append(word_span);

        var width = word_span.width(),
          height = word_span.height(),
          left = options.center.x - width / 2.0,
          top = options.center.y - height / 2.0;

        // Save a reference to the style property, for better performance
        var word_style = word_span[0].style;
        word_style.position = "absolute";
        word_style.left = left + "px";
        word_style.top = top + "px";

        while (hitTest(word_span[0], already_placed_words)) {
          // option shape is 'rectangular' so move the word in a rectangular spiral
          if (options.shape === "rectangular") {
            steps_in_direction++;
            if (
              steps_in_direction * step >
              (1 + Math.floor(quarter_turns / 2.0)) *
                step *
                ((quarter_turns % 4) % 2 === 0 ? 1 : aspect_ratio)
            ) {
              steps_in_direction = 0.0;
              quarter_turns++;
            }
            switch (quarter_turns % 4) {
              case 1:
                left += step * aspect_ratio + Math.random() * 2.0;
                break;
              case 2:
                top -= step + Math.random() * 2.0;
                break;
              case 3:
                left -= step * aspect_ratio + Math.random() * 2.0;
                break;
              case 0:
                top += step + Math.random() * 2.0;
                break;
            }
          } else {
            // Default settings: elliptic spiral shape
            radius += step;
            angle += (index % 2 === 0 ? 1 : -1) * step;

            left =
              options.center.x -
              width / 2.0 +
              radius * Math.cos(angle) * aspect_ratio;
            top = options.center.y + radius * Math.sin(angle) - height / 2.0;
          }
          word_style.left = left + "px";
          word_style.top = top + "px";
        }

        // Don't render word if part of it would be outside the container
        if (
          options.removeOverflowing &&
          (left < 0 ||
            top < 0 ||
            left + width > options.width ||
            top + height > options.height)
        ) {
          word_span.remove();
          return;
        }

        already_placed_words.push(word_span[0]);

        // Invoke callback if existing
        if ($.isFunction(word.afterWordRender)) {
          word.afterWordRender.call(word_span);
        }
      };

      var drawOneWordDelayed = function (index) {
        index = index || 0;
        if (!$this.is(":visible")) {
          // if not visible then do not attempt to draw
          setTimeout(function () {
            drawOneWordDelayed(index);
          }, 10);
          return;
        }
        if (index < word_array.length) {
          drawOneWord(index, word_array[index]);
          setTimeout(function () {
            drawOneWordDelayed(index + 1);
          }, 10);
        } else {
          if ($.isFunction(options.afterCloudRender)) {
            options.afterCloudRender.call($this);
          }
        }
      };

      // Iterate drawOneWord on every word. The way the iteration is done depends on the drawing mode (delayedMode is true or false)
      if (options.delayedMode) {
        drawOneWordDelayed();
      } else {
        $.each(word_array, drawOneWord);
        if ($.isFunction(options.afterCloudRender)) {
          options.afterCloudRender.call($this);
        }
      }
    };

    // Delay execution so that the browser can render the page before the computatively intensive word cloud drawing
    setTimeout(function () {
      drawWordCloud();
    }, 10);
    return $this;
  };
})(jQuery);

$("#word-cloud").jQCloud(word_arrays, {
  width: 500,
  height: 350,
  afterCloudRender: function () {
    $("#word-cloud > span").on("click", function (e) {
      e.preventDefault();
      console.log(e.target.innerHTML);
      $(".detailed-tags").prepend(
        "<div class='tag'>" + e.target.innerHTML + "</div>"
      );
    });
  },
});
