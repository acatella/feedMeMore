$(document).ready(function() {

  // Hides menu dropdown when document is clicked outside of open dropdown
  $(document).on('click',function(e) {
    $('.top-nav-dropdown').removeClass('top-nav-visible');
    $('.top-nav-section').removeClass('rotate-caret');
  });

  // Top Nav Click Events for Mobile and Desktop
  $('.top-nav-dropdown-button').on('click',function(e) {
    e.stopPropagation(); //Stops default closing of menu

    var topNavSection = $(e.target).parent();

    var dropdown = $(e.target).parent().find('.top-nav-dropdown');

    if (dropdown.hasClass('top-nav-visible')) {
      dropdown.removeClass('top-nav-visible')
      topNavSection.removeClass('rotate-caret');
    }

    else {
      $('.top-nav-dropdown').removeClass('top-nav-visible');
      dropdown.addClass('top-nav-visible');
      $('.top-nav-section').removeClass('rotate-caret');
      topNavSection.addClass('rotate-caret');
    }

  });

  // Mobile Nav Click Events
  $('.mobile-nav-dropdown-button').on('click', function(e) {
    var section = $(e.target).parent();

    if (section.hasClass('mobile-nav-visible')) {
      section.removeClass('mobile-nav-visible');
    }

    else {
      $('.mobile-nav-section').removeClass('mobile-nav-visible');
      section.addClass('mobile-nav-visible');
    }
  });

  $('.mobile-nav-button').on('click',function() {
    $('.mobile-nav').css('display','block');
  });

  $('.mobile-nav-close').on('click',function() {
    $('.mobile-nav').css('display','none');
    $('.mobile-nav-section').removeClass('mobile-nav-visible');
  });

  //function that hides all list items after the 5th one
  function hideItems() {
    $('.ol-item:nth-child(n+6)').addClass('hidden');
  }

  //hide list items >5 on page load
  hideItems();



  //reveal all rules for given section on 'view all' button click
  $('.view-all-button').on('click', function(e) {
    var clicked = $(e.target);
    var parent = clicked.parent().parent();

    if (clicked.text() == 'View All Rules') {
      parent.find('.ol-item').removeClass('hidden');
      clicked.parent().css('position','relative');
      clicked.text('Hide Rules');
    }

    else{
      hideItems();
      clicked.text('View All Rules');
      clicked.parent().css('position','absolute');
    }


  });
});
