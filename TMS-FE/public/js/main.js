export function main() {
  jQuery(function($) {
    "use strict";

    // -------------------------------------------------------------
    //  Toggle Menu for Mobile
    // -------------------------------------------------------------

    mobileDropdown();

    function mobileDropdown() {
      if ($(".navbar-nav").length) {
        $(".navbar-nav .tl-dropdown").append(function() {
          return "<i class=\"fa fa-angle-down icon\" aria-hidden=\"true\"></i>";
        });
        $(".navbar-nav .tl-dropdown .icon").on("click", function() {
          $(this).parent("li, .tl-dropdown").children("ul, .tl-dropdown-menu").slideToggle();
        });
      }
    }

    // -------------------------------------------------------------
    // Search
    // -------------------------------------------------------------
    if ($(".search-icon").length > 0) {
      $(".search-icon").on("click", function(event) {
        $(".open-search").css("height", "100vh");
        return false;
      });
    }
    if ($(".close-search").length > 0) {
      $(".close-search").on("click", function(event) {
        $(".open-search").css("height", "0");
        return false;
      });
    }

    // -------------------------------------------------------------
    //  Jquery Ui priceRange
    // -------------------------------------------------------------
    if ($("#price_slider").length > 0) {
      $("#price_slider").slider({
        range: true,
        min: 0,
        max: 12980952,
        values: [ 0, 12980952 ],
        slide: function(event, ui) {
          $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
      });
      $("#amount").val("$" + $("#price_slider").slider("values", 0) + " - $" + $("#price_slider").slider("values", 1));
    }
    //area_slider
    if ($("#area_slider").length > 0) {
      $("#area_slider").slider({
        range: true,
        min: 0,
        max: 12980952,
        values: [ 0, 12980952 ],
        slide: function(event, ui) {
          $("#area_amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
      });
      $("#area_amount").val("$" + $("#area_slider").slider("values", 0) + " - $" + $("#area_slider").slider("values", 1));
    }
    // -------------------------------------------------------------
    // CounterUp
    // -------------------------------------------------------------
    if ($(".counter").length > 0) {
      $(".counter").counterUp({
        delay: 10,
        time: 1000
      });
    }

    // -------------------------------------------------------------
    //  Slick Slider
    // -------------------------------------------------------------
    if ($(".featured-slider").length > 0) {
      $(".featured-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"
      });
    }

    if ($(".property-slider").length > 0) {
      $(".property-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 475,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
    if ($(".blog-slider").length > 0) {
      $(".blog-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
    if ($(".brand-slider").length > 0) {
      $(".brand-slider").slick({
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 475,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
    if ($(".hot-flat-slider").length > 0) {
      $(".hot-flat-slider").slick({
        infinite: true,
        dots: true,
        arrows: false,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 10000,
        slidesToScroll: 1
      });
    }
    if ($(".testimonial-slider").length > 0) {
      $(".testimonial-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".testimonial-nav-slider"
      });
    }
    if ($(".testimonial-nav-slider").length > 0) {
      $(".testimonial-nav-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".testimonial-slider",
        dots: false,
        arrows: true,
        focusOnSelect: true,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      });
    }
    if ($(".team-slider").length > 0) {
      $(".team-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
    if ($(".property-details-slider").length > 0) {
      $(".property-details-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        asNavFor: ".details-slider-nav"
      });
    }
    if ($(".details-slider-nav").length > 0) {
      $(".details-slider-nav").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: ".property-details-slider",
        dots: false,
        arrows: true,
        focusOnSelect: true,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    }
    if ($(".branch-officer-slider").length > 0) {
      $(".branch-officer-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"
      });
    }
    if ($(".project-slider").length > 0) {
      $(".project-slider").slick({
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToScroll: 1,
        nextArrow: "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        prevArrow: "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>",
        responsive: [
          {
            breakpoint: 1665,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1375,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
    if ($(".lt-video a").length > 0) {
      // -------------------------------------------------------------
      //  MagnificPopup
      // -------------------------------------------------------------

      $(".lt-video a").magnificPopup({ type: "iframe" });

      $(".lt-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true
        }
      });
    }

    // -------------------------------------------------------------
    //  tab view change
    // -------------------------------------------------------------
    if ($(".lt-filter-form .list-view-tab").length > 0) {
      $(".lt-filter-form .list-view-tab").on("click", function() {
        $(".lt-filter-form .list-view-tab").addClass("active");
        $(".lt-filter-form .grid-view-tab").removeClass("active");
        $(".lt-filter-form").removeClass("grid-view-tab").addClass("list-view-tab");
      });
    }
    if ($(".lt-filter-form .grid-view-tab").length > 0) {
      $(".lt-filter-form .grid-view-tab").on("click", function() {
        $(".lt-filter-form .grid-view-tab").addClass("active");
        $(".lt-filter-form .list-view-tab").removeClass("active");
        $(".lt-filter-form").removeClass("list-view-tab").addClass("grid-view-tab");
      });
    }

    // -------------------------------------------------------------
    //  Smooth scrolling
    // -------------------------------------------------------------
    if ($(".mouse-icon").length > 0) {
      $(".mouse-icon").on("click", function() {
        $("html, body").animate(
          {
            scrollTop: $($(this).attr("href")).offset().top
          },
          700
        );
        return false;
      });
    }

    /*==============================================================*/
    // Slider Animationend
    /*==============================================================*/
    if ($("#home-slider, #property-carousel").length > 0) {
      function doAnimations(elems) {
        var animEndEv = "webkitAnimationEnd animationend";

        elems.each(function() {
          var $this = $(this),
            $animationType = $this.data("animation");
          $this.addClass($animationType).one(animEndEv, function() {
            $this.removeClass($animationType);
          });
        });
      }

      var $myCarousel = $("#home-slider, #property-carousel"),
        $firstAnimatingElems = $myCarousel.find(".item:first").find("[data-animation ^= 'animated']");

      $myCarousel.carousel();

      doAnimations($firstAnimatingElems);

      $myCarousel.carousel("pause");

      $myCarousel.on("slide.bs.carousel", function(e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
      });
    }

    /*==============================================================*/
    // niceSelect
    /*==============================================================*/
    if ($("select").length > 0) {
      $("select").niceSelect();
    }

    /*==============================================================*/
    // TheiaStickySidebar
    /*==============================================================*/
    if ($(".lt-sticky").length > 0) {
      $(".lt-sticky").theiaStickySidebar({
        additionalMarginTop: 0
      });
    }

    /*==============================================================*/
    // scrollTop
    /*==============================================================*/
    if ($(".menu-sticky").length > 0) {
      var ltTop = $(".menu-sticky").offset().top;

      $(window).scroll(function() {
        var window_top = $(window).scrollTop() - 0;
        if (window_top > ltTop) {
          if (!$(".menu-sticky").is(".fixed-top animated fadeInDown")) {
            $(".menu-sticky").addClass("fixed-top animated fadeInDown");
          }
        } else {
          $(".menu-sticky").removeClass("fixed-top animated fadeInDown");
        }
      });
    }

    /*==============================================================*/
    // Scroll Up
    /*==============================================================*/

    $("body").append(" <a id=\"scrollUp\" class=\"show\"></a> ");

    var btn = $("#scrollUp");

    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass("show");
      } else {
        btn.removeClass("show");
      }
    });

    btn.on("click", function(e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });

    /*==============================================================*/
    // toggler menu
    /*==============================================================*/
    if ($(".side-menu-content .tl-toggler").length > 0) {
      $(".side-menu-content .tl-toggler").click(function() {
        toggleMenu();
      });
    }

    function toggleMenu() {
      if ($(".side-menu-content").hasClass("active")) {
        $(".side-menu-content").removeClass("active");
      } else {
        $(".side-menu-content").addClass("active");
      }
    }

    /*==============================================================*/
    // Chart
    /*==============================================================*/
    if ($("#oneYear").length > 0) {
      var ctx = document.getElementById("oneYear");
      var ltChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [ "Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov" ],
          datasets: [
            {
              data: [ 1036, 2045, 1675, 2596, 2211, 2326, 3047, 3323, 2412, 2909, 1889 ],
              backgroundColor: [ "rgba(255, 99, 132, 0)" ],
              borderColor: "#079bee",
              borderWidth: 2,
              borderHoverWidth: 2,
              pointBackgroundColor: "#ffffff",
              pointHoverBackgroundColor: "#ffffff",
              pointBorderWidth: 2,
              pointHoverBorderWidth: 2,
              pointBorderColor: "#179bee",
              pointHoverBorderColor: "#179bee",
              pointRadius: 8,
              pointHoverRadius: 8
            }
          ]
        },
        defaults: {
          global: {
            defaultFontFamily: "'Oxanium'"
          }
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true
                },
                ticks: {
                  beginAtZero: true,
                  callback: function(value) {
                    if (Number.isInteger(value)) {
                      return value;
                    }
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return {
                  borderColor: "#179bee",
                  backgroundColor: "#179bee"
                };
              },
              labelTextColor: function(tooltipItem, chart) {
                return "#ffffff";
              }
            }
          }
        }
      });
    }
    if ($("#thirtyDays").length > 0) {
      var ctx = document.getElementById("thirtyDays");
      var ltChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [ "1", "6", "11", "16", "21", "26", "30" ],
          datasets: [
            {
              data: [ 90, 366, 602, 475, 343, 704, 656 ],
              backgroundColor: [ "rgba(255, 99, 132, 0)" ],
              borderColor: "#079bee",
              borderWidth: 2,
              borderHoverWidth: 2,
              pointBackgroundColor: "#ffffff",
              pointHoverBackgroundColor: "#ffffff",
              pointBorderWidth: 2,
              pointHoverBorderWidth: 2,
              pointBorderColor: "#179bee",
              pointHoverBorderColor: "#179bee",
              pointRadius: 8,
              pointHoverRadius: 8
            }
          ]
        },
        defaults: {
          global: {
            defaultFontFamily: "'Oxanium'"
          }
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true
                },
                ticks: {
                  beginAtZero: true,
                  callback: function(value) {
                    if (Number.isInteger(value)) {
                      return value;
                    }
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return {
                  borderColor: "#179bee",
                  backgroundColor: "#179bee"
                };
              },
              labelTextColor: function(tooltipItem, chart) {
                return "#ffffff";
              }
            }
          }
        }
      });
    }

    if ($("#monthlyPrice").length > 0) {
      var ctx = document.getElementById("monthlyPrice");
      var ltChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [ "Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov" ],
          datasets: [
            {
              data: [ 40, 33, 40, 48, 32, 57, 40, 47, 67, 55, 23, 59 ],
              backgroundColor: [ "rgba(255, 99, 132, 0)" ],
              borderColor: "#079bee",
              borderWidth: 5,
              borderHoverWidth: 2,
              pointBackgroundColor: "transparent",
              pointHoverBackgroundColor: "rgba(23, 155, 238, 0.4)",
              pointBorderWidth: 0,
              pointHoverBorderWidth: 6,
              pointBorderColor: "transparent",
              pointHoverBorderColor: "rgba(23, 155, 238, 0.3)",
              pointRadius: 8,
              pointHoverRadius: 8
            }
          ]
        },
        defaults: {
          global: {
            defaultFontFamily: "'Oxanium'"
          }
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: true
                },
                ticks: {
                  beginAtZero: true,
                  callback: function(value) {
                    if (Number.isInteger(value)) {
                      return value;
                    }
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return {
                  borderColor: "#179bee",
                  backgroundColor: "#179bee"
                };
              },
              labelTextColor: function(tooltipItem, chart) {
                return "#ffffff";
              }
            }
          }
        }
      });
    }

    /*==============================================================*/
    // Class change when select an option
    /*==============================================================*/
    if ($("#select-chart").length > 0) {
      $("#select-chart")
        .change(function() {
          $(this)
            .find("option:selected")
            .each(function() {
              var optionValue = $(this).attr("value");
              if (optionValue) {
                $(".lt-chart")
                  .not("." + optionValue)
                  .hide();
                $("." + optionValue).show();
              } else {
                $(".lt-chart").hide();
              }
            });
        })
        .change();
    }

    //jQuery End
  });
};
