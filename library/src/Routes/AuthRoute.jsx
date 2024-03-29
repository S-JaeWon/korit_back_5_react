import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import { getPrincipalRequest } from '../apis/api/principal';
import { useQuery } from 'react-query';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft';
import RootHeader from '../components/RootHeader/RootHeader';
import MyPage from '../pages/MyPage/MyPage';
import PageContainer from '../components/PageContainer/PageContainer';
import FullSizeLoader from '../components/FullSizeLoader/FullSizeLoader';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';
import BookManagement from "../pages/Admin/BookManagement/BookManagement";

// useQuery -> GET 요청시에 사용
// 첫번째 매개변수 -> 배열 [ "key", dependency ]
// 두번째 매개변수 -> 요청메소드 (asyncm await)
// 세번째 매개변수 -> 옵션 
/**
 * {
 *  retry: 0,
 *  refetchOnWindowFocus: false,
 *  onSuccess: 함수,
 *  onError: 함수,
 *  enalbe: true or false
 * }
 */


function AuthRoute(props) {
    
    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest, 
        { 
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log("onSuccess")
                console.log(response)
            },

            onError: error => {
                console.log("오류")
                console.log(error);
            }
        });

    // const [ principal, setPrincipal ] = useRecoilState(principalState);

    // useEffect(() => {
    //     getPrincipal();
    // }, [])

    // const getPrincipal = useCallback(() => {
    //     getPrincipalRequest()
    //     .then(response => {
    //         //console.log(response); 콘솔 창에서 data 확인 가능 
    //         setPrincipal(() => response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, []);

    return (
        <>
            <RootSideMenuLeft />
            <RootHeader />
            <PageContainer>
                {
                    principalQuery.isLoading 
                    ? <FullSizeLoader size={25} />
                    : <Routes>
                        <Route path="/auth/*" element={ < AuthPage /> } />
                        <Route path="/" element={ < HomePage /> } />
                        <Route path="/account/mypage" element={ < MyPage /> } />
                        <Route path="/account/edit/password" element={ < PasswordEditPage /> } />
                        <Route path="/admin/book/management" element={ <BookManagement /> } />
                    </Routes>
                }
            </PageContainer>
        </>
    );
}

export default AuthRoute;