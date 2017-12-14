(function($){
    $(function(){        
        // 点击眼睛显示、隐藏密码
        $('.show_psw').click(function(){
            // 切换input属性
            $('.password input')[0].type = 'text';
            if($(this).hasClass('hide_psw')){
                $('.password input')[0].type = 'password';
            }
            // 切换背景图
            $(this).toggleClass('hide_psw');
        });        
        // 手机号提示信息
        $('.account input').on('blur',function(){
            var reg = /^1\d{10}$/;
            if(!reg.test($('.account input').val())){
                $('.account span').css('visibility','visible').html('请输入格式正确的手机号');
            } else{
                $('.account span').css('visibility','hidden');
            }
            if($('.account input').val() === ''){
                $('.account span').html('请输手机号');
            }
        });
        // 验证码提示信息
        $('.verify_code input').on('focus',function(){
            if($('.account input').val() === ''){
                $('.account span').css('visibility','visible');
            } else{
                $('.verify_code span').css('visibility','visible');
            }
        });
        $('.verify_code input').on('blur',function(){
            if($(this).val() !== ''){
                $('.verify_code span').css('visibility','hidden');
            }
        });
        // 密码提示信息
        $('.password input').on('focus',function(){
            if($('.account input').val() !== '' && $('.verify_code input') !== ''){                
                $('.password span').css('visibility','visible');
            }
        });
        // 输入密码时显示删除按钮、检查密码强度
        $('.password input').on('input',function(){
            $('.delete_psw').show();
            $('.strength').show();            
            if($('.password input').val().length < 6){
                $('.password span').css('visibility','visible').html('密码长度不能少于6位');
                $('.strength').css('bottom','-8px');
                if($('.password input').val() === ''){
                    $('.delete_psw').hide();
                    $('.strength').hide();
                    $('.password span').css('visibility','visible').html('6-20个字符，由字母、数字和符号的两种以上组合')
                }
            } else{
                // 检查强度
                var reg1 = /^\d+$/; //数字
                var reg2 = /(^[a-zA-Z0-9]+$)/; //数字字母组合
                var reg3 = /\d*\D*((\d+[a-zA-Z]+[^0-9a-zA-Z]+)|(\d+[^0-9a-zA-Z]+[a-zA-Z]+)|([a-zA-Z]+\d+[^0-9a-zA-Z]+)|([a-zA-Z]+[^0-9a-zA-Z]+\d+)|([^0-9a-zA-Z]+[a-zA-Z]+\d+)|([^0-9a-zA-Z]+\d+[a-zA-Z]+))\d*\D*/; //数字字母字符任意组合
                var pwd = $('.password input').val();
                if (reg1.test(pwd)) {
                    $('.strength i').eq(0).css('background','#ec3c3c').siblings().css('background','#d1d0ce');
                    $('.password span').css('visibility','visible').html('密码较弱，建议设置多种字符组成的复杂密码');
                } else if (reg2.test(pwd)) {
                    $('.strength i').eq(1).css('background','#f7bd5b').siblings().css('background','#d1d0ce');
                    $('.password span').css('visibility','hidden');
                    $('.strength').css('bottom','10px');
                } else if (reg3.test(pwd)) {
                    $('.strength i').eq(2).css('background','#7fcf3e').siblings().css('background','#d1d0ce');
                    $('.password span').css('visibility','hidden');
                    $('.strength').css('bottom','10px');
                }
            }
        });
        // 点击删除按钮删除已输入密码，隐藏删除按钮
        $('.delete_psw').click(function(){
            $(this).hide();
            $('.password input').val('');
            $('.strength').hide();
            $('.password span').css('visibility','hidden');
        });
        // 未同意使用条款时禁用注册
        $('.agree input').click(function(){
            if($(this).prop('checked')){
                $('.submit').removeClass('disabled_submit').removeAttr('disabled');
            } else{
                $('.submit').addClass('disabled_submit').attr('disabled','disabled');
            }
        });
    });
})(jQuery);