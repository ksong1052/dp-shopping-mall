import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {    

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        /* 
          null: 아무나 출입이 가능한 페이지 
          true: 로그인한 사용자만 출입이 가능한 페이지
          false: 로그인한 사용자는 출입이 불가능한 페이지        
        */
        
        useEffect(() => {
            dispatch(authUser()).then(response => {
                // console.log("response:", response);

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login');
                    }
                } else {    //로그인한 상태 
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/');
                    } else {
                        if( option === false ) {
                            navigate('/');
                        }
                    }
                }
            })            
        },[dispatch]);

        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    // return AuthenticationCheck();
    return <AuthenticationCheck />;
} 
