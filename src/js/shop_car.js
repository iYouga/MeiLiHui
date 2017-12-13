(function($){
    $(function(){
        
        /* ---------------------------------点击便签切换------------------------------ */
        $('.main_menu').on('click','h3',function(){
            $(this).addClass('h3_checked').siblings().removeClass('h3_checked');
            $('.tab').hide().eq($(this).index()).show();
        });
        /* ---------------------------------点击修改按钮------------------------------ */
        // 出现尺寸信息
        $('.color_size').on('click', '.modify',function(){
            $('.size_con').hide();
            $(this).nextAll('.size_con').show();
            $(this).parents('.color_size').addClass('color_size_click');
            $(this).addClass('modify_click');
        });
        // 点击尺寸变色
        $('.size_num').click(function(){
            $(this).addClass('size_num_checked').siblings().removeClass('size_num_checked');
        });
        // 点击确定按钮修改尺寸,隐藏尺寸信息
        $('.confirm').click(function(){
            $(this).parent().prevAll('.size').html($(this).prevAll('.size_num_checked').children('i').html());
            $('.size_con').hide();
            $(this).parents('.color_size').removeClass('color_size_click');
            $(this).parent().prevAll('.modify').removeClass('modify_click');
        });
        // 点击关闭按钮隐藏尺寸信息
        $('.close').click(function(){
            $('.size_con').hide();
            $(this).parents('.color_size').removeClass('color_size_click');
            $(this).parent().prevAll('.modify').removeClass('modify_click');
        });
        // 加减数量
        /* var num = Number($('.num').html());
        if (num === 1) {
            $('.reduce').css('color', '#ccc');
        } */
        $('.reduce').click(function(){
            var num = Number($(this).siblings('.num').html());
            num--;
            if(num <= 1){
                $(this).siblings('.num').html(1);
                $(this).css('color','#ccc');
                $(this).parent().nextAll('.price').html('￥ ' + Number($(this).parent().prevAll('.unit-price').children('span').html()) + '.00');
            } else{
                $(this).siblings('.num').html(num);
                $(this).parent().nextAll('.price').html('￥ ' + Number($(this).parent().prevAll('.unit-price').children('span').html()) * Number($(this).siblings('.num').html()) + '.00');
            }
        });
        $('.add').click(function () {
            var num = Number($(this).siblings('.num').html());
            num++;
            $(this).siblings('.reduce').css('color', '#000');
            $(this).siblings('.num').html(num);
            $(this).parent().nextAll('.price').html('￥ ' + Number($(this).parent().prevAll('.unit-price').children('span').html()) * Number($(this).siblings('.num').html()) + '.00');
        }); 
        // 点击删除按钮删除当前商品
        $('.delete').click(function(){
            $(this).parents('.goods_list_unit').remove();
            // 如果商品列表为空，显示提示信息
            if($('.tab_one').children().length === 3){
                $('.tab_one').empty().html('<p class="null">您还没有可购买的商品，赶快将心仪的商品加入购物袋吧~</p>');
            }
        });
        /* --------------------------------底部结算栏动态定位----------------------------- */
        $(window).scroll(function(){ 
            if($(document).scrollTop() >= $('.footer').offset()['top'] - document.documentElement.clientHeight){
                $('.selletement').addClass('selletement_fixed');
            } else{
                $('.selletement').removeClass('selletement_fixed');
            }
        });
        // 商品选中效果
        $('.one').click(function(){
            if($('.circle_checked').length === $('.circle').length){
                $('.all').removeClass('circle_checked');
                $(this).toggleClass('circle_checked');
            } else{
                $(this).toggleClass('circle_checked');
                if($('.circle_checked').length === $('.one').length){
                    $('.all').addClass('circle_checked');
                }
            }
            go_selletement();
        });
        // 全选
        $('.all').click(function(){
            if($('.circle_checked').length === $('.circle').length){
                $('.all').removeClass('circle_checked');
                $('.one').removeClass('circle_checked');
            } else{
                $('.all').addClass('circle_checked');
                $('.one').addClass('circle_checked');
            }
            go_selletement();
        });
        // 选中的件数
        $('.circle').click(function(){
            $('.selected').html(($('.circle_checked').filter('.one').length));

        });
        // 计算价格
        function go_selletement (){
            // 计算按钮变色
            if($('.circle_checked').length !== 0){
                $('.go_selletement').addClass('go_selletement_checked');
            } else{
                $('.go_selletement').removeClass('go_selletement_checked');
            }
            // 显示总金额
            var iPrice = 0;
            $('.goods_list_unit:has(.circle_checked)').find('.price').each(function(k,v){
                iPrice += Number($(v).children('span').html());
            });
            $('.selletement_r span').html(iPrice + '.00');
        }
    });
})(jQuery);