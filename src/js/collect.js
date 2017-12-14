(function(){
    $(function(){
        // 点击切换
        $('.con_left ul').on('click','li',function(){
            $('.con_left li').removeClass('li_checked');
            $(this).addClass('li_checked');
        });
        $('.con_right ul').on('click','li',function(){
            $('.con_right li').removeClass('title_checked');
            $(this).addClass('title_checked');
        });
    });
})(jQuery);