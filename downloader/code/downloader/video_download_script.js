function parse_tube() {

    function _get_quantity(qua){
        /* HD 720p */
        pos = qua.search(/([1-9]\d*)(p|P)?/i);
        if(pos > 0){
            qua = qua.substr(pos)
        }
        return qua
    }

    function _get_ext(url) {
        var a = document.createElement("a")
        a.href = url
        var ext = a.pathname.split('.').pop().toLowerCase()
        return ext.replace('/', '')
    }


    var host = window.location.hostname
    if (host.indexOf('www.') > -1) {
        host = host.slice(4)
    }

    var result = {
        /* [url, qulity(720p), type(mp4)] */
        urls: [],
        title: '',
        image: '',
        duration: 0,
        error: '',
        use_api: 0
    }

    var _hosts = {
        'redtube.com': _parse_redtube_com,
        'youjizz.com': _parse_youjizz_com,
        'spankbang.com': _parse_spankbang_com,
        'm.spankbang.com': _parse_spankbang_com,
        'pornhub.com': _parse_pornhub_com,
        'fr.pornhub.com': _parse_pornhub_com,
        'de.pornhub.com': _parse_pornhub_com,
        'pt.pornhub.com': _parse_pornhub_com,
        'it.pornhub.com': _parse_pornhub_com,
        'rt.pornhub.com': _parse_pornhub_com,
        'nl.pornhub.com': _parse_pornhub_com,
        'cz.pornhub.com': _parse_pornhub_com,
        'jp.pornhub.com': _parse_pornhub_com,
        'pl.pornhub.com': _parse_pornhub_com,
        'es.pornhub.com': _parse_pornhub_com,

        'm.xhamster.com': _parse_xhamster_com,
        'm.xhamster.desi': _parse_xhamster_com,

        'xnxx.com': _parse_xnxx_com,
        'youporn.com': _parse_youporn_com,

        'xvideos.com': _parse_xvideos_com,
        'xvideos.in': _parse_xvideos_com,
        'fr.xvideos.com': _parse_xvideos_com,

        'porn.com': _parse_porn_com,
        'ru.porn.com': _parse_porn_com,

        'homepornking.com': _parse_homepornking_com,
        'vporn.com': _parse_vporn_com,


        'sexvid.xxx': _parse_sexvid_xxx,
        'letmejerk.com': _parse_normalize,
        'm.cricbuzz.com': _parse_normalize,

        'porntv.com': _parse_porntv_com,
        'tubxporn.com': _parse_tubxporn_com,
        'pornky.com': _parse_pornky_com,
        'freeindianporn.mobi': _parse_freeindianporn_mobi,
        'youngpornvideos.com': _parse_youngpornvideos_com,

        // 'pictoa.com': _parse_pictoa_com,
        'beeg.com': _parse_beeg_com,
        'sex.com': _parse_sex_com,

        'pornhd.com': _parse_pornhd_com,
        'joysporn.com': _parse_joysporn_com,
        'pornzee.com': _parse_pornzee_com,
        'xxxkingtube.com': _parse_xxxkingtube_com,
        'heavy-r.com': _parse_heavy_r_com,
        'analdin.com': _parse_analdin_com,


        'vimeo.com': _parse_vimeo_com,
        'facebook.com': _parse_facebook_com,
        'm.facebook.com': _parse_facebook_com,
        'instagram.com': _parse_instagram_com,

        'youtube.com': _parse_youtube_com,
        'm.youtube.com': _parse_youtube_com,

        'dailymotion.com': _parse_dailymotion_com,

        'tube8.com': _parse_tube8_com,
        'modelhub.com': _parse_modelhub_com,
        'keezmovies.com': _parse_keezmovies_com,
        'anyporn.com': _parse_anyporn_com,
        'yespornplease.com': _parse_normalize,

        'es.redtube.com': _parse_redtube_com,
        'porn300.com': _parse_normalize,
        'japanporn.tv': _parse_japanporn_tv,
        'xozilla.com': _parse_xozilla_com,

        'm.4tube.com': _parse_normalize,
        'redtubepremium.com': _parse_redtube_com,
        'pornhubpremium.com': _parse_pornhub_com,

        'redtube.net': _parse_redtube_com,
        'pornhat.com': _parse_pornhat_com,
        'porn7.xxx': _parse_porn7_xxx,
        'porntrex.com': _parse_porntrex_com,
        'yespornplease.com': _parse_normalize,
        'gotporn.com': _parse_normalize,
        // 'txxx.com': _parse_txxx_com
        'xtube.com': _parse_xtube_com,
        'de.porn.com': _parse_porn_com,
        'sxyprn.com': _parse_sxyprn_com,
        'pornhubselect.com': _parse_pornhubselect_com,
        'porndroids.com': _parse_normalize,
        'motherless.com': _parse_motherless_com,
        'kayatan.com': _parse_normalize,
        'm.fuqer.com': _parse_normalize,
        'm.pornoxo.com': _parse_pornoxo_com,
        'you-porn.com': _parse_youporn_com,
        'megatube.xxx': _parse_megatube_xxx,

        'porntube.com': _parse_porntube_com,
        'tubx.porn': _parse_tubxporn_com,
        'pornky.tv': _parse_pornky_tv,
        'viralpinay.com': _parse_normalize,
        'freshscat.com': _parse_normalize,
        'xxxdessert.com': _parse_xxxdessert_com,
        'palmtube.com': _parse_normalize,
        'katorsex.com': _parse_normalize,
        'm.pornflip.com': _parse_pornflip_com,
        'm.pornsharing.com': _parse_pornsharing_com,
        'koloporno.com': _parse_normalize,
        'm.hd21.com': _parse_hd21_com,
        'porngem.com': _parse_porngem_com,

        'eporner.com': _parse_not_support,
        'st.yaksgames.com': _parse_ignore,
        'xbombo.com': _parse_xbombo_com,

        'uzalo.me': _parse_uzalo_me,
        'ok.ru': _parse_ok_ru,
        'anyxxx.pro': _parse_anyxxx_pro,
        'xnxx2.pro': _parse_xnxx2_pro,
        'm.ok.ru': _parse_m_ok_ru,

        'm.drtuber.com': _parse_normalize,
        'befuck.com': _parse_normalize,
        'm.nuvid.com': _parse_normalize,
        'smutr.com': _parse_smutr_com,
        'm.empflix.com': _parse_empflix_com,
        'sexu.com': _parse_sexu_com,
        'xnxx.es': _parse_xnxx_com,
        'txxx.com': _parse_not_support,
        'm.privatesextapes.com': _parse_not_support,

        'spankwire.com': _parse_spankwire_com,
        'xxxdessert.com': _parse_normalize,
        'pornid.xxx': _parse_pornid_xxx,
        'jizzbunker.com': _parse_normalize,
        'hdtube.porn': _parse_hdtube_porn,
        'xxxdan.com': _parse_xxxdan_com,
        'extremetube.com': _parse_extremetube_com,
        'm.iceporn.com': _parse_normalize,
        'moviesand.com': _parse_normalize,
        'porngem.com': _parse_normalize
    }


    var dataset = {
        title: [
            ['meta[property="og:title"]', 'content'],
            ['meta[name="og:title"]', 'content'],
        ],
        image: [
            ['meta[property="og:image"]', 'content'],
            ['meta[name="og:image"]', 'content'],
        ],
        duration: [
            ['meta[property="video:duration"]', 'content'],
            ['meta[property="og:video:duration"]', 'content'],
            ['meta[property="og:duration"]', 'content'],
        ]
    }

    function _parse_video_attr(attr) {
        if (!(attr in dataset)) {
            return ''
        }
        for (var key in dataset[attr]) {
            var data = dataset[attr][key]
            var e = document.querySelector(data[0])
            if (e) {
                return e.getAttribute(data[1])
            }
        }
        if(attr == 'duration'){
            return 0;
        }else{
            return '';
        }
    }


    function _parse_redtube_com() {
        var keys = Object.keys(page_params.video_player_setup)
        for (var key in page_params.video_player_setup[keys[0]].createPlayerSetup.mainRoll.mediaDefinition) {
            var item = page_params.video_player_setup[keys[0]].createPlayerSetup.mainRoll.mediaDefinition[key]
            if (item['videoUrl'] === '') {
                continue
            }
            result.urls.push([item['videoUrl'], item['quality'], _get_ext(item['videoUrl']) ])
        }
        result.title = page_params.video_player_setup[keys[0]].playervars.video_title
        result.image = page_params.video_player_setup[keys[0]].playervars.image_url
        result.duration = page_params.video_player_setup[keys[0]].playervars.video_duration

        normalize_result(result)
    }

    function _parse_youjizz_com() {
        for (var key in encodings) {
            item = encodings[key]
            if (item['filename'] === '') {
                continue
            }
            var a = document.createElement("a")
            a.href = item['filename']
            result.urls.push(["https:"+item['filename'], item['quality'], a.pathname.split('.').pop().toLowerCase()])
        }

        result.image = "https:"+document.querySelector('#yj-mobile-player').getAttribute('poster')
        result.duration = parseInt(document.querySelector('#checkVideoFavorite').getAttribute('data-length'))

        normalize_result(result)
    }

    function _parse_spankbang_com() {
        if(stream_url_1080p){
            result.urls.push([stream_url_1080p, '1080p', _get_ext(stream_url_1080p)])
        }
        if(stream_url_720p){
            result.urls.push([stream_url_720p, '720p', _get_ext(stream_url_720p)])
        }
        if(stream_url_480p){
            result.urls.push([stream_url_480p, '480p', _get_ext(stream_url_480p)])
        }
        if(stream_url_320p){
            result.urls.push([stream_url_320p, '320p', _get_ext(stream_url_320p)])
        }
        if(stream_url_240p){
            result.urls.push([stream_url_240p, '240p', _get_ext(stream_url_240p)])
        }

        result.title = _parse_video_attr('title')
        result.image = "https:"+_parse_video_attr('image')
        result.duration = _parse_video_attr('duration')

        normalize_result(result)
    }

    function _parse_porn_com() {
        var scripts = document.querySelectorAll('head > script')
        var pattern = /{streams:.*?};/
        var data = null
        for (var key in scripts) {
            var script = scripts[key]
            var m = pattern.exec(script.innerText)
            if (!m) {
                continue
            }
            data = (new Function("return " + m[0]))()
            break
        }

        if (!data) {
            return result
        }

        for (var key in data.streams) {
            var item = data.streams[key]
            result.urls.push([item['url'], item['id'], _get_ext(item['url'])])
        }
        result.title = data.title
        result.image = 'https://mediav.porn.com' + data.poster
        result.duration = data.length

        normalize_result(result)
    }

    function _parse_homepornking_com() {
        var url = document.querySelector('video.mejs__player > source').getAttribute('src')
        result.urls.push([url, '480p', 'mp4'])

        result.title = document.querySelector('head title').innerText
        result.image = document.querySelector('video.mejs__player').getAttribute('poster')

        normalize_result(result)
    }

    // work
    function _parse_vporn_com() {

        var links = document.querySelectorAll('#vporn-video-player_html5_api > source');
        [].forEach.call(links,  function (el) {
            result.urls.push([el.getAttribute('src'), el.getAttribute('res'), el.getAttribute('type').split('/').pop()])
        });


        var node = document.querySelector(".single-video-wrapper h1")
        if(node){
            result.title = node.innerText
        }
        if(result.title == ''){
            result.title = videoname
        }
        var node = document.querySelector(".vjs-poster")
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf('"')
            style = style.substr(pos+1)
            pos = style.indexOf('"')
            result.image = style.substring(0, pos)
        }
        if(result.image == ''){
            result.image = posterurl
        }

        normalize_result(result)
    }

    function _parse_youporn_com() {
        for (var key in page_params.videoPlayer.mediaDefinition) {
            var item = page_params.videoPlayer.mediaDefinition[key]
            if(typeof(item['videoUrl']) != 'undefined'){
                result.urls.push([item['videoUrl'], item['quality'], _get_ext(item['videoUrl']) ])
            }
        }

        normalize_result(result)
    }

    function _parse_pornhub_com() {
        for(var key in qualitySelection.qsItem){
            var item = qualitySelection.qsItem[key]
            if(item['url']){
                result.urls.push([item['url'], item['text'], _get_ext(item['url'])])
            }
        }

        normalize_result(result)
    }

    function _parse_xnxx_com(){
        try {
            // html5player 为 xnxx.com 的站点变量
            if(typeof(html5player.url_high != 'undefined')){
                result.urls.push([html5player.url_high, 'high', _get_ext(html5player.url_high)])
            }
            if(typeof(html5player.url_low != 'undefined')){
                result.urls.push([html5player.url_low, 'low', _get_ext(html5player.url_low)])
            }
        } catch (err) {
            console.log(err)
        }

        normalize_result(result)
    }

    function _parse_xvideos_com(){
        try {
            // html5player 为 xvideos.com 的站点变量
            if(typeof(html5player.url_high) != 'undefined' && html5player.url_high != ''){
                result.urls.push([html5player.url_high, 'high', _get_ext(html5player.url_high)])
            }
            if(typeof(html5player.url_low) != 'undefined' && html5player.url_low != ''){
                result.urls.push([html5player.url_low, 'low', _get_ext(html5player.url_low)])
            }

            var links = document.querySelectorAll('.play-link a');
            if(links){
                var index = 0;
                [].forEach.call(links, function(el){
                    if(index == 0){
                        var quality = 'low';
                    }else{
                        var quality = 'high';
                    }
                    result.urls.push([el.getAttribute('href'), quality, 'mp4']);
                    index += 1;
                });
            }

        } catch (err) {
            console.log(err)
        }

        result.title = html5player.video_title
        result.image = html5player.url_thumb169

        normalize_result(result)
    }


    function _parse_xhamster_com(){

        for (var key in window.initials.videoModel.sources.mp4){
            var src = window.initials.videoModel.sources.mp4[key]
            result.urls.push([src, key, _get_ext(src)])
        }

        result.title = window.initials.videoModel.title
        result.image = window.initials.videoModel.thumbURL
        result.duration = window.initials.videoModel.duration

        normalize_result(result)
    }

    function _parse_sexvid_xxx(){

        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, window.flashvars.video_url_text, _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, window.flashvars.video_alt_url_text, _get_ext(window.flashvars.video_alt_url)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_porntv_com(){
        var videos = document.querySelectorAll('button.js-play');
        [].forEach.call(videos,  function (video_el) {
            var src = video_el.getAttribute('data-src');
            var quantity = video_el.getAttribute('aria-label')

            result.urls.push([src, quantity, _get_ext(src)]);
        })

        var node = document.querySelector("a.img-cover>img")
        if(node){
            result.image = node.getAttribute('src')
        }

        normalize_result(result)
    }

    function _parse_tubxporn_com(){
        if(typeof(window.c.video_url) != 'undefined' && window.c.video_url != ''){
            result.urls.push([window.c.video_url, _get_quantity(window.c.video_url_text), _get_ext(window.c.video_url)])
        }
        if(typeof(window.c.video_alt_url) != 'undefined' && window.c.video_alt_url != ''){
            result.urls.push([window.c.video_alt_url, _get_quantity(window.c.video_alt_url_text), _get_ext(window.c.video_alt_url)])
        }
        if(typeof(window.c.video_alt_url2) != 'undefined' && window.c.video_alt_url2 != ''){
            result.urls.push([window.c.video_alt_url2, _get_quantity(window.c.video_alt_url2_text), _get_ext(window.c.video_alt_url2)])
        }
        if(typeof(window.c.video_alt_url3) != 'undefined' && window.c.video_alt_url3 != ''){
            result.urls.push([window.c.video_alt_url3, _get_quantity(window.c.video_alt_url3_text), _get_ext(window.c.video_alt_url3)])
        }
        if(typeof(window.c.video_alt_url4) != 'undefined' && window.c.video_alt_url4 != ''){
            result.urls.push([window.c.video_alt_url4, _get_quantity(window.c.video_alt_url4_text), _get_ext(window.c.video_alt_url4)])
        }

        result.image = window.c.preview_url

        normalize_result(result)
    }

    function _parse_pornky_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_freeindianporn_mobi(){
        normalize_result(result)
    }

    function _parse_youngpornvideos_com(){
        var videos = document.querySelectorAll('button.js-play');
        [].forEach.call(videos,  function (video_el) {
            var src = video_el.getAttribute('data-src');
            var quantity = video_el.getAttribute('aria-label')

            result.urls.push([src, quantity, _get_ext(src)]);
        })


        var node = document.querySelector("a.img-cover>img")
        if(node){
            result.image = node.getAttribute('src')
        }

        normalize_result(result)
    }

    function _parse_pictoa_com(){
        normalize_result(result)
    }

    function _parse_beeg_com(){
        var videos = document.querySelectorAll('a.play-video');
        [].forEach.call(videos,  function (video_el) {
            var src = video_el.getAttribute('href');
            var quantity = video_el.getAttribute('title')

            result.urls.push([src, quantity, _get_ext(src)]);
        })


        var node = document.getElementById("native-player")
        if(node){
            result.image = "https:"+node.getAttribute('poster')
        }

        normalize_result(result)
    }

    function _parse_sex_com(){
        var video_el = document.querySelector('video');
        var source_el = video_el.querySelector('source');
        var src = source_el.getAttribute('src');

        result.urls.push(["https://www.sex.com"+src, 'default', 'mp4']);

        result.image = video_el.getAttribute('poster')

        normalize_result(result)
    }

    function _parse_pornhd_com(){
        var video_el = document.getElementById('mainPlayer_html5_api');
        var src = video_el.getAttribute('src');

        result.urls.push(["https://www.pornhd.com"+src, 'default', 'mp4']);

        normalize_result(result)
    }

    function _parse_joysporn_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_pornzee_com(){

        result.urls.push([flashvars.video_url, 'default', _get_ext(flashvars.video_url)])
        result.image = flashvars.preview_url

        normalize_result(result)
    }

    function _parse_xxxkingtube_com(){
        var node = document.getElementById('test-video_fluid_pseudo_poster')
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf('"')
            style = style.substr(pos+1)
            pos = style.indexOf('"')
            result.image = style.substring(0, pos)
        }

        normalize_result(result)
    }

    function _parse_heavy_r_com(){
        normalize_result(result)
    }

    function _parse_analdin_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_vimeo_com(){
        var el = document.querySelector("#main h1 span")
        if(el){
            result.title = el.innerText
        }
        var el = document.querySelector(".vp-preview")
        if(el){
            result.image = el.getAttribute('data-thumb')
        }

        normalize_result(result)
        if(result.urls.length == 0){
            result.use_api = 1
        }
    }

    function _parse_facebook_com(){
        var el = document.querySelector("#m_story_permalink_view ._53mw")
        if(el){
            var store_string = el.getAttribute('data-store')
            dict = JSON.parse(store_string)
            result.urls.push([ dict['src'], 'default', _get_ext(dict['src']) ])
        }

        /*
        https\3a //scontent-sjc3-1.xx.fbcdn.net/v/t15.5256-10/fr/cp0/e15/q65/51870747_2478147548865486_1617213344819707904_n.jpg?_nc_cat\3d 101\26 _nc_oc\3d AQnIbdjuZEgMNRSh_EkIDz-gB68s5vl5fAuyx9Ufu05EdWZszXdmTSch7FarTEKRQ5k\26 _nc_ht\3d scontent-sjc3-1.xx\26 oh\3d 61d136bfef368c081c8c27c9d8380c66\26 oe\3d 5D8045D6
        https://scontent-sjc3-1.xx.fbcdn.net/v/t15.5256-10/fr/cp0/e15/q65/51870747_2478147548865486_1617213344819707904_n.jpg?_nc_cat=101&_nc_oc=AQnIbdjuZEgMNRSh_EkIDz-gB68s5vl5fAuyx9Ufu05EdWZszXdmTSch7FarTEKRQ5k&_nc_ht=scontent-sjc3-1.xx&oh=61d136bfef368c081c8c27c9d8380c66&oe=5D8045D6
        \3a   :
        \3d   =
        \26   &
        */
        var node = document.querySelector("i.img._lt3._4s0y")
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf("'")
            style = style.substr(pos+1)
            pos = style.indexOf("'")
            var img = style.substring(0, pos)

            img = img.replace(/\\3a /g, ":");
            img = img.replace(/\\3d /g, "=");
            img = img.replace(/\\26 /g, "&");

            result.image = img;
        }

        normalize_result(result)
    }

    function _parse_instagram_com(){

        normalize_result(result)
    }

    function _parse_youtube_com(){
        normalize_result(result)
    }

    function _parse_dailymotion_com() {
        normalize_result(result, 'not_support')
    }

    function _parse_not_support(){
        normalize_result(result, 'not_support')
    }

    function _parse_tube8_com(){

        for (var i in window.flashvars.mediaDefinition){
            var item = window.flashvars.mediaDefinition[i]

            result.urls.push([ item['videoUrl'], item['quality'], item['format'] ])
        }

        result.title = window.flashvars.video_title
        result.image = window.flashvars.image_url
        result.duration = window.flashvars.video_duration

        normalize_result(result)
    }

    function _parse_modelhub_com(){
        normalize_result(result)
    }

    function _parse_keezmovies_com(){

        result.urls.push([ window.video_params.videoUrl, 'default', 'mp4' ])

        result.image = window.video_params.thumbUrl

        normalize_result(result)
    }

    function _parse_anyporn_com(){

        result.image = window.posterImage

        normalize_result(result)
    }

    function _parse_yespornplease_com(){
        normalize_result(result)
    }

    function _parse_normalize(){
        normalize_result(result)
    }

    function _parse_japanporn_tv(){
        // 触发点击播放，生成video标签
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);　　　　　　　　　　　　　　
        document.querySelector(".fp-ui").dispatchEvent(e);

        var node = document.querySelector(".fp-poster>img")
        if(node){
            result.image = node.getAttribute('src')
        }

        normalize_result(result)
    }

    function _parse_xozilla_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_pornhat_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result, 'not_support')
    }

    function _parse_porn7_xxx(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, 'default', _get_ext(window.flashvars.video_url)])
        }
        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_porntrex_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            result.urls.push([window.flashvars.video_alt_url, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            result.urls.push([window.flashvars.video_alt_url2, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            result.urls.push([window.flashvars.video_alt_url3, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            result.urls.push([window.flashvars.video_alt_url4, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_txxx_com(){
        // 触发点击播放，生成video标签, 有问题
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);　　　　　　　　　　　　　　
        document.querySelector(".section__panel").dispatchEvent(e);


        var node = document.querySelector("#kt_player a")
        if(node){
            var src = "https:"+node.getAttribute('href')
            result.urls.push([src, 'default', _get_ext(src)])
        }

        var node = document.querySelector("#skE3w")
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf("(")
            style = style.substr(pos+1)
            pos = style.indexOf(")")
            result.image = style.substring(0, pos)
        }

        normalize_result(result)
    }


    function _parse_xtube_com(){

        for (var key in window.playerConf.mainRoll.mediaDefinition) {
            var item = window.playerConf.mainRoll.mediaDefinition[key]
            if(item['videoUrl'] != ''){
                result.urls.push([item['videoUrl'], item['quality'], item['format'] ])
            }
        }

        result.title = window.playerConf.mainRoll.title
        result.image = window.playerConf.mainRoll.poster
        result.duration = window.playerConf.mainRoll.duration

        normalize_result(result)
    }

    function _parse_sxyprn_com(){

        var node = document.querySelector("#player_el")
        if(node){
            var src = node.getAttribute('src')
            src = 'https://sxyprn.com'+src;
            result.urls.push([src, 'default', _get_ext(src)])
        }

        normalize_result(result)
    }

    function _parse_pornhubselect_com(){
        var node = document.querySelector(".mhp1138_videoPoster")
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf("'")
            style = style.substr(pos+1)
            pos = style.indexOf("'")
            result.image = style.substring(0, pos)
        }

        normalize_result(result)
    }

    function _parse_motherless_com(){
        var node = document.querySelector(".ml-media-meta-title h1")
        if(node){
            result.title = node.innerText
        }

        normalize_result(result)
    }

    function _parse_pornoxo_com(){

        for (var key in window.player.options.sources) {
            var item = window.player.options.sources[key]
            if(item['src'] != ''){
                result.urls.push([item['src'], item['desc'], _get_ext(item['src']) ])
            }
        }

        result.title = window.player.options.title
        result.image = window.player.options.poster

        normalize_result(result)
    }

    function _parse_megatube_xxx(){
        // 触发点击播放，生成video标签
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);　　　　　　　　　　　　　　
        document.querySelector(".fp-ui").dispatchEvent(e);

        normalize_result(result)
    }

    function _parse_porntube_com() {
        var node = document.querySelector("h1.title")
        if(node){
            result.title = node.innerText
        }

        normalize_result(result)
    }

    function _parse_pornky_tv(){
        var node = document.querySelector("#playerone video.jw-video")
        if(node){
            var src = node.getAttribute('src')

            result.urls.push([src, 'default', _get_ext(src)])
        }

        var node = document.querySelector('h1.main_header')
        if(node){
            result.title = node.innerText
        }

        var node = document.querySelector('#playerone .jw-preview')
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf('"')
            style = style.substr(pos+1)
            pos = style.indexOf('"')
            result.image = style.substring(0, pos)
        }

        normalize_result(result)
    }

    function _parse_xxxdessert_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, 'default', _get_ext(window.flashvars.video_url)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_pornflip_com(){
        var node = document.getElementById('mediaPlayer')
        if(node){
            var qualities = node.getAttribute('data-qualities')
            qualities = qualities.split('|')
            for (var i in qualities) {
                var qua = qualities[i]

                eval("result.urls.push([ node.getAttribute('data-src"+qua+"'), qua, 'mp4'])");
            };
        }

        var node = document.getElementById('mediaPlayerThumbImg')
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf("(")
            style = style.substr(pos+1)
            pos = style.indexOf(")")
            result.image = style.substring(0, pos)
        }

        var node = document.getElementById('mediaPlayerTitleLink')
        if(node){
            result.title = node.innerText
        }

        normalize_result(result)
    }

    function _parse_pornsharing_com() {
        var node = document.getElementById('vlink')
        if(node){
            var src = node.getAttribute('href')
            result.urls.push([ src, 'default', 'mp4' ])
        }

        var node = document.getElementById('vpimg')
        if(node){
            result.image = node.getAttribute('src')
        }

        var node = document.querySelector("#divabout header a")
        if(node){
            result.title = node.innerText
        }

        normalize_result(result)
    }

    function _parse_hd21_com(){

        var node = document.querySelector(".curbstones strong a")
        if(node){
            result.title = node.innerText
        }

        normalize_result(result)
    }

    function _parse_porngem_com(){
        // 触发点击播放，生成video标签
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);　　　　　　　　　　　　　　
        document.querySelector(".fp-ui").dispatchEvent(e);

        normalize_result(result)
    }

    function _parse_ignore(){
        normalize_result(result, 'opt_ignore')
    }

    function _parse_xbombo_com(){
        console.info('_parse_xbombo_com')

        var el = document.querySelector("meta[itemprop='contentURL']");
        if(el){

            var content_url = el.getAttribute('content');
            // https://www.xvideos.com/embedframe/45645047
            if(content_url.indexOf('www.xvideos.com/embedframe') != -1){
                window.stop()

                var target_url = content_url.replace('embedframe/', 'video')
                target_url += "/1"
                console.info(target_url)
                location_replace(target_url)
            }
        }

    }

    function _parse_uzalo_me(){
        var links = document.querySelectorAll('iframe');
        if(links){

            [].forEach.call(links, function(el){
                var content_url = el.getAttribute('src')
                if(content_url.indexOf('ok.ru/videoembed') != -1){

                    window.stop()

                    var target_url = content_url.replace('embedframe/', 'video')
                    location_replace(target_url)
                }
            });
        }
    }

    function _parse_ok_ru(){
        var el = document.querySelector("div[data-module='OKVideo']")
        if(el){
            var s = el.getAttribute('data-options')
            dict = JSON.parse(s)
            var ddd = dict['flashvars']['metadata']

            var d2 = JSON.parse(ddd)
            for(var i in d2.videos){
                var item = d2.videos[i]
                result.urls.push([item['url'], item['name'], 'mp4' ])
            }

            result.title = d2.movie.title
            result.image = d2.movie.poster
        }

        normalize_result(result)
    }

    function _parse_m_ok_ru(){
        var el = document.querySelector('.outLnk')
        if(el){
            var v = el.getAttribute('data-video')
            var dict = JSON.parse(v)
            console.info(dict)

            result.urls.push([dict.videoSrc, 'default', 'mp4'])
            result.title = dict.videoName
            result.image = 'https:' + dict.videoPosterSrc
        }
        normalize_result(result)
    }

    function _parse_anyxxx_pro(){
        var el = document.querySelector("iframe.video")
        if(el){

            window.stop()

            var content_url = el.getAttribute('src');
            if(content_url.indexOf('/embed/') != -1){
                var vid = content_url.split('/').pop();

                var target_url = "https://www.xvideos.in/video"+vid+"/1";
                location_replace(target_url)
            }
        }
    }

    function _parse_xnxx2_pro(){
        var el = document.querySelector("iframe.video")
        if(el){

            window.stop()

            var content_url = el.getAttribute('src');
            if(content_url.indexOf('/embed/') != -1){
                var vid = content_url.split('/').pop();

                var target_url = "https://www.xvideos.in/video"+vid+"/1";
                location_replace(target_url)
            }
        }
    }

    function _parse_smutr_com(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, 'default', _get_ext(window.flashvars.video_url)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_sexu_com(){
        var el = document.getElementById('fluidplayer-container')
        if(el){
            var sources = el.querySelectorAll('source');
            [].forEach.call(sources,  function (source_el) {
                var src = source_el.getAttribute('src');
                if(src != ''){
                    quantity = source_el.getAttribute('title');

                    src = 'https:'+src;
                    result.urls.push([src, quantity, 'mp4']);
                }
            })
        }
        
        var node = document.getElementById('fluidplayer-container_fluid_pseudo_poster')
        if(node){
            var style = node.getAttribute('style')
            var pos = style.indexOf('"')
            style = style.substr(pos+1)
            pos = style.indexOf('"')
            result.image = 'https:'+style.substring(0, pos)
        }
        normalize_result(result)
    }

    function _parse_empflix_com(){
        
        var el = document.getElementById("videoPlayer")
        if(el){
            var src = el.getAttribute('src')
            src = "https:"+src;
            result.urls.push([src, 'default', 'mp4'])
        }

        normalize_result(result)
    }

    function _parse_spankwire_com() {
        if(typeof(window.video_params.videoUrl_sd) != 'undefined' && window.video_params.videoUrl_sd != ''){
            result.urls.push([window.video_params.videoUrl_sd, 'sd', _get_ext(window.video_params.videoUrl_sd)])
        }
        if(typeof(window.video_params.videoUrl_hd) != 'undefined' && window.video_params.videoUrl_hd != ''){
            result.urls.push([window.video_params.videoUrl_hd, 'hd', _get_ext(window.video_params.videoUrl_hd)])
        }

        result.title = window.video_params.videoTitle
        result.image = window.video_params.thumbUrl

        normalize_result(result)
    }

    function _parse_pornid_xxx(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            var src = window.flashvars.video_url
            if(src.substr(0,11) == 'function/0/'){
                src = src.substring(11)
            }
            result.urls.push([src, _get_quantity(window.flashvars.video_url_text), _get_ext(window.flashvars.video_url)])
        }
        if(typeof(window.flashvars.video_alt_url) != 'undefined' && window.flashvars.video_alt_url != ''){
            var src = window.flashvars.video_alt_url
            if(src.substr(0,11) == 'function/0/'){
                src = src.substring(11)
            }
            result.urls.push([src, _get_quantity(window.flashvars.video_alt_url_text), _get_ext(window.flashvars.video_alt_url)])
        }
        if(typeof(window.flashvars.video_alt_url2) != 'undefined' && window.flashvars.video_alt_url2 != ''){
            var src = window.flashvars.video_alt_url2
            if(src.substr(0,11) == 'function/0/'){
                src = src.substring(11)
            }
            result.urls.push([src, _get_quantity(window.flashvars.video_alt_url2_text), _get_ext(window.flashvars.video_alt_url2)])
        }
        if(typeof(window.flashvars.video_alt_url3) != 'undefined' && window.flashvars.video_alt_url3 != ''){
            var src = window.flashvars.video_alt_url3
            if(src.substr(0,11) == 'function/0/'){
                src = src.substring(11)
            }
            result.urls.push([src, _get_quantity(window.flashvars.video_alt_url3_text), _get_ext(window.flashvars.video_alt_url3)])
        }
        if(typeof(window.flashvars.video_alt_url4) != 'undefined' && window.flashvars.video_alt_url4 != ''){
            var src = window.flashvars.video_alt_url4
            if(src.substr(0,11) == 'function/0/'){
                src = src.substring(11)
            }
            result.urls.push([src, _get_quantity(window.flashvars.video_alt_url4_text), _get_ext(window.flashvars.video_alt_url4)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_hdtube_porn(){
        if(typeof(window.flashvars.video_url) != 'undefined' && window.flashvars.video_url != ''){
            result.urls.push([window.flashvars.video_url, 'default', _get_ext(window.flashvars.video_url)])
        }

        result.image = window.flashvars.preview_url

        normalize_result(result)
    }

    function _parse_xxxdan_com(){
        var el = document.querySelector('.fp-engine');
        if(el){
            var src = el.getAttribute('src')
            result.urls.push([src, 'default', 'mp4'])
        }

        normalize_result(result)   
    }

    function _parse_extremetube_com() {
        if(typeof(window.video_params.videoUrl) != 'undefined' && window.video_params.videoUrl != ''){
            result.urls.push([window.video_params.videoUrl, 'default', _get_ext(window.video_params.videoUrl)])
        }

        result.image = window.video_params.thumbUrl

        normalize_result(result)
    }


    function location_replace(target_url){
        result.error = 'opt_ignore'
        location.replace(target_url)
    }

    
    /**
     * @param  {[type]} result [description]
     * @param  {[type]} error  有时候不支持的站通用模式会返回 blob，不支持下载，反而影响用户体验，需要强制返回 不支持
     */
    function normalize_result(result, error){

        // title
        if(result.title == ''){
            result.title = _parse_video_attr('title')
        }
        if(result.title == ''){
            var node = document.querySelector("title")
            if(node){
                result.title = node.innerText
            }
        }

        // image
        if(result.image == ''){
            result.image = _parse_video_attr('image')
        }
        if(result.image == ''){
            var node = document.querySelector("video")
            if(node){
                result.image = node.getAttribute('poster')
            }
        }
        if(result.image != null && result.image != '' && result.image.indexOf('//') == 0){
            result.image = 'https:'+result.image;
        }

        // duration
        if(result.duration == 0){
            result.duration = _parse_video_attr('duration')
        }

        // urls 持续兼容
        if(result.urls.length == 0){
            var videos = document.querySelectorAll('video');
            [].forEach.call(videos,  function (video_el) {
                var sources = video_el.querySelectorAll('source');
                [].forEach.call(sources,  function (source_el) {
                    var src = source_el.getAttribute('src');
                    if(src != ''){
                        var quantity = source_el.getAttribute('label');
                        if(quantity == null){
                            quantity = source_el.getAttribute('title');
                        }
                        if(quantity == null){
                            quantity = source_el.getAttribute('data-res');
                        }
                        if(quantity == null){
                            quantity = 'default';
                        }

                        var type = source_el.getAttribute('type')
                        if(type != null){
                            var ext = type.split('/').pop().toLowerCase()
                        }else{
                            var ext = 'mp4'
                        }

                        if(src.substr(0,2) == '//'){
                            src = 'https:'+src;
                        }
                        result.urls.push([src, quantity, ext]);
                    }
                })
            })
        }
        if(result.urls.length == 0){
            var videos = document.querySelectorAll('video');
            [].forEach.call(videos,  function (video_el) {
                var src = video_el.getAttribute('src');
                if(src !== null && src != ''){
                    if(src.substr(0,5) != 'data:'){
                        result.urls.push([video_el.getAttribute('src'), 'default', _get_ext(src)]);
                    }
                }
            })
        }

        if(typeof(error) == 'undefined'){
            if(result.urls.length == 0){
                // error = not_support | parse_fail , 成功时， error 就是空字符串
                result.error = 'not_support'
            }
            try{
                if(result.urls.length > 0){
                    status = 1
                }else{
                    status = 0
                }
                var dict = {'user-agent': navigator.userAgent, 'url': location.href, 'site': window.location.hostname, 'status': status}
                var json_str = JSON.stringify(dict)
                window.AndroidWebView.logEvent('parse_result', json_str)
            }catch(e){
            }
        }else{
            // 强制不支持
            if(error == 'not_support'){
                result.urls = []
                result.error = 'not_support'
            }
            if(error == 'opt_ignore'){
                result.urls = []
                result.error = 'opt_ignore'
            }
        }


        return result
    }

    if (host in _hosts) {
        try {
            _hosts[host]()
        } catch (err) {
            console.log(err)
        }
    }else{
        normalize_result(result)
    }

    console.info(result.urls[0])
    return result

}
