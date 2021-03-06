$(function() {
  var $window           = $(window),
      $scrollOverlay    = $('.scroll-overlay'),
      $mainNavigation   = $('.main-navigation'),
      $navControl       = $('.nav-control'),
      $navControlInner  = $('.main-navigation .nav-control .inner'),
      minWidth          = 992;

  /*
   * Resize callback for responsive updates
   */
  $window.resize(function() {
    if ($window.width() <= minWidth) {
      $mainNavigation.css({top: -$mainNavigation.outerHeight()});
      if ($mainNavigation.hasClass('open')) {
        $mainNavigation.removeClass('open').addClass('closed');
      }
    } else {
      $mainNavigation.css({top: 0});
    }
    return $scrollOverlay.find('.inner-shadow').height($('.profile-img-fixed .content-container .inner').height());
  });

  /*
   * Navigation open and close
   */
  $navControl.click(function() {
    if($mainNavigation.hasClass('open')) {
      $mainNavigation.removeClass('open').addClass('closed');
    } else if($mainNavigation.hasClass('closed')) {
      $mainNavigation.removeClass('closed').addClass('open');
    } else {
      $mainNavigation.addClass('open');
    }

    if ($window.width() <= minWidth) {
      if ($mainNavigation.hasClass('open')) {
        $mainNavigation.animate({
          top: $window.scrollTop() - $navControl.outerHeight()
        }, 200)
      } else {
        $mainNavigation.animate({
          top: -$mainNavigation.outerHeight()
        }, 200)
      }
    }
  });

  /*
  * Animate with css transform
  */
  $scrollOverlay.scroll(function() {
    var $arrow = $('.profile-desc .content .message .spacer'),
        $arrow2 = $('.profile-desc .card .arrow'),
        top = $scrollOverlay.scrollTop(),
        navControlOffset = Math.abs(parseInt($navControlInner.css('margin-left'),10)),
        scaleTo = 0.5,
        rotateMax = 180,
        scale = 1 - (top / scaleTo) * (scaleTo / (rotateMax * 2));

    if ($window.width() <= minWidth) {
      // give some extra run for faster scrolling
      if (top <= (navControlOffset + 10)) {
        $navControlInner.css('transform', 'translateX(' + top + 'px)');
      }
      if (top <= rotateMax) {
        $arrow2.css('transform', 'rotate(' + top + 'deg)');
      } else {
        $arrow2.css('transform', 'rotate(' + rotateMax + 'deg)')
      }
    }
    if (top <= rotateMax) {
      $arrow.css('transform', 'rotate(' + top + 'deg) scale(' + scale + ')');
    } else {
      $arrow.css('transform', 'rotate(' + rotateMax + 'deg) scale(0.5)');
    }
  });

  // initialize
  if ($window.width() <= minWidth) {
    // trigger resize event for initial resize event callbacks in responsive view
    $window.trigger('resize');
    // sets the navigation position for responsive view
    $mainNavigation.css({top: - $mainNavigation.outerHeight()});
  }
});