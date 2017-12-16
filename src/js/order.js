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
            // 获取要编辑的地址的信息
            var name = $(this).parents('li').find('.name').html(),phone = $(this).parents('li').find('.phone').html(),province = $(this).parents('li').find('.province').html(),city = $(this).parents('li').find('.city').html(),area = $(this).parents('li').find('.area').html(),detailed = $(this).parents('li').find('.detailed').html(),postcode = $(this).parents('li').find('.postcode').html();
            // 显示地址输入表单
            $('.add_address').show();
            // 将信息添加到对应的输入框中
            $('#name').val(name);
            $('#phone').val(phone);
            $('.checked_province').html(province);
            $('.checked_city').html(city);
            $('.checked_area').html(area);
            $('#detailed').val(detailed);
            $('#postcode').val(postcode);
            // 隐藏使用新地址按钮
            $('.use_new').hide();
            // 隐藏已有地址列表
            $('.address_list').hide();
        });
        /* ---------------------------------添加地址---------------------------------- */
        // 点击使用新地址，切换添加地址
        $('.use_new').click(function(){
            // 隐藏使用新地址按钮
            $(this).hide();
            // 隐藏已有地址列表
            $('.address_list').hide();
            // 显示地址输入表单
            $('.add_address').show();
        });
        // 点击取消切换默认地址
        $('.cancel').click(function(){
            // 清空输入表单中的信息
            $('#name').val('');
            $('#phone').val('');
            $('.checked_province').html('请选择省');
            $('.checked_city').html('请选择市');
            $('.checked_area').html('请选择区县');
            $('#detailed').val('');
            $('#postcode').val('');
            // 显示使用新地址按钮
            $('.use_new').show();
            // 显示已有地址列表
            $('.address_list').show();
            // 隐藏地址输入表单
            $('.add_address').hide();
            // 隐藏未输入时的提示信息
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
        // 添加地址，如果输入信息都不为空时允许添加
            if($('#name').val() !== '' &&
               $('#phone').val() !== '' &&
               $('.checked_province').html() !== '请选择省' &&
               $('#detailed').val() !== '' &&
               $('#postcode').val() !== ''){                
                    var name = $('#name').val(),phone = $('#phone').val(),
                       detailed = $('#detailed').val(),postcode = $('#postcode').val();
                    $('<li>').html('<p class="info"><span class="set_default_ok set_default">设置为默认地址</span><a href="javascript:;" class="close">&times;</a><a href="javascropt:;" class="edit">编辑</a></p><p><span class="name">' + name + '<span class="phone">' + phone + '</span></p><p><span class="province">' + $('.checked_province').html() + '</span><span class="city">' +  $('.checked_city').html() + '</span><span class="area">' + $('.checked_area').html() + '</span><span class="detailed">' + detailed + '</span></p><p class="postcode">' + postcode + '</p><div class="default"></div>')
                    .appendTo($('.address_list'));
                    // 显示地址列表
                    $('.address_list').show();
                    // 显示使用新地址按钮
                    $('.use_new').show();
                    // 隐藏地址输入表单
                    $('.add_address').hide();
                    // 如果勾选了设置为默认地址，则设置为默认地址
                    if($('.is_default').attr('checked') === 'checked'){
                        $('.address_list li:last()').addClass('default_add').find('.set_default').html('默认地址').removeClass('set_default').end().find('.default').addClass('default_checked');
                        $('.address_list li:last()').siblings().removeClass('default_add').find('.set_default_ok').html('设置为默认地址').addClass('set_default').end().find('.default').removeClass('default_checked');
                    }
               }
        });        
        // 输入检查
        // 验证手机号格式
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
        // 验证邮编格式
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
            // 选择省后，显示选择的省份
            $('.checked_province').html($(this).html());
            // 格式化市、县区为默认信息
            $('.checked_city').html('请选择市');
            $('.checked_area').html('请选择区县');
            // 隐藏市列表中的所有ul
            $('.in_city .bar').hide();
            // 显示已选择的省对应的市ul
            $('.in_city').find('.' + $(this).attr('class')).show();
        });
        $('.in_city').find('li').click(function(){
            // 选择市后，显示选择的市
            $('.checked_city').html($(this).html());
            // 隐藏县区列表中的所有ul
            $('.in_area .bar').hide();
            // 显示已选择的市对应的县区ul
            $('.in_area').find('.' + $(this).attr('class')).show();
        });
        $('.in_area').find('li').click(function(){
            // 选择县区后，显示选择的县区
            $('.checked_area').html($(this).html());
        });
        // 选择支付方式
        $('.way_box').on('click','.way',function(){
            // 选择支付方式后，上方提示框出现，并显示已选择的支付方式
            $('.pay_method').show().find('.way').css('background',$(this).css('background'));
            // 隐藏支付方式选择框
            $('.check_way').hide();
            // 隐藏收缩按钮
            $('.to_top').hide();
            // 显示选择其他按钮
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
            // 选择不需要发票时，不显示隐藏部分
            if($('#no_invoice').attr('checked') === 'checked'){
                $('.invoice_class').hide();
            }
            // 选择电子发票时，显示隐藏部分和底部提示信息
            if($('#e_invoice').attr('checked') === 'checked'){
                $('.invoice_class').show().find('p').show();
            }
            // 选择纸质发票时，显示隐藏部分，隐藏底部提示信息
            if($('#p_invoice').attr('checked') === 'checked'){
                $('.invoice_class').show().find('p').hide();
            }
        });        
        $('.invoice_class').on('click','button',function(){
            $('.invoice_class button').removeClass('button_checked');
            $(this).addClass('button_checked');
        });
        // 选择公司
        $('.company_invoice').click(function(){
            // 显示隐藏输入框，隐藏已输入的信息确认部分
            $('.company').show();
            hide_company ();
            show_company ();
        });
        // 选择个人，隐藏公司部分
        $('.person').click(function(){
            $('.company').hide();
            // 重新添加公司按钮的点击事件
            $('.company_invoice').click(function(){
                $('.company').show();
                hide_company ();
                show_company ();
            });
        });
        // 公司抬头失去光标时检查是否为空，为空显示提示信息
        $('.company_name').blur(function(){
            if($(this).val() === ''){
                $('.comany_name_info').css('display','block');
            } else{
                $('.comany_name_info').css('display','none');
            }
        });
        // 纳税人识别号失去光标时检查输入格式，错误是显示提示信息
        $('.perple_code').blur(function(){
            var reg = /^\d*$/;
            if(!reg.test($(this).val())){
                $('.perple_code_info').css('display','block');
            } else{
                $('.perple_code_info').css('display','none');
            }
        });
        // 点击确认信息按钮时检查公司抬头是否为空
        $('.invoice_confirm').click(function(){
            if($('.company_name').val() === ''){
                // 为空提示输入
                $('.comany_name_info').css('display','block');
            } else{
                // 不为空隐藏输入框
                hide_company ();
            }
            // 移出公司按钮的点击事件
            $('.company_invoice').off('click');
        });
        // 点击修改按钮时
        $('.invoice_edit').click(function(){
            show_company ();
        });
        // 隐藏公司抬头输入框，显示输入信息
        function hide_company (){
            // 公司抬头输入框隐藏
            $('.company_name').hide();
            // 纳税人识别码隐藏
            $('.perple_code').hide();
            // 提示信息隐藏
            $('.perple_code_link').hide();
            $('.class_company').css('display','block');
            // 已输入信息确认部分显示，并将已输入的信息添加到对应部分
            $('.company_name_show').show().html($('.company_name').val());
            $('.perple_code_show').show().html($('.perple_code').val());
            // 隐藏确认按钮
            $('.invoice_confirm').hide();
            // 显示修改按钮
            $('.invoice_edit').show();            
        }
        // 显示公司抬头输入框，隐藏输入信息
        function show_company (){
            $('.company_name').show();
            $('.perple_code').show();
            $('.perple_code_link').show();
            $('.class_company').hide();
            $('.company_name_show').hide();
            $('.perple_code_show').hide();
            $('.invoice_edit').hide();
            $('.invoice_confirm').show();
        }
        // 点击使用优惠券按钮，显示选择优惠券
        $('.is_discount').click(function(){
            $('.use_discount').show();
            $(this).hide();
            // 不可用的优惠券按钮禁用
            $('.status').each(function(k,v){
                if($(v).hasClass('status_no')){
                    $(this).parents('li').find('input').attr('disabled','disabled');
                }
            });
        });
        // 点击选择优惠券
        $('.check_discount').click(function(){
            checkDiscount();
        });
        // 点击输入优惠券，显示相应部分
        $('.code_discount').click(function(){
            $('.in_check_discount').hide();
            $('.in_code_discount').show();
            $('.check_discount').removeClass('a_checked');
            $(this).addClass('a_checked');
        });
        // 点击取消使用
        function cancelUse(){            
            $('.use_discount').hide();
            $('.is_discount').show();
            $('.please_check').hide();
            $('.in_check_discount li input').removeAttr('checked').removeClass('input_checked');
            checkDiscount();
        }
        $('.discount_cancel').click(function(){
            cancelUse();
        });
        // 点击提交
        $('.in_check_discount li input').click(function(){
            $('.in_check_discount li input').removeClass('input_checked');
            $(this).addClass('input_checked');
        });
        $('.discount_confirm').click(function(){            
            // 检查已选
            if($('.input_checked').length === 0){
                $('.please_check').show();
            } else{
                $('.please_check').hide();
                $('.discount_checked').show().find('.disciunt_name').html($('.input_checked').parents('li').find('.disciunt_name').html());
                $('.discount_checked').find('.reduce_money').html('-￥' + parseInt($('.input_checked').parents('li').find('.money_reduce').html()) + '.00');
                cancelUse();
                $('.is_discount').hide();
            }
        });
        // 点击取消优惠券
        $('.discount_use_cancel').click(function(){
            $('.discount_checked').hide();
            cancelUse();
        });
        // 点击选择优惠券，显示相应部分
        function checkDiscount(){
            $('.in_check_discount').show();
            $('.in_code_discount').hide();
            $('.code_discount').removeClass('a_checked');
            $('.check_discount').addClass('a_checked');
        }




    });
})(jQuery);