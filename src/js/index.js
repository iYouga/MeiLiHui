(function($){
    $(function(){                
        /* --------------------------------------主体部分商品展示---------------------------------- */
        // 滑过商品时显示灰色图片并放大
        $('.unit').on('mouseenter','.goods_img',function(){
            var oThisImg = $(this).children('img');
            var iThisImgW = $(this).width(), iThisImgH = $(this).height();
            oThisImg.addClass('gray').stop(true).animate({ width: iThisImgW * 1.1, height: iThisImgH * 1.1},400,'linear')
            $(this).mouseleave(function(){
                oThisImg.removeClass('gray').stop(true).animate({ width: iThisImgW, height: iThisImgH}, 400, 'linear');
            });
        });
        // 活动即将开始
        // 滑过星期出现底边框
        $('.weekday').on('click','li',function(){
            var index = $(this).index();
            $(this).addClass('weekday_active').siblings().removeClass('weekday_active');
            $('.active_goods').eq(index).show().siblings().hide();
        });
        // 滑过商品显示遮盖层，点击订阅显示已选择
        $('.active_goods li').on('mouseenter', function () {
            // 滑入显示
            $(this).children('.active_goods_cover').css('display', 'block');           
        }).mouseleave(function(){
            // 滑出隐藏
            $('.active_goods_cover').css('display','none');
        });
        // 订阅取消
        $('.active_goods li').on('click','.focus',function(){
            var index = $('.focus').index($(this));
            if ($(this).hasClass('cancel')){
                $('.active_goods_cover span').eq(index).show();
                // $(this).parents('li').find('p .checked').hide();
                $('.checked').eq(index).hide();
                $(this).removeClass('cancel').html('订阅');
            } else{
                $('.active_goods_cover span').eq(index).hide();
                // $(this).parents('li').find('p .checked').show();
                $('.checked').eq(index).show();
                $(this).addClass('cancel').html('取消');
            }
        })
        /* ------------------------------------------footer------------------------------------- */
        // 主体部分随鼠标上移
        var iConcentTop = parseInt($('.con_outer').css('top'));
        $(window).scroll(function(){
            var iScrollTop = $(document).scrollTop(); 
            if (iScrollTop <= 367.5){
                $('.con_outer').css('top', iConcentTop - iScrollTop / 0.7);
                iScrollTop = $(document).scrollTop();
            }
        });
        



    });
})(jQuery);