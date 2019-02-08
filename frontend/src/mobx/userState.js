import {observable} from 'mobx';

export default observable({
    user: {isLogin:false},
    login(user){
        this.user={
            isLogin:true,
            ...user
        };
    },
    logout(){
        this.user={isLogin:false};
    }
});
