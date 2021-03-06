/* thanks for peeking at the source!
 * you can find it in likely nicer form at
 * github.com/phorust/phorust.github.io
 */

var minimize   = modules.term.minimize;
var unminimize = modules.term.unminimize;
var activate   = modules.visual.activate;
var deactivate = modules.visual.deactivate;

var history  = window.History.createBrowserHistory();
var unlisten = _=>{};

function handleNav(pathname) {
  if (pathname === "/visual" ||
      pathname === "/visual/" ||
      pathname === "/visual.html") {
    navVisual();
  } else if (pathname === "/software" ||
             pathname === "/software/" ||
             pathname === "/software.html") {
    navSoftware();
  } else if (pathname === "/blog" ||
             pathname === "/blog/" ||
             pathname === "/blog.html") {
    navBlog();
  } else if (pathname === "/about" ||
             pathname === "/about/" ||
             pathname === "/about.html" ||
             pathname === "/") {
    navAbout();
  }
}

function navAbout() {
  minimize();
  hideVisual();
  hideBlog();
  showAbout();
}
function navSoftware() {
  hideVisual();
  hideAbout();
  hideBlog();
  unminimize();
}
function navVisual() {
  minimize();
  hideAbout();
  hideBlog();
  showVisual();
}
function navBlog() {
  minimize();
  hideAbout();
  hideVisual();
  showBlog();
}

function showAbout() {
  $('#about_content').fadeIn(1).addClass('loaded');
  $('#about_content > a > pre')
    .css('max-height', $('#recent_code').outerHeight(true));
  // always try to place KL in the same place, slightly above middle
  $('#content')
    .css('min-height', $(window).height() * 0.60);
}
function hideAbout() {
  $('#about_content').removeClass('loaded').delay(300).fadeOut(1);

  // otherwise jumping occurs as the huge about_content div is replaced by the
  // smaller terminal div
  $('body').animate({scrollTop: 0}, 300);
}

function showVisual() {
  $('#content').css('min-height', $('#visual_content').innerHeight());
  $('#visual_content').fadeIn(1).addClass('loaded');
  $('body').addClass('visual');
  $('#logo').attr('src', '/i/kl_white.png');

  activate();
}
function hideVisual() {
  // sigh DRY. see hideAbout
  $('#visual_content').removeClass('loaded').delay(300).fadeOut(1);
  $('body').animate({scrollTop: 0}, 300)
           .removeClass('visual');
  $('#logo').attr('src', '/i/kl.png');

  deactivate();
}

function showBlog() {
  $('#content').css('min-height', $('#blog_content').innerHeight());
  $('#blog_content').fadeIn(1).addClass('loaded');
}
function hideBlog() {
  $('#blog_content').removeClass('loaded').delay(300).fadeOut(1);
}

$(document).ready(function() {
  $('#wrapper').addClass('loaded');

  /* attr selectors for href? */
  $('.software').click(e => {
    history.push({ pathname: '/software' });
  });
  $('.about').click(e => {
    history.push({ pathname: '/' });
  });
  $('.visual').click(e => {
    history.push({ pathname: '/visual' });
  });
  $('.blog').click(e => {
    history.push({ pathname: '/blog' });
  });
  $('nav a').click(e => {
    e.preventDefault();
  });
  $('#subtitle a').click(e => {
    e.preventDefault();
  });

  $('#recent_code_show').click(e => {
    $('#recent_code').toggleClass('active');
  });

  var unlisten = history.listen(location => {
    handleNav(location.pathname);
  });
  // load the right view on pageload
  handleNav(window.location.pathname);
});


// for uptime
window.startTime = Date.now();
module.exports('kml_new', { showAbout });
