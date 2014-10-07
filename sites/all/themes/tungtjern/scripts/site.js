(function($, Drupal) {
  //add drupal 7 code
  Drupal.behaviors.myfunction = {
    attach: function(context, settings) {
//end drupal calls

  if ($.isFunction($.fn.chosen)) {
    $(".chosen-select").chosen({no_results_text:'Ingen elementer matchede søgningen'});
  }
  
  if ($.isFunction($.fn.raty)) {
    $('.userrating').raty({
      number: 10,
      path: '/sites/all/themes/tungtjern/scripts/raty/img',
      hints: ['1/10 kranier', '2/10 kranier', '3/10 kranier', '4/10 kranier', '5/10 kranier', '6/10 kranier', '7/10 kranier', '8/10 kranier', '9/10 kranier', '10/10 kranier', ],
      halfShow : false,
      score: function() {
        return $(this).attr('data-score');
      },
      click: function(score, evt) {
        var user_rating_url = "/user_rating/" + $(this).attr('data-itemid') + "/" + score;
        $.getJSON(user_rating_url, function( json ) {
          $(".userRatingMsg").html('');
          var msg;
          if (json.success) {
            msg = '<i class="fa fa-check"></i> ';
          } else {
            msg = '<i class="fa fa-warning"></i> ';
          }
          msg = msg + json.message;
          $(".userRatingMsg").append(msg);
          if (json.text) {
            $(".userRatingStats").text(json.text);
          }
        });
        
      }
    });
  }
  
  if ($.isFunction($.fn.easytabs)) {
    $('#tab-container').easytabs();
  } 
  
  $('#instagram-slide').bjqs({
    'height' : 306,
    'width' : 306,
    'responsive' : true,
    'nexttext' : '»',
    'prevtext' : '«',
    'showmarkers' : false
  });
  
  $('#next-concerts').bjqs({
    'height' : 100,
    'width' : 306,
    'responsive' : true,
    'nexttext' : '»',
    'prevtext' : '«',
    'showmarkers' : false
  });
  
  if ($.isFunction($.fn.pajinate)) {
    $('.page_container').pajinate({
      items_per_page: 15,
      abort_on_small_lists: true,
      show_first_last: false,
      nav_label_next: 'Næste',
      nav_label_prev: 'Forrige',
      nav_label_info: 'Viser {0}-{1} af {2}'
    });
    $('.news_page_container').pajinate({
      items_per_page: 15,
      abort_on_small_lists: true,
      show_first_last: false,
      nav_label_next: 'Næste',
      nav_label_prev: 'Forrige',
      nav_label_info: 'Viser {0}-{1} af {2}'
    });
    $('.concerts_page_container').pajinate({
      items_per_page: 15,
      abort_on_small_lists: true,
      show_first_last: false,
      nav_label_next: 'Næste',
      nav_label_prev: 'Forrige',
      nav_label_info: 'Viser {0}-{1} af {2}'
    });
  }
  
  if ($('input[name=type]:checked', '#concert-add-form').val() == 0) {
    $('.festival-name').hide();
    $('.end-date').hide();
    $("label[for='edit-start-date']").html('Dato <span class="form-required">*</span>');
  }
  if ($('input[name=type]:checked', '#concert-add-form').val() == 1) {
    $('.festival-name').show();
    $("label[for='edit-festival-name']").html('Festivalnavn <span class="form-required">*</span>');
    $('.end-date').show();
    $("label[for='edit-start-date']").html('Startdato <span class="form-required">*</span>');
  }
  if ($('#edit-new-artists').length > 0 && $('#edit-new-artists').val().length > 0) {
    $(".new-artists").show();
    $(".add-missing-toggler i").css('fa-minus-circle');
  }
  
  $('#concert-add-form input[name=type]').change(function() {
    // Concert:
    if (this.value == 0) {
      $('.festival-name').hide();
      $('.end-date').hide();
      $("label[for='edit-start-date']").html('Dato <span class="form-required">*</span>');
    }
    // Festival:
    if (this.value == 1) {
      $('.festival-name').show();
      $("label[for='edit-festival-name']").html('Festivalnavn <span class="form-required">*</span>');
      $('.end-date').show();
      $("label[for='edit-start-date']").html('Startdato <span class="form-required">*</span>');
    }
  });
  $('.add-missing-toggler').click(function() {
    $(".new-artists").toggle();
    $(".add-missing-toggler i").toggleClass('fa-plus-circle fa-minus-circle');
    return false;
  });
  
  // Concert calendar select submit:
  $('#landsdel').change(
    function(){
      $('#province-form').submit();
  });

  }};
})(jQuery, Drupal);