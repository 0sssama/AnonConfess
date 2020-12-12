const toggleDescription = () => {
    if ($('.actual-description').hasClass('hidden')) {
        $('.toggle-desc-btn').text('Hide description')
    } else {
        $('.toggle-desc-btn').text('What is AnonConfess?')
    }
    $('.actual-description').toggleClass('hidden')

}

window.onload = function ()
{
    var browser = 'unknown'
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ){
        browser = 'opera';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 ){
        browser = 'chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1){
        browser = 'safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        browser = 'firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
        browser = 'ie';
    }
    if ($('.confession__content p')) {
        $('.confession__content p').addClass(browser)
    }
    if ($('.description-content')) {
        $('.description-content').html(`Got something in mind that's about to make your mind explode if you don't let it out?<br/>Post your darkest secrets with complete anonymity.<br/><u>No IP-Tracing, no login required.</u><br/><b>Database gets cleared every 24 hours.</b>`)
    }
    $('footer').html(`
    <div class="TOS">
        <a href="#">Privacy Policy</a>
    </div>
    <div class="donate">
        <p>Wanna buy us a coffee? ;D - <a href="https://paypal.me/0sssama">Donate!</a> -</p>
    </div>
    <div class="copyright">
        <p>&copy; AnonConfess - All rights reserved 2020</p>
    </div>
        `)

    }