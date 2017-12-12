(function($){
    $(function(){
        /* -----------------------------选择条件部分------------------------ */
        // 清空已选择的
        $('.clear').click(function(){
            $('.brand').remove();
            $('.class').remove();
            // 隐藏背景
            $('.checked').hide();
        });
        // 点击条件后的删除按钮清除本条条件
        $('.checked').on('click','.close',function(){
            $(this).parent().remove();
            if($('.brand').length === 0 && $('.class').length === 0){
                $('.checked').hide();
            }
        });
        // 点击更多查看更多
        $('.check').on('click','.more',function(){
            $(this).parents('.check').toggleClass('check_brand_more');
            // 显示收起、翻转箭头
            if($(this).children('img').hasClass('img_click')){
                    $(this).children('span').html('更多').end().children('img').removeClass('img_click');
            } else{
                    $(this).children('span').html('收起').end().children('img').addClass('img_click');
            }
        });
        // 选择条件
        $('.check ul li span').click(function(){
            if($(this).prev('input').attr('checked') === 'checked'){
                $(this).prev('input').removeAttr('checked');
            }else if(!$(this).prev('input').attr('checked')){                
                $(this).prev('input').attr('checked','checked');
            }
        });
        // 添加条件
        // 品牌
        $('.check_brand ul li').click(function(){
            if($(this).children('input').attr('checked')){
            $('<div class="brand">').html('品牌：<span>' + $(this).children('span').html() + '</span><a href="javascript:;" class="close">&times;</a>').prependTo($('.condition'));
            } else{
                console.log('再点击一次则删除');
            }
        });
        // 种类
        $('.check_class ul li').click(function(){
            if($(this).children('input').attr('checked')){
            $('<div class="class">').html('种类：<span>' + $(this).children('span').html() + '</span><a href="javascript:;" class="close">&times;</a>').appendTo($('.condition'));
            }else{
                console.log('再点击一次则删除');
            }
        });
        /* -----------------------------------排序、翻页菜单---------------------------- */
        // 吸顶效果
        $(window).scroll(function(){
            if($(document).scrollTop() >= 415){
                $('.move_menu').addClass('move_menu_fixed');
            }else{
                $('.move_menu').removeClass('move_menu_fixed');
            }
        });
        // 排序方式按钮效果
        $('.move_menu_l a').click(function(){
            $(this).addClass('move_menu_l_check').siblings().removeClass('move_menu_l_check');
        });
        // 当页数为1时，向左切换为灰色
        $('.prev').click(function(){
            var iCurPage = Number($('.cur_page').html());            
            var iAllPage = Number($('.all_page').html());            
            iCurPage = iCurPage <= 1 ? 1 : iCurPage - 1 ;
            $('.goods_list').hide().eq(iCurPage - 1).show();
            $('.page_nav a').removeClass('page_cur').eq(iCurPage).addClass('page_cur');
            $('.cur_page').html(iCurPage);
            rightBlack();  
            if($('.cur_page').html() === '1'){                   
                leftGray();
            }
        });
        // 向右翻页
        $('.next').click(function(){
            var iCurPage = Number($('.cur_page').html());            
            var iAllPage = Number($('.all_page').html());            
            iCurPage = iCurPage >= iAllPage ? iAllPage : iCurPage + 1;
            $('.goods_list').hide().eq(iCurPage - 1).show();
            $('.page_nav a').removeClass('page_cur').eq(iCurPage).addClass('page_cur');
            $('.cur_page').html(iCurPage);
            leftBlack();
            if(iCurPage === iAllPage){
                rightGray();
            }
        });
        // 输入跳转
        $('.confirm').click(function(){
            var iCurPage = Number($('.goto').val());            
            var iAllPage = Number($('.all_page').html()); 
            $('.goods_list').hide().eq(iCurPage - 1).show();
            $('.cur_page').html(iCurPage);
            $('.page_nav a').removeClass('page_cur').eq(iCurPage).addClass('page_cur');
            if(iCurPage === iAllPage){
                leftBlack();
                rightGray();
            }
            if($('.cur_page').html() === '1'){  
                rightBlack();                 
                leftGray();
            }
        });
        // 向右按钮变灰
        function rightGray(){
            $('.next').removeClass('b').removeClass('bottom_dir_hover').addClass('g').css('color','#999').children('img').addClass('gray');
        }
        // 向左按钮变灰
        function leftGray(){
            $('.prev').removeClass('b').removeClass('bottom_dir_hover').addClass('g').css('color','#999').children('img').addClass('gray');
        }
        // 向右按钮变黑
        function rightBlack(){
            $('.next').removeClass('g').addClass('b').addClass('bottom_dir_hover').css('color','#000').children('img').removeClass('gray');
        }
        // 向左按钮变黑
        function leftBlack(){
            $('.prev').removeClass('g').addClass('b').addClass('bottom_dir_hover').css('color','#000').children('img').removeClass('gray');
        }
    
        
        /* -------------------------------------商品列表------------------------------- */
        // 滑过图片显示小图片和尺寸
        $('.goods').mouseenter(function(){
            $(this).parents('.goods_list_unit').find('.info_price').css('visibility','hidden');
            $(this).parents('.goods_list_unit').find('.img_list').show();
        })
        // 滑出隐藏
        $('.goods_list_unit').mouseleave(function(){
            $(this).find('.info_price').css('visibility','visible');
            $(this).find('.img_list').hide();
        });
        // 滑过小图片切换大图片
        $('.goods_img').mouseenter(function(){
            $(this).parents('.goods_list_unit').find('.goods').attr('src',$(this).children().attr('src'));
        });
    });
})(jQuery);