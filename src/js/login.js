(function($){
    $(function(){        
        /* ------------------------------------切换登录方式----------------------------------- */
        $('.tab').on('click','h3',function(){
            $(this).addClass('h3_active').siblings().removeClass('h3_active');
            $('.phone_login').toggle();
            $('.account_login').toggle();
        });
        /* -------------------------------------提示信息------------------------------------- */
        // 手机号提示信息
        $('.phone input').on('blur',function(){
            var reg = /^1\d{10}$/;
            if(!reg.test($('.phone input').val())){
                $('.phone span').css('visibility','visible').html('请输入格式正确的手机号');
            } else{
                $('.phone span').css('visibility','hidden');
            }
            if($('.phone input').val() === ''){
                $('.phone span').html('请输手机号');
            }
        });
        // 验证码提示信息
        $('.verify_code input').on('focus',function(){
            if($('.phone input').val() === ''){
                $('.phone span').css('visibility','visible');
            } else{
                $('.verify_code span').css('visibility','visible');
            }
        });
        $('.verify_code input').on('blur',function(){
            if($(this).val() !== ''){
                $('.verify_code span').css('visibility','hidden');
            }
        });
        // 手机号、邮箱提示信息
        $('.accounts input').on('blur',function(){
            if($('.accounts input').val() === ''){
                $('.accounts span').css('visibility','visible').html('请输手机号/邮箱');
            } else{
                $('.accounts span').css('visibility','hidden');
            }
        });
        // 密码提示信息
        $('.password input').on('focus',function(){
            if($('.accounts input').val() === ''){
                $('.accounts span').css('visibility','visible');
            } else{
                $('.password span').css('visibility','visible');
            }
        });
        $('.password input').on('blur',function(){
            if($(this).val() !== ''){
                $('.password span').css('visibility','hidden');
            }
        });

        // 登录检测
        $('.submit').click(function(){
            $.ajax({
                type:'post',
                url:'../php/login.php',
                data:{
                    account:$('.accounts input').val(),
                    password:$('.password input').val(),
                    accounts:$('.phone input').val(),
                    verifyCode:$('.verify_code input').val()
                },
                dataType:'json',
                success:function(data){
                    if(data['status'] === 200){
                        location.href = 'index.html';
                    } else if(data['status'] === 401){
                        if ($('.account_login').css('display') === 'block'){                            
                            $('.password span').css('visibility','visible').html(data['info']);
                        } else if ($('.phone_login').css('display') === 'block'){                            
                            $('.verify_code span').css('visibility', 'visible').html('验证码错误');
                        }
                    }
                }
            });
        });

    });
})(jQuery);

