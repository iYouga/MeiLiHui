(function($){
    $(function(){
        /* ---------------------------------------顶部导航条------------------------------------------ */
        // 左边部分鼠标滑过变色
        $('.top_left a:not(:first)').mouseenter(function(){
            $(this).css('color','#db2726');
        }).mouseleave(function(){
            $(this).css('color', '#000');
        });
        /* -------------------------------我的账户隐藏菜单--------------------------- */
        $('.my_account').mouseenter(function(){
            $('.my_account_menu').show().mouseenter(function () {
                $('.my_account_menu').show();
            }).mouseleave(function () {
                $('.my_account_menu').hide();
            });;
        }).mouseleave(function(){            
            $('.my_account_menu').hide();
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
            if (iMenuTop < 600){
                $('.toTop').css('display', 'none');        
            } else{
                $('.toTop').css('display', 'block')     
            }
        });
            $('.toTop').click(function () {
                // $(document).scrollTop(0);
                $('html').animate({scrollTop:0},500,'linear');
                $('body').animate({scrollTop:0},500,'linear');
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
    });
})(jQuery);