(function($){
    $(function(){
        /* ---------------------------------------顶部导航条------------------------------------------ */
        // 左边部分鼠标滑过变色
        $('.top_left a:not(:first)').mouseenter(function(){
            $(this).css('color','#db2726');
        }).mouseleave(function(){
            $(this).css('color', '#000');
        });
        /* ------------------------------------------menu------------------------------------------- */
        // 吸顶效果
        $(window).scroll(function(){
            var iMenuTop = $(document).scrollTop();
            if (iMenuTop >= 120){
                $('.menu').css({position:'fixed',top:0});
            } else{
                $('.menu').css({position:'static'});
            }
            // 滑动条向下1200px时出现回到顶部按钮,否则隐藏，返回顶部效果
            if (iMenuTop < 1200){
                $('.toTop').css('display', 'none');        
            } else{     
                $('.toTop').css('display', 'block').click(function () {
                    $(document).scrollTop(0);
                });
            }
        });
        // 购物车信息显示隐藏
        $('.m_right').mouseenter(function(){
            $('.shop_car_hide').delay(1000).stop(true).slideDown(500);
        }).mouseleave(function(){
            $('.shop_car_hide').delay(1000).stop(true).slideUp(500);
        });
        $('.shop_car_hide').on('click','.close span',function(){
            $('.shop_car_hide').delay(1000).stop(true).slideUp(500);
        });
        // 搜索框获取关标时关闭默认信息
        var defaultInfo = $('.search_in').val();
        $('.search_in').focus(function(){
            if ($(this).val() == defaultInfo){
                $('.search_in').val('');
            }
            $('.recommendList').css('display','block');
        }).blur(function () {
            if ($(this).val() == '') {
                $('.search_in').val(defaultInfo);
            }
            $('.recommendList').css('display', 'none');
        }).on('input',function(){ 
            if ($('.search_in').val() != ''){
                // 跨域请求数据
                $.getJSON('https://suggest.taobao.com/sug?code=utf-8&q=' + $(this).val() + '&_ksTS=1512646721313_529&callback=?&k=1&area=c2c&bucketid=11',function(data){
                    $('.recommendList').html('');                    
                    if(data['result'].length === 0){
                        $('.recommendList').hide();
                        return;
                    }
                    data['result'].forEach(function(v,k){
                        $('.recommendList').show();
                        $('<li>').html('<a>' + v[0]).appendTo($('.recommendList'));
                    });
                });                
            } else if ($('.search_in').val() == ''){
                $.getJSON('../php/goodsList.php',function(data){
                    $('.recommendList').show().html('');
                    data.forEach(function (v, k) {
                        $('<li>').html('<a>' + v).appendTo($('.recommendList'));
                    });
                });
            }
        });
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