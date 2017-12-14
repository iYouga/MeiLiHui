(function($){
    $(function(){
        /* ------------------------------已添加的地址-------------------------------- */
        // 点击删除按钮删除当前地址
        $('.address_list').on('click','.close',function(){
            $(this).parents('li').remove();
        });
        // 点击默认按钮设置为默认
        $('.address_list').on('click','.set_default',function(){
            // 给默认地址添加“默认地址”
            $('.set_default_ok').html('设置为默认地址').addClass('set_default');
            $(this).html('默认地址').removeClass('set_default');
            // 给默认地址添加阴影
            $(this).parents('li').addClass('default_add').siblings().removeClass('default_add');
            $('.default').removeClass('default_checked').eq($(this).parents('li').index()).addClass('default_checked');
        });
        // 点击编辑
        $('.address_list').on('click','.edit',function(){
            var name = $(this).parents('li').find('.name').html(),phone = $(this).parents('li').find('.phone').html(),province = $(this).parents('li').find('.province').html(),city = $(this).parents('li').find('.city').html(),area = $(this).parents('li').find('.area').html(),detailed = $(this).parents('li').find('.detailed').html(),postcode = $(this).parents('li').find('.postcode').html();
            $('#name').val(name);
            $('#phone').val(phone);
            $('.checked_province').html(province);
            $('.checked_city').html(city);
            $('.checked_area').html(area);
            $('#detailed').val(detailed);
            $('#postcode').val(postcode);
            $('.use_new').hide();
            $('.address_list').hide();
            $('.add_address').show();
        });
        /* ---------------------------------添加地址---------------------------------- */
        // 点击使用新地址，切换添加地址
        $('.use_new').click(function(){
            $(this).hide();
            $('.address_list').hide();
            $('.add_address').show();
        });
        // 点击取消切换默认地址
        $('.cancel').click(function(){
            $('#name').val('');
            $('#phone').val('');
            $('.checked_province').html('请选择省');
            $('.checked_city').html('请选择市');
            $('.checked_area').html('请选择区县');
            $('#detailed').val('');
            $('#postcode').val('');
            $('.use_new').show();
            $('.address_list').show();
            $('.add_address').hide();
            $('.please').hide();
        });
        // 填写详细地址时必须选择地区
        $('#detailed').focus(function(){
            if($('.checked_province').html() === '请选择省'){
                $('.in_add').find('.please').show();
            }
        });
        // 提交时检查未填项
        $('.confirm').click(function(){
            if($('#name').val() === ''){
                $('#name').next().show();
            }
            if($('#phone').val() === ''){
                $('#phone').next().show();
            }
            if($('.checked_province').html() === '请选择省' || 
               $('.checked_city').html() === '请选择市' ||
               $('.checked_area').html() === '请选择区县'){
                $('.in_add').find('.please').show();
            }
            if($('#detailed').val() === ''){
                $('#detailed').next().show();
            }
            if($('#postcode').val() === ''){
                $('#postcode').next().show();
                $('#postcode').nextAll('p').hide();
            }
        // 添加地址
            if($('#name').val() !== '' &&
               $('#phone').val() !== '' &&
               $('.checked_province').html() !== '请选择省' &&
               $('#detailed').val() !== '' &&
               $('#postcode').val() !== ''){                
                    var name = $('#name').val(),phone = $('#phone').val(),
                       detailed = $('#detailed').val(),postcode = $('#postcode').val();
                    $('<li>').html('<p class="info"><span class="set_default_ok set_default">设置为默认地址</span><a href="javascript:;" class="close">&times;</a><a href="javascropt:;" class="edit">编辑</a></p><p><span class="name">' + name + '<span class="phone">' + phone + '</span></p><p><span class="province">' + $('.checked_province').html() + '</span><span class="city">' +  $('.checked_city').html() + '</span><span class="area">' + $('.checked_area').html() + '</span><span class="detailed">' + detailed + '</span></p><p class="postcode">' + postcode + '</p><div class="default"></div>')
                    .appendTo($('.address_list'));
                    $('.address_list').show();
                    $('.use_new').show();
                    $('.add_address').hide();
                    if($('.is_default').attr('checked') === 'checked'){
                        $('.address_list li:last()').addClass('default_add').find('.set_default').html('默认地址').removeClass('set_default').end().find('.default').addClass('default_checked');
                        $('.address_list li:last()').siblings().removeClass('default_add').find('.set_default_ok').html('设置为默认地址').addClass('set_default').end().find('.default').removeClass('default_checked');
                    }
               }
        });        
        // 输入检查
        $('#phone').blur(function(){
            var reg = /^1\d{10}$/
            if(!reg.test($('#phone').val())){
                if($('#phone').val() === ''){
                    $('#phone').next().show().html('请输入手机号');
                } else{                    
                    $('#phone').next().show().html('电话号码有误，请输入正确的电话号码!');
                }
            } else{
                $('#phone').next().hide();
            }
        });
        $('#postcode').blur(function(){
            var reg = /^\d{6}$/
            if(!reg.test($('#postcode').val())){
                if($('#postcode').val() === ''){
                    $('#postcode').next().show().html('请输入邮政编码');
                    $('#postcode').nextAll('p').hide();
                } else{                    
                    $('#postcode').next().show().html('邮编有误，请输入正确邮编!');
                    $('#postcode').nextAll('p').hide();
                }
            } else{
                $('#postcode').next().hide();
                $('#postcode').nextAll('p').show();
            }
        });
        // 选择区县
        // 点击关闭按钮
        $('.select_add li').on('click','.close_select',function(){
            $(this).parent().hide();
        });
        // 点击其他地方关闭列表
        $(document).click(function(){
            $('.outer').hide();
        });
        $('.select_down').click(function(){
            event.stopPropagation();
            $('.outer').hide();
            $(this).next().show();
        });
        // 三级联动
        $('.in_province').find('li').click(function(){
            $('.checked_province').html($(this).html());
            $('.checked_city').html('请选择市');
            $('.checked_area').html('请选择区县');
            $('.in_city .bar').hide();
            $('.in_city').find('.' + $(this).attr('class')).show();
        });
        $('.in_city').find('li').click(function(){
            $('.checked_city').html($(this).html());
            $('.in_area .bar').hide();
            $('.in_area').find('.' + $(this).attr('class')).show();
        });
        $('.in_area').find('li').click(function(){
            $('.checked_area').html($(this).html());
        });
        // 选择支付方式
        $('.way_box').on('click','.way',function(){
            $('.pay_method').show().find('.way').css('background',$(this).css('background'));
            $('.check_way').hide();
            $('.to_top').hide();
            $('.to_down').show();
        });
        // 选择其他支付方式
        $('.to_down').click(function(){
            $('.check_way').show();
            $('.to_top').show();
            $(this).hide();
        });
        $('.to_top').click(function(){
            $('.check_way').hide();
            $('.to_down').show();
            $(this).hide();
        });
        // 发票
        $('.is_invoice').on('click','input',function(){
            if($('#no_invoice').attr('checked') === 'checked'){
                $('.invoice_class').hide();
            }
            if($('#e_invoice').attr('checked') === 'checked'){
                $('.invoice_class').show().find('p').show();
            }
            if($('#p_invoice').attr('checked') === 'checked'){
                $('.invoice_class').show().find('p').hide();
            }
        });
        $('.invoice_class').on('click','button',function(){
            $('.invoice_class button').removeClass('button_checked');
            $(this).addClass('button_checked');
        });
        $('.company_invoice').click(function(){
            $('.company').show();
        });
        $('.person').click(function(){
            $('.company').hide();
        });
        $('.company_name').blur(function(){
            if($(this).val() === ''){
                $('.comany_name_info').show();
            }
        });





    });
})(jQuery);