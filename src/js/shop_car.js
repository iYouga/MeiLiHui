(function($){
    $(function(){
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
        $('.circle').click(function(){
            $(this).toggleClass('circle_checked');
            if($('.circle:not(.circle_checked)').length !== $('.circle').length - 3){
                $('.all').removeClass('circle_checked');
            } else{
                $('.all').addClass('circle_checked');
            }
        });
        // 全选
        $('.all').click(function(){
            $('.circle').addClass('circle_checked');
            $('.all').addClass('circle_checked');
            if($('.circle_checked').length === $('.circle').length && $('.circle_checked').length !== 0){
                $('.all').click(function(){
                    $('.circle').toggleClass('circle_checked');
                });
            }
        });

    });
})(jQuery);