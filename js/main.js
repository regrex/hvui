$(function () {
    var pageStack = [];
    var $pageContainer = $('#j-page-wrap');

    // 带hash的页面刷新去到对应页
    if (/#.*/gi.test(location.href)) {
        goPage(location.hash.slice(1));
    }

    // 监听hash变化，处理返回
    $(window).on('hashchange', function (evt) {
        if (/#.*/gi.test(evt.newURL)) {
            return;
        }

        var $curPage = pageStack.pop();

        if (!$curPage) {
            return;
        }

        addAnimation($curPage, 'slideOutRight', function () {
            $curPage.remove();
        });
    });

    $('.j-hvui-item').on('click', function () {
        var $that = $(this);
        var pageAnchor = $that.attr('href').slice(1);

        goPage(pageAnchor);
    });

    function goPage(pageName) {
        var $page = $($('#tpl-' + pageName).html()).addClass(pageName);

        location.hash = '#' + pageName;
        pageStack.push($page);
        $pageContainer.append($page);
        addAnimation($page, 'slideInRight');
    }

    function addAnimation($element, animateName, callback) {
        var animateClass = animateName + ' animated';

        $element.addClass(animateClass).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass(animateClass);
            callback && callback();
        });
    }
});